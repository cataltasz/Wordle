import { useEffect, useRef, useState } from "react";
import "./App.css";
export default function App() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [word, setWord] = useState("erica");
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef();
  const [predictions, setPredictions] = useState([
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ],
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ],
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ],
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ],
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ],
    [
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" },
      { val: "", color: "black1" }
    ]
  ]);

  const getWord = () => {
    fetch("https://random-word-api.herokuapp.com/word?number=10").then(
      (res) => {
        res.json().then((data) => {
          let found = false;
          for (let w in data) {
            if (data[w].length === 5) {
              setWord(data[w]);
              found = true;
              break;
            }
          }
          if (!found) getWord();
          else {
            setLoading(false);

            inputRef.current.focus();
          }
        });
      }
    );
  };
  useEffect(() => {
    getWord();
  }, []);

  const onInputChange = async function (e) {
    if (finished || loading) {
      e.target.value = "";
    }
    setError(null);
    if (
      !(
        (e.target.value.charCodeAt(0) >= 65 &&
          e.target.value.charCodeAt(0) <= 90) ||
        (e.target.value.charCodeAt(0) >= 97 &&
          e.target.value.charCodeAt(0) <= 122)
      )
    ) {
      e.target.value = "";
      return;
    }

    setLoading(true);

    //setError(null);
    setPredictions(predictions);
    let copy = [...predictions];
    copy[row][col].val = e.target.value[0].toLowerCase();
    setPredictions(copy);
    e.target.value = "";

    if (col === 4) {
      try {
        let res = await fetch(
          "https://api.dictionaryapi.dev/api/v2/entries/en/" +
            predictions[row].map((e) => e.val).join("")
        );

        let data = await res.json();
        let dummy = data[0].word;
      } catch (e) {
        setError(
          predictions[row].map((e) => e.val).join("") + " diye kelime olmaz!"
        );
        setCol(0);
        copy[row] = [
          { val: "", color: "black1" },
          { val: "", color: "black1" },
          { val: "", color: "black1" },
          { val: "", color: "black1" },
          { val: "", color: "black1" }
        ];
        setPredictions(copy);
        setLoading(false);
        return;
      }

      for (let i = 0; i < copy[row].length; i++) {
        let color = "black";
        if (word.includes(copy[row][i].val)) {
          color = "#cca700";
          if (word.indexOf(copy[row][i].val) === i) color = "green";
        }

        copy[row][i].color = color;
      }

      if (predictions[row].map((e) => e.val).join("") === word) {
        setFinished(true);
      }

      if (row === 5) {
        setFinished(true);
      }
      setRow(row + 1);
    }
    setCol((col + 1) % 5);
    setLoading(false);
  };

  return (
    <div
      className="App"
      onClick={() => {
        inputRef.current.focus();
      }}
    >
      <h1> WORDLE ÇAKMASI </h1>
      {finished && (
        <div className="error">
          <h3>{word}</h3>
        </div>
      )}
      {error && (
        <div className="error">
          <h3>{error}</h3>
        </div>
      )}
      <div className="TilesContainer">
        {predictions.map((prediction) => (
          <div className="TileRow">
            {prediction.map((letter) => (
              <div className="Tile" style={{ backgroundColor: letter.color }}>
                <p>{letter.val.toUpperCase()}</p>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="InputContainer">
        <input ref={inputRef} autoFocus type="text" onChange={onInputChange} />
      </div>
    </div>
  );
}
