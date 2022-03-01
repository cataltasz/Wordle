import { Link } from "react-router-dom";
import { useState } from "react";
import "./Card.scss";
export default function Card({ cardInfo, cardClass }) {
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <Link to={cardInfo.url}>
      <div className={"Card " + cardClass}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {(cardInfo.img === null || !imgLoaded) && (
              <div className="card-info-placeholder">
                <span className="card-text">
                  <b>{cardInfo.name} </b>
                </span>
                <span className="card-text"> {cardInfo.author} </span>
              </div>
            )}

            {cardInfo.img !== null && (
              <img
                src={cardInfo.img}
                alt="cover"
                className="card-img"
                onLoad={() => setImgLoaded(true)}
              />
            )}
          </div>
          <div className="card-info">
            <span className="card-text">
              <b>{cardInfo.name} </b>
            </span>
            <span className="card-text"> {cardInfo.author} </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
