import "./TagPage.scss";
import SearchBar from "./../generic/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./../generic/Loading";
//import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./../generic/Card/Card";
import TagHeader from "./TagHeader";
let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

export default function TagPage({ match }) {
  const count = 2;
  const [books, setBooks] = useState(null);
  const [authors, setAuthors] = useState(null);

  const [data, setData] = useState(null);
  //const [more, setMore] = useState(true);

  const confBookData = (summaries) => {
    let newBooks = summaries.map((summary) => {
      return {
        name: summary.book.name,
        url: "/ozet/" + summary.summary_id,
        author: summary.book.author.name,
        img: summary.book.image_url
      };
    });

    if (books) {
      setBooks(prev => [...prev, ...newBooks])
    } else {
      //if (newBooks.length < 1) setMore(false);
      setBooks(newBooks);
    }
  };

  const confAuthorData = (authors) => {
    let newAuthors = authors.map((author) => {
      return {
        name: author.name,
        url: "/yazar/" + author.author_id,
        author: "",
        img: author.image_url
      };
    });
    setAuthors(newAuthors);
  };
  /*
  const fetchMoreBooks = useCallback(() => {
    let offset = 0;
    if (books) offset = books.length;
    axios
      .get(
        urlStart +
          match.params.tagName +
          "&sort=date&asc&count=" +
          count +
          "&offset=" +
          offset +
          "&type=summaries"
      )
      .then((response) => {
        console.log(response.data);
        confBookData(response.data.result.summaries);
      })
      .catch((e) => console.log(e));
  }, []);
*/
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

        confBookData(response.data.result.summaries);
        confAuthorData(response.data.result.authors);
        setData(response.data.result);
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
      <div className="TagResContainer">
        {books && (
          <div className="TagBookWrapper">
            <div className="TagBookHeader">
              <h2>Kitaplar</h2>
            </div>

            <div className="TagBookContainer">
              {/*<div>
                <InfiniteScroll
                  dataLength={books.length}
                  next={fetchMoreBooks}
                  hasMore={more}
                  loader={<LoadingSmall />}
                >*/}
                  {books.map((book, i) => (
                    <Card key={i} cardInfo={book} cardClass="Card big-card" />
                  ))}
                {/*</InfiniteScroll>
                  </div>*/}
            </div>
          </div>
        )}

        {authors && (
          <div className="TagBookWrapper">
            <div className="TagBookHeader">Yazarlar</div>
            <div className="TagBookContainer">
              {authors.map((book, i) => (
                /*<AuthorBook book={book} />*/
                <Card key={i} cardInfo={book} cardClass="Card big-card" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
    alignItems: "center"
  };
  return <div style={style}> Böyle bir kategori olduğunu hiç sanmıyorum. </div>;
}
