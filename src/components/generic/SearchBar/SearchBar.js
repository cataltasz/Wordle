import React, { useState, useRef } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { Link } from "react-router-dom";

import "./SearchBar.scss";
import { useSelector } from "react-redux";

const SearchBar = (props) => {
  const theme = useSelector((state) => state.theme.value);

  let [searchValue, setSearchValue] = useState("");
  let [searchResult, setSearchResult] = useState(false);
  let [searchFocus, setSearchFocus] = useState(false);

  const inputRef = useRef(null);

  const searchMenu = (str) => {
    setSearchResult(true);
  };

  const onChangeHandler = (event) => {
    setSearchValue(event.target.value);
    checkSearchInput();
  };

  const checkSearchInput = () => {
    if (inputRef.current.value.length > 2) searchMenu(searchValue);
    else setSearchResult(false);
  };
  return (
    <div className={"search-bar " + (searchFocus && "focused")}>
      <div
        className="search-overlay"
        onClick={() => {
          setSearchFocus(false);
          setSearchResult(false);
        }}
      />
      <div
        className={"search-container " + theme}
        onClick={() => {
          inputRef.current.focus();
          setSearchFocus(true);
          checkSearchInput();
        }}
      >
        <BiSearchAlt2 className="search-icon" />
        <input
          ref={inputRef}
          value={searchValue}
          onChange={onChangeHandler}
          className={"prompt " + theme}
          type="text"
          placeholder="İstediğini Ara"
        />
      </div>
      <div
        className={
          "search-results " + (searchResult ? " " : " closed ") + theme
        }
      >
        <Link
          to="/ozet/1"
          onClick={() => {
            setSearchResult(false);
            setSearchFocus(true);
          }}
        >
          <div className="search-result">Olasılıksız</div>
        </Link>
        <Link
          to="/yazar/1"
          onClick={() => {
            setSearchResult(false);
            setSearchFocus(true);
          }}
        >
          <div className="search-result">Adam Fawer</div>
        </Link>
        <Link
          to="/tag/1"
          onClick={() => {
            setSearchResult(false);
            setSearchFocus(true);
          }}
        >
          <div className="search-result">Bilim Kurgu</div>
        </Link>
      </div>
    </div>
  );
};

export default SearchBar;
