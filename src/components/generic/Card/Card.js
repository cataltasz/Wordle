import { Link } from "react-router-dom";
import "./Card.scss";
export default function Card({ cardInfo, cardClass }) {
  return (
    <Link to={cardInfo.url}>
      <div className={"Card " + cardClass}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            {cardInfo.img === null ? (
              <div className="card-info-placeholder">
                <span className="card-text">
                  <b>{cardInfo.name} </b>
                </span>
                <span className="card-text"> {cardInfo.author} </span>
              </div>
            ) : (
              <img src={cardInfo.img} alt="cover" className="card-img" />
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
