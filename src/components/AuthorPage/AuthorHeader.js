import { Link } from "react-router-dom";

export default function AuthorHeader({ data, wiki }) {
  return (
    <header className="AuthorHeader">
      <div className="AuthorInfoTop">
        <div className="AuthorInfo">
          <h2>{data.name}</h2>
          <p>
            {data.categories.map((tag, i) => (
              <Tag tag={tag} key={i} />
            ))}
          </p>
        </div>

        <div className="AuthorPhoto">
          <img className="AuthorPhotoImg" src={data.image_url} alt="cover" />
        </div>
      </div>

      {wiki && (
        <div className="WikiContainer">
          <div className="Wiki clickable-gray-box">
            <Link to="/ozet-yazar/yazar">
              <img
                className="WikiImg"
                src="https://upload.wikimedia.org/wikipedia/commons/d/de/Wikipedia_Logo_1.0.png"
                alt="cover"
              />
            </Link>
            <span>
              <b>Hakkında</b>
              <br />
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: wiki }}
              ></div>
            </span>
          </div>
        </div>
      )}
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
