import { TextField, Button } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../components/generic/Loading";
import "./AddBookPage.scss";

export default function AddBookPage() {
  const [ISBN, setISBN] = useState("");
  const [cover, setCover] = useState("");
  const [author, setAuthor] = useState("");

  const [loading, setLoading] = useState(false);

  const [bookInfo, setBookInfo] = useState(null);

  const getBookInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .get("https://openlibrary.org/isbn/" + ISBN + ".json", { timeout: 5000 })
      .then((response) => {
        setBookInfo(response.data);

        setCover("https://covers.openlibrary.org/b/isbn/" + ISBN + "-S.jpg");

        axios
          .get(
            "https://openlibrary.org" + response.data.authors[0].key + ".json",
            {
              timeout: 5000
            }
          )
          .then((res) => {
            setAuthor(res.data.name);
            setLoading(false);
          })
          .catch((ex) => console.log(ex));
        setLoading(false);
      })
      .catch((ex) => console.log(ex));
  };
  return (
    <div>
      <ISBNForm onSubmit={getBookInfo} setISBN={setISBN} />

      {loading && <Loading />}

      {bookInfo !== null && !loading && (
        <BookModal bookInfo={bookInfo} cover={cover} author={author} />
      )}
    </div>
  );
}

function ISBNForm({ onSubmit, setISBN }) {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="ISBN"
        type="text"
        name="ISBN"
        onChange={(e) => setISBN(e.target.value)}
      />
      <Button color="primary" type="submit">
        Kitabı Bul
      </Button>
    </form>
  );
}

function BookModal({ bookInfo, cover, author }) {
  const [bookSelected, setBookSelected] = useState(false);
  const [bookRejected, setBookRejected] = useState(false);

  return (
    <div className="book-modal">
      <div className="info-container">
        <img src={cover} alt="cover" />
        <div>
          <span> {bookInfo.title} </span>
          <span> {author} </span>
        </div>
      </div>
      {!bookRejected && !bookSelected && (
        <div>
          <Button
            color="primary"
            type="submit"
            onClick={() => setBookSelected(true)}
          >
            Onayla
          </Button>
          <Button
            color="primary"
            type="submit"
            onClick={() => setBookRejected(true)}
          >
            İptal et
          </Button>
        </div>
      )}

      {bookSelected && (
        <div>
          <Button
            color="primary"
            type="submit"
            onClick={() => setBookSelected(true)}
          >
            Özet Ekle
          </Button>
        </div>
      )}
    </div>
  );
}
