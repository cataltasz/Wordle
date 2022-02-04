import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useFetchMore from "../../utils/useFetchMore";
import { LoadingSmall } from "../generic/Loading";

let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

const confMoreAuthors = (response) => {
  return response.data.result.authors.map((author) => {
    return {
      name: author.name,
      url: "/yazar/" + author.author_id,
      author: "",
      img: author.image_url,
    };
  });
};
export default function Authors({ oldAuthors, name, id }) {
  const count = 10;

  const [fetchMoreAuthors, authors, more] = useFetchMore(
    urlStart + id + "&type=authors&sort=date&asc",
    count,
    confMoreAuthors,
    oldAuthors
  );

  return (
    <div className="TagBookWrapper">
      <div className="TagBookHeader">
        <h2>{name + " Kategorisindeki Yazarlar"}</h2>
      </div>

      <div>
        {authors && (
          <InfiniteScroll
            className="TagBookContainer"
            dataLength={authors.length}
            next={fetchMoreAuthors}
            hasMore={more}
            loader={<LoadingSmall />}
          >
            {authors.map((author, i) => (
              <AuthorCard key={i} author={author} />
            ))}
          </InfiniteScroll>
        )}
      </div>
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
