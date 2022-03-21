import { toUpperCase } from "./utils";

export default function TilesContainer(props) {
  return (
    <div className="TilesContainer">
      {props.predictions.map((prediction) => (
        <div className="TileRow">
          {prediction.map((letter) => (
            <div className="Tile" style={{ backgroundColor: letter.color }}>
              <p>{toUpperCase(letter.val)}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
