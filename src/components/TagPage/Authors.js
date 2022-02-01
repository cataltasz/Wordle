import axios from "axios";
import { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import { LoadingSmall } from "../generic/Loading";
let urlStart = "https://biozetapi.herokuapp.com/category?category_id=";

export default function Authors({ oldAuthors, name, id }) {
  const [authors, setAuthors] = useState(oldAuthors);
  const [more, setMore] = useState(true);
  const count = 10;

  const fetchMoreAuthors = useCallback(() => {
    let offset = 0;
    if (authors) offset = authors.length;
    axios
      .get(
        urlStart +
          id +
          "&sort=date&asc&count=" +
          count +
          "&offset=" +
          offset +
          "&type=authors"
      )
      .then((response) => {
        console.log(response.data)
        let newAuthors = response.data.result.authors.map((author) => {
          return {
            name: author.name,
            url: "/yazar/" + author.author_id,
            author: "",
            img: author.image_url,
          };
        });

        if (newAuthors.length % count !== 0) setMore(false);

        if (authors) {
          setAuthors((prev) => [...prev, ...newAuthors]);
        } else {
          setAuthors(newAuthors);
        }
      })
      .catch((e) => console.log(e));
  }, []);

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
