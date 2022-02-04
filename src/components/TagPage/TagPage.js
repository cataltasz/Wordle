import "./TagPage.scss";
import Card from "./../generic/Card/Card";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function TagPage({ books, data, count, authors, tagName }) {
  console.log({ books, data, count, authors, tagName });
  return (
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
                to={"/kategori/" + tagName + "/ozetler"}
                className="showAllButton"
              >
                <span>Tümünü Gör</span>
                <AiOutlineArrowRight />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <h3> Bu kategoride kitap bulunamadı</h3>
      )}

      {authors.length ? (
        <div className="TagBookWrapper">
          <h2>{data.name + " Kategorisindeki Yazarlar"}</h2>
          <div className="TagBookContainer">
            {authors.map((author, i) => (
              <AuthorCard author={author} key={i} />
            ))}

            {authors.length % count === 0 && (
              <Link
                to={"/kategori/" + tagName + "/yazarlar"}
                className="showAllButton"
              >
                <span>Tümünü Gör</span>
                <AiOutlineArrowRight />
              </Link>
            )}
          </div>
        </div>
      ) : (
        <h3> Bu kategoride yazar bulunamadı</h3>
      )}
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
