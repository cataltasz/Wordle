import "./CardSlider.scss";

import React, { useEffect, useRef } from "react";
import Card from "./../Card/Card";

import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos
} from "react-icons/md";
import { useSelector } from "react-redux";

export default function CardSlider({ title, cardInfos, style }) {
  const theme = useSelector((state) => state.theme.value);

  const sliderRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    updateIcons();
  }, []);

  const scrollSlider = (direction) => {
    updateIcons();
    if (direction) sliderRef.current.scrollLeft -= 210;
    else sliderRef.current.scrollLeft += 210;
  };

  const updateIcons = () => {
    if (sliderRef.current.scrollLeft === 0)
      leftRef.current.className = "CardSliderIcon ArrowDisabled";
    else leftRef.current.className = "CardSliderIcon ArrowActive";

    if (
      sliderRef.current.scrollLeft >=
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth
    )
      rightRef.current.className = "CardSliderIcon ArrowDisabled";
    else rightRef.current.className = "CardSliderIcon ArrowActive";
  };

  return (
    <div className="CardSliderContainer" style={style}>
      <h2> {title} </h2>
      <div className="CardSliderOver">
        <div
          ref={leftRef}
          className="CardSliderIcon ArrowDisabled"
          onClick={() => scrollSlider(true)}
          style={{
            borderRadius: "10px 0 0 10px"
          }}
        >
          <MdOutlineArrowBackIosNew />
        </div>

        <div
          className={"CardSlider " + theme}
          ref={sliderRef}
          onScroll={updateIcons}
        >
          {cardInfos.map((cardInfo, i) => (
            <Card key={i} cardInfo={cardInfo} />
          ))}
        </div>
        <div
          ref={rightRef}
          className="CardSliderIcon ArrowActive"
          onClick={() => scrollSlider(false)}
          style={{
            borderRadius: "0 10px 10px 0"
          }}
        >
          <MdOutlineArrowForwardIos />
        </div>
      </div>
    </div>
  );
}
