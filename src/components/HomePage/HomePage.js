import "./HomePage.scss";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";

import { HiLightBulb } from "react-icons/hi";
import { AiFillPlayCircle } from "react-icons/ai";
import Fade from "react-reveal/Fade";

import { homeConstants } from "./../../utils/strings";

export default function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Bi'Özet: Anasayfa ";
  }, []);

  return (
    <div className="HomePage">
      <div className="Thumbnail">
        <div className="ThumbnailImg"></div>
        <div className="ThumbnailOverlay"></div>
        <Fade>
          <div className="ThumbnailOver">
            <h1>{homeConstants.BRAND_NAME}</h1>
            <h3>{homeConstants.SHORT_DESC}</h3>
            <span>{homeConstants.LONG_DESC}</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "10px",
              }}
            >
              <Link to="/giris" className="SignupBtnHome">
                {homeConstants.SIGNUP}
              </Link>
              <Link to="/kesfet" className="ThumbBtn">
                {homeConstants.DISCOVER_BTN}
                <AiFillPlayCircle style={{ paddingLeft: "5px" }} />
              </Link>
            </div>
          </div>
        </Fade>

        <div className="IntroBoxes">
          {homeConstants.PROM_CARDS.map((data, i) => (
            <IntroBox data={data} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function IntroBox({ data }) {
  return (
    <Link to={data.URL} className="IntroBoxLink">
      <Fade>
        <div className="IntroBox">
          <div className="WhiteIconContainer">
            <HiLightBulb className="IntroIcon" />
          </div>
          <h4>{data.TITLE}</h4>
          <span>{data.DETAIL}</span>
        </div>
      </Fade>
    </Link>
  );
}
