import { TextField, Button, Checkbox, Paper, Grid } from "@material-ui/core";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../components/generic/Loading";
import { useAuthorForm, useBookForm } from "../../useForm";
import { useForm, Controller } from "react-hook-form";
import "./AddBookPage.scss";
import BookForm from "./BookForm";
import AuthorForm from "./AuthorForm";
import SummaryForm from "./SummaryForm";

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
              timeout: 5000,
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
    <form
      onSubmit={onSubmit}
      style={{
        backgroundColor: "white",
        width: "50%",
        borderRadius: "10px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        paddingBottom: "10px",
      }}
    >
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
  return (
    <div className="book-modal">
      <div className="info-container">
        <img src={cover} alt="cover" />
        <div>
          <span> {bookInfo.title} </span>
          <span> {author} </span>
        </div>
      </div>

      <div>
        <h4>Bu kitapın kütüphanemize eklenmesi gerekiyor. </h4>
        <SummaryForm />
        <AuthorForm />
        <BookForm />
      </div>

      {/*<div>
          <Button
            color="primary"
            type="submit"
            onClick={() => setBookSelected(true)}
          >
            Özet Ekle
          </Button>
        </div>*/}
    </div>
  );
}
