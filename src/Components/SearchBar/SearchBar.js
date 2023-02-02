import React, { useState } from "react";
import { Link } from "react-router-dom";

import searchIcon from "../../Icons/search-icon.svg";

import styles from "./SearchBar.module.scss";

const SearchBar = ({ currentState, callBack, state }) => {
  const [serchValue, setSearchValue] = useState("");

  const searchChangeHandler = (e) => {
    const value = e.target.value;
    setSearchValue(value);
  };

  return (
    <div
      className={
        currentState
          ? styles["nav__searchBar--open"]
          : styles["nav__searchBar--close"]
      }
    >
      <input
        type="text"
        className={styles.nav__search__input}
        onChange={searchChangeHandler}
      />

      <Link
        to={`/products?search=${serchValue}`}
        className={styles.nav__searchBar__icon}
        onClick={() => callBack({ type: "searchBar", payload: !state })}
      >
        <img src={searchIcon} alt="" />
      </Link>
    </div>
  );
};

export default SearchBar;
