import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./BookHeader.scss";

export default function BookHeader({ data }) {
  const theme = useSelector((state) => state.theme.value);
console.log(`url('https://covers.openlibrary.org/b/isbn/${data.book.isbn}-L.jpg')`)
  const getDate = () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };
    let date = new Date(data.date);
    return date.toLocaleDateString("tr-TR", options);
  };

  return (
    <header className="BookHeaderContainer">
      <div
        className="BookThumbnailContainer"
        style={{ backgroundImage: `url('https://covers.openlibrary.org/b/isbn/${data.book.isbn}-L.jpg')` }}
      />

      <div className="BookThumbnailOverlay" />

      <div className="BookInfoContainer">
        <div className="BookHeaderCover">
          <img
            className="BookHeaderCoverImg"
            src={`https://covers.openlibrary.org/b/isbn/${data.book.isbn}-L.jpg`}
            alt="cover"
          />
        </div>
        <div className={"BookHeaderInfo " + theme}>
          <h1>{data.book.name}</h1>
          <p>
            {data.book.tags &&
              data.book.tags.map((tag, i) => <Tag tag={tag} key={i} />)}
          </p>
          <span>{getDate()}</span>
        </div>

        <div className={"BookAuthors " + theme}>
          {data.book.author.map((author) => (
            <Link to={"/yazar/" + author.author_id}>
              <div className={"BookAuthor clickable-gray-box " + theme}>
                <img
                  className="BookAuthorImg"
                  src={`https://covers.openlibrary.org/a/olid/${author.olid}-L.jpg`}
                  alt="cover"
                />
                <span>
                  Yazar:
                  <br /> <b>{author.name}</b>
                </span>
              </div>
            </Link>
          ))}
          <Link to={"/ozet-yazar/" + data.writer.writer_id}>
            <div className={"BookAuthor clickable-gray-box " + theme}>
              <img
                className="BookAuthorImg"
                src={data.writer.image_url}
                alt="cover"
              />
              <span>
                Özet:
                <br /> <b>{data.writer.name}</b>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

function Tag({ tag }) {
  return (
    <Link to={"/kategori/" + tag} className="clickable-green">
      {tag + " "}
    </Link>
  );
}
