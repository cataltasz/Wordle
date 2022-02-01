import { useSelector } from "react-redux";
import "./TagHeader.scss";

export default function TagHeader({ data }) {
  const theme = useSelector((state) => state.theme.value);

  return (
    <header className="TagHeaderContainer">
      <div
        className="TagThumbnailContainer"
        style={{ backgroundImage: `url('${data.thumbnail}')` }}
      />

      <div className="TagThumbnailOverlay" />

      <div className="TagInfoContainer">
        {data.cover_img && (
          <div className="TagHeaderCover">
            <img
              className="TagHeaderCoverImg"
              src={data.cover_img}
              alt="cover"
            />
          </div>
        )}
        <div className={"TagHeaderInfo " + theme}>
          <h1>{data.name}</h1>
        </div>
      </div>
    </header>
  );
}
