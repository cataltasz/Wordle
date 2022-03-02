import axios from "axios";
import { useState } from "react";
import Loading from "./../components/generic/Loading";
import "./AddPage.scss";
import BookForm from "./forms/BookForm";
import AuthorForm from "./forms/AuthorForm";
import SummaryForm from "./forms/SummaryForm";
import ISBNForm from "./forms/ISBNForm";

export default function AddPage() {
  const [ISBN, setISBN] = useState("");
  const [cover, setCover] = useState("");
  const [authorData, setAuthorData] = useState("");
  const [authorId, setAuthorId] = useState("");

  const [formState, setFormState] = useState(0);

  const [loading, setLoading] = useState(false);

  const [bookInfo, setBookInfo] = useState(null);

  const getAuthorInfo = (key) => {
    axios
      .get("https://openlibrary.org" + key + ".json", {
        timeout: 50000,
      })
      .then((res) => {
        setAuthorData({ name: res.data.name });
      })
      .catch((ex) => console.log(ex));
  };

  const getOpenAPIResult = () => {
    axios
      .get("https://openlibrary.org/isbn/" + ISBN + ".json", { timeout: 50000 })
      .then((response) => {
        setBookInfo({ name: response.data.title, isbn: ISBN });
        setAuthorId(response.data.authors[0].key);
        setFormState(1);

        setCover("https://covers.openlibrary.org/b/isbn/" + ISBN + "-S.jpg");
        getAuthorInfo(response.data.authors[0].key);
        setLoading(false);
      })
      .catch((ex) => {
        console.log(ex);
        setLoading(false);
      });
  };

  const getBookInfo = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .get("https://biozetapi.herokuapp.com/book?isbn=" + ISBN)
      .then((res) => {
        if (res.data.result.isbn === ISBN) {
          setBookInfo(res.data.result);
          setAuthorData({ name: res.data.result.author[0].name });
          setFormState(3);
        }

        setLoading(false);
      })
      .catch(() => {
        getOpenAPIResult();
      });
  };

  return (
    <div>
      <ISBNForm onSubmit={getBookInfo} setISBN={setISBN} />

      {loading && <Loading />}

      {bookInfo !== null && !loading && (
        <BookModal
          bookInfo={bookInfo}
          setBookInfo={setBookInfo}
          cover={cover}
          authorData={authorData}
          formState={formState}
          setFormState={setFormState}
          setAuthorData={setAuthorData}
          authorId={authorId}
          ISBN={ISBN}
        />
      )}
    </div>
  );
}

function BookModal({
  bookInfo,
  setBookInfo,
  cover,
  authorData,
  setAuthorData,
  setFormState,
  formState,
  authorId,
  ISBN,
}) {
  const getForm = () => {
    switch (formState) {
      case 1:
        return (
          <AuthorForm
            authorId={authorId}
            setAuthorData={setAuthorData}
            setFormState={setFormState}
          />
        );
      case 2:
        return (
          <BookForm
            authorData={authorData}
            setBookInfo={setBookInfo}
            setFormState={setFormState}
            ISBN={ISBN}
          />
        );
      case 3:
        return <SummaryForm authorData={authorData} bookInfo={bookInfo} />;
      default:
        return <div>Broken</div>;
    }
  };

  return (
    <div className="book-modal">
      <div className="info-container">
        <img src={cover} alt="cover" />
        <div>
          <span> {bookInfo.name} </span>
          <span> {authorData.name} </span>
        </div>
      </div>

      <div>{getForm()}</div>
    </div>
  );
}
