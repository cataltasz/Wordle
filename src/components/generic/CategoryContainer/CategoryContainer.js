import { Link } from "react-router-dom";
import "./CategoryContainer.css";
import React, { useState } from "react";

export default function CategoryContainer({ categories, catClass }) {
  return (
    <div className="CategoryContainer">
      {categories.map((cat) => (
        <Category
          key={cat.key}
          cat={cat}
          catClass={catClass}
          random={bgs[Math.floor(Math.random() * bgs.length)]}
        />
      ))}
    </div>
  );
}

const bgs = [
  {
    a: "linear-gradient(135deg, #5b247a 0%,#1bcedf 100%)",
    b: "linear-gradient(-135deg, #5b247a 0%,#1bcedf 100%)"
  },
  {
    a: "linear-gradient(135deg, #42e695 0%,#3bb2b8 100%)",
    b: "linear-gradient(-135deg, #42e695 0%,#3bb2b8 100%)"
  },
  {
    a: "linear-gradient(135deg, #DFEC51 0%,#73AA0A 100%)",
    b: "linear-gradient(-135deg, #DFEC51 0%,#73AA0A 100%)"
  },
  {
    a: "linear-gradient(135deg, #E3E3E3 0%,#5D6874 100%)",
    b: "linear-gradient(-135deg, #E3E3E3 0%,#5D6874 100%)"
  },
  {
    a: "linear-gradient(135deg, #f2d50f 0%,#da0641 100%)",
    b: "linear-gradient(-135deg, #f2d50f 0%,#da0641 100%)"
  },
  {
    a: "linear-gradient(135deg, #c3ec52 0%,#0ba29d 100%)",
    b: "linear-gradient(-135deg, #c3ec52 0%,#0ba29d 100%)"
  }
];
function Category({ cat, catClass, random }) {
  let [hover, setHover] = useState(false);
  return (
    <Link
      to={cat.url}
      className={catClass}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ background: hover ? random.a : random.b }}
    >
      <div>{cat.name}</div>
    </Link>
  );
}
