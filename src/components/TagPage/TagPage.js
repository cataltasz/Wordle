import "./TagPage.scss";
import SearchBar from "./../generic/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../generic/Loading";
import Card from "./../generic/Card/Card";
import TagHeader from "./TagHeader";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Books from "./Books";
import Authors from "./Authors";

let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

export default function TagPage({ match }) {
  const count = 2;
  const [books, setBooks] = useState(null);
  const [authors, setAuthors] = useState(null);

  const [data, setData] = useState(null);
  let path = useRouteMatch().path;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Kategori yükleniyor... ";
    axios
      .get(
        urlStart +
          match.params.tagName +
          "&sort=date&asc&count=" +
          count +
          "&offset=" +
          0
      )
      .then((response) => {
        console.log(response.data);
        setBooks(
          response.data.result.summaries.map((summary) => {
            return {
              name: summary.book.name,
              url: "/ozet/" + summary.summary_id,
              author: summary.book.author.map((au) => au.name).join("\n"),
              img: summary.book.image_url,
            };
          })
        );
        setAuthors(
          response.data.result.authors.map((author) => {
            return {
              name: author.name,
              url: "/yazar/" + author.author_id,
              author: "",
              img: author.image_url,
            };
          })
        );
        setData(response.data.result);
        document.title = response.data.result.name + " - Bi'Özet";
      })
      .catch((e) => {
        console.log(e);
      });
  }, [match.params.tagName]);

  if (!data) return <Loading />;
  //else if (books.length < 1) return <Failed />;
  return (
    <div className="TagPage">
      <SearchBar />
      <TagHeader data={data} />

      <Switch>
        <Route exact path={"/kategori/" + match.params.tagName}>
          <div className="TagResContainer">
            {books.length ? (
              <div className="TagBookWrapper">
                <div className="TagBookHeader">
                  <h2>{data.name + " Kategorisindeki Kitaplar"}</h2>
                </div>

                <div className="TagBookContainer">
                  {books.map((book, i) => (
                    <Card key={i} cardInfo={book} cardClass="Card big-card" />
                  ))}

                  {books.length % count === 0 && (
                    <Link
                      to={"/kategori/" + match.params.tagName + "/ozetler"}
                      className="showAllButton"
                    >
                      <span>Tümünü Gör</span>
                      <AiOutlineArrowRight />
                    </Link>
                  )}
                </div>
              </div>
            ): 
            <h3> Bu kategoride kitap bulunamadı</h3>}

            {authors.length ? (
              <div className="TagBookWrapper">
                <h2>{data.name + " Kategorisindeki Yazarlar"}</h2>
                <div className="TagBookContainer">
                  {authors.map((author, i) => (
                    <AuthorCard author={author} key={i} />
                  ))}

                  {authors.length % count === 0 && (
                    <Link
                      to={"/kategori/" + match.params.tagName + "/yazarlar"}
                      className="showAllButton"
                    >
                      <span>Tümünü Gör</span>
                      <AiOutlineArrowRight />
                    </Link>
                  )}
                </div>
              </div>
            ) : 
            <h3> Bu kategoride yazar bulunamadı</h3>}
          </div>
        </Route>

        <Route path={"/kategori/" + match.params.tagName + "/ozetler"}>
          <Books oldBooks={books} name={data.name} id={data.category_id} />
        </Route>

        <Route path={"/kategori/" + match.params.tagName + "/yazarlar"}>
          <Authors
            oldAuthors={authors}
            name={data.name}
            id={data.category_id}
          />
        </Route>

        <Route render={() => <Redirect to={`${path}`} />} />
      </Switch>
    </div>
  );
}

function AuthorCard({ author }) {
  return (
    <Link className="AuthorCard" to={author.url}>
      <img src={author.img} alt="Yazar Fotoğrafı" />
      <span>{author.name}</span>
    </Link>
  );
}

function Failed() {
  const style = {
    position: "absolute",
    width: "100vw",
    height: "calc(100vh - 50px)",
    top: "50px",
    left: 0,

    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };
  return <div style={style}> Böyle bir kategori olduğunu hiç sanmıyorum. </div>;
}
