import "./TagPage.scss";
import SearchBar from "./../generic/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../generic/Loading";
import TagHeader from "./TagHeader";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import Books from "./Books";
import Authors from "./Authors";
import TagPage from "./TagPage";

let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

export default function TagRouter({ match }) {
  const count = 2;
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      .then(() => setLoading(false))
      .catch((e) => {
        console.log(e);
      });
  }, [match.params.tagName]);

  if (loading) return <Loading />;
  //else if (books.length < 1) return <Failed />;
  return (
    <div className="TagPage">
      <SearchBar />
      <TagHeader data={data} />

      <Switch>
        <Route exact path={"/kategori/" + match.params.tagName}>
          <TagPage
            books={books}
            data={data}
            count={count}
            authors={authors}
            tagName={match.params.tagName}
          />
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
