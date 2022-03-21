<<<<<<< HEAD
import "./styles.scss";
import Navbar from "./components/Navbar/Navbar";
import BookPage from "./components/BookPage/BookPage";
import Footer from "./components/Footer/Footer";
import AuthorPage from "./components/AuthorPage/AuthorPage";
import SumAuthorPage from "./components/SumAuthorPage/SumAuthorPage";
import HomePage from "./components/HomePage/HomePage";
import SignPage from "./components/SignPage/SignPage";
import DiscoverPage from "./components/DiscoverPage/DiscoverPage";
import TagRouter from "./components/TagPage/TagRouter";
import CategoriesPage from "./components/CategoriesPage/CategoriesPage";
import UserProfilePage from "./components/UserProfilePage/UserProfilePage";
import { useSelector } from "react-redux";
import AddPage from "./OzetEkleme/AddPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

export default function App() {
  const theme = useSelector((state) => state.theme.value);
  const auth = useSelector((state) => state.auth.value);

  return (
    <Router>
      <div className={"App " + theme}>
        <Navbar />

        <main className={"MainContainer " + theme}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/kesfet">
              <DiscoverPage />
            </Route>
            <Route path="/kategoriler">
              <CategoriesPage />
            </Route>
            <Route path="/hakkimizda">hakkimizda</Route>
            <Route path="/giris">
              <SignPage />
            </Route>
            <Route path="/ozet-ekle">
              <AddPage />
            </Route>

            {auth && (
              <Route path="/profil">
                <UserProfilePage />
              </Route>
            )}

            <Route path="/ozet/:ozetId" component={BookPage} />
            <Route path="/kategori/:tagName" component={TagRouter} />
            <Route path="/yazar/:yazarId" component={AuthorPage} />
            <Route path="/ozet-yazar/:yazarId" component={SumAuthorPage} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </main>
        <Footer />
=======
import { useRef, useState } from "react";
import "./App.css";
import allWords from "./words";
import { toLowerCase, findAll, intersection, trChars } from "./utils";
import TilesContainer from "./TilesContainer";

export default function App() {
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [word, setWord] = useState(
    allWords[Math.floor(Math.random() * allWords.length)]
  );
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [predictions, setPredictions] = useState([
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
    [
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
      { val: "", color: "black" },
    ],
  ]);

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      // enter pressed
      if (col === 5 && row < 6) {
        let copy = [...predictions];
        let guessWord = predictions[row].map((e) => e.val).join("");

        if (guessWord === word) {
          setFinished(true);
        }

        if (!allWords.includes(guessWord)) {
          setError(
            predictions[row].map((e) => e.val).join("") + " diye kelime olmaz!"
          );
          setCol(0);
          copy[row] = [
            { val: "", color: "black" },
            { val: "", color: "black" },
            { val: "", color: "black" },
            { val: "", color: "black" },
            { val: "", color: "black" },
          ];
          setPredictions(copy);
          setLoading(false);
          return;
        }

        let letter_indices_word, letter_indices_guess;
        for (let i = 0; i < copy[row].length; i++) {
          letter_indices_word = Array.from(findAll(word, guessWord[i]));
          letter_indices_guess = Array.from(findAll(guessWord, guessWord[i]));

          let same = intersection(letter_indices_word, letter_indices_guess);

          for (let idx = 0; idx < same.length; idx++) {
            copy[row][same[idx]].color = "green";
          }

          if (letter_indices_word.length > same.length) {
            for (let idx = 0; idx < letter_indices_guess.length; idx++) {
              if (!same.includes(letter_indices_guess[idx])) {
                copy[row][idx].color = "#cca700";
              }
            }
          }
        }

        setPredictions(copy);

        if (row === 5) {
          setFinished(true);
        }
        setRow(row + 1);
        setCol(0);
      }
    } else if (e.keyCode === 8) {
      // backspace pressed
      if (col > 0 && !finished) {
        let copy = [...predictions];
        copy[row][col - 1].val = "";
        setPredictions(copy);
        setCol((prev) => prev - 1);
      }
    }
  };

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
          e.target.value.charCodeAt(0) <= 122) ||
        trChars.includes(e.target.value[0])
      ) ||
      col > 4
    ) {
      e.target.value = "";
      return;
    }

    setLoading(true);

    //setError(null);
    //setPredictions(predictions);
    let copy = [...predictions];
    copy[row][col].val = toLowerCase(e.target.value)[0];
    setPredictions(copy);
    e.target.value = "";

    setCol(col + 1);
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
      <TilesContainer predictions={predictions} />

      <div className="InputContainer">
        <input
          ref={inputRef}
          autoFocus
          type="text"
          onChange={onInputChange}
          onKeyUp={onKeyUp}
        />
>>>>>>> e24a938b6aaf6dd85c01d4701156d6d704d31892
      </div>
    </Router>
  );
}
