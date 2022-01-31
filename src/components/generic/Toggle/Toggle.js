import { useState } from "react";
import "./Toggle.css";

export default function Toggle({ onToggle, initial }) {
  let [bool, setBool] = useState(initial);

  let handleToggle = () => {
    setBool(!bool);
    onToggle();
  };

  return (
    <div
      className={bool ? "toggle open" : "toggle closed"}
      onClick={handleToggle}
    >
      <div className="toggleIn"></div>
    </div>
  );
}
