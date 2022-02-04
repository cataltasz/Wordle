import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../generic/Card/Card";
import { LoadingSmall } from "../generic/Loading";

import useFetchMore from "./../../utils/useFetchMore";

let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

const confMoreBooks = (response) => {
  return response.data.result.summaries.map((summary) => {
    return {
      name: summary.book.name,
      url: "/ozet/" + summary.summary_id,
      author: summary.book.author.map((au) => au.name).join("\n"),
      img: summary.book.image_url,
    };
  });
};

export default function Books({ oldBooks, name, id }) {
  const count = 10;

  const [fetchMoreBooks, books, more] = useFetchMore(
    urlStart + id + "&type=summaries&sort=date&asc",
    count,
    confMoreBooks,
    oldBooks
  );

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
