import axios from "axios";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../generic/Card/Card";
import { LoadingSmall } from "../generic/Loading";
let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

export default function Books({ oldBooks, name, id }) {
  const [books, setBooks] = useState(oldBooks);
  const [more, setMore] = useState(true);
  const count = 10;

  const fetchMoreBooks = useCallback(() => {
    let offset = 0;
    if (books) offset = books.length;
    axios
      .get(
        urlStart +
          id +
          "&sort=date&asc&count=" +
          count +
          "&offset=" +
          offset +
          "&type=summaries"
      )
      .then((response) => {
        let newBooks = response.data.result.summaries.map((summary) => {
          return {
            name: summary.book.name,
            url: "/ozet/" + summary.summary_id,
            author: summary.book.author.map((au) => au.name).join("\n"),
            img: summary.book.image_url,
          };
        });

        if (newBooks.length % count !== 0) setMore(false);

        if (books) {
          setBooks((prev) => [...prev, ...newBooks]);
        } else {
          setBooks(newBooks);
        }
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="TagBookWrapper">
      <div className="TagBookHeader">
        <h2>{name + " Kategorisindeki Kitaplar"}</h2>
      </div>

      <div>
        <InfiniteScroll
          className="TagBookContainer"
          dataLength={books.length}
          next={fetchMoreBooks}
          hasMore={more}
          loader={<LoadingSmall />}
        >
          {books.map((book, i) => (
            <Card key={i} cardInfo={book} cardClass="Card big-card" />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}
