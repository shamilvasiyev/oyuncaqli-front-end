import React, { useState, useEffect, useReducer } from "react";

import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { TfiMenu } from "react-icons/tfi";

import styles from "./Nav.module.css";

import logo from "../../Static-images/logo-white.svg";
import callImage from "../../Icons/phone-icon.svg";
import searchIcon from "../../Icons/search-icon.svg";
import cartIcon from "../../Icons/cart-icon.svg";
import Cart from "../Cart/Cart";
import SearchBar from "../SearchBar/SearchBar";

const navInitialState = {
  cart: false,
  searchBar: false,
  navScroll: "navbar",
  hamburger: false,
};

function navReducer(state, action) {
  switch (action.type) {
    case "cart":
      return { ...state, cart: action.payload };
    case "searchBar":
      return { ...state, searchBar: action.payload };
    case "navScroll":
      return { ...state, navScroll: action.payload };
    case "hamburger":
      return { ...state, hamburger: action.payload };
    default:
      throw new Error();
  }
}

const Nav = () => {
  const [navState, dispatchNavState] = useReducer(navReducer, navInitialState);

  window.addEventListener("scroll", () => {
    let scrollValue = window.scrollY;

    if (Math.round(scrollValue) > 200) {
      dispatchNavState({ type: "navScroll", payload: "navbar--scrolled" });
    } else if (Math.round(scrollValue) <= 200) {
      dispatchNavState({ type: "navScroll", payload: "navbar" });
    }
  });

  const productsQuantity = useSelector((state) => state.card.totalQuantity);

  const openCart = () => {
    dispatchNavState({ type: "cart", payload: true });
  };

  const closeCart = () => {
    dispatchNavState({ type: "cart", payload: false });
  };

  return (
    <nav className={styles[navState.navScroll]}>
      <div className="container">
        <Cart open={navState.cart} handleClose={closeCart} />

        <div className={styles.nav_wrapper}>
          <div
            className={styles.nav__burger}
            onClick={() => {
              dispatchNavState({ type: "hamburger", payload: true });
            }}
          >
            <span>
              <TfiMenu />
            </span>
          </div>

          <div className={styles.logo}>
            <Link to="/">
              <img src={logo} alt="Logo" />
            </Link>
          </div>

          <div
            className={`${styles.nav_links} ${
              navState.hamburger ? styles.nav_links : styles.nav_links_close
            }`}
          >
            {navState.hamburger && (
              <div
                className={styles.nav__close__button}
                onClick={() => {
                  dispatchNavState({ type: "hamburger", payload: false });
                }}
              >
                <span>&#x2715;</span>
              </div>
            )}

            <Link
              to="/products"
              onClick={() => {
                dispatchNavState({ type: "hamburger", payload: false });
              }}
            >
              Oyuncaqlar
            </Link>
            <Link
              to="/products?category=zəka"
              onClick={() => {
                dispatchNavState({ type: "hamburger", payload: false });
              }}
            >
              Zəka
            </Link>
            <Link
              to="/products?category=musiqi"
              onClick={() => {
                dispatchNavState({ type: "hamburger", payload: false });
              }}
            >
              Musiqi
            </Link>
            <Link
              to="/products?category=nəqliyyat"
              onClick={() => {
                dispatchNavState({ type: "hamburger", payload: false });
              }}
            >
              Nəqliyyat
            </Link>
            <Link
              to="/products?category=digər"
              onClick={() => {
                dispatchNavState({ type: "hamburger", payload: false });
              }}
            >
              Digər
            </Link>
          </div>

          <div className={styles.nav_action_buttons}>
            <div className={styles.nav__icon__wrapper}>
              <img src={callImage} alt="" />
            </div>

            <div
              className={styles.nav__icon__wrapper}
              onClick={() => {
                dispatchNavState({
                  type: "searchBar",
                  payload: !navState.searchBar,
                });
              }}
            >
              <img src={searchIcon} alt="" />
            </div>

            <div className={styles.nav__icon__wrapper} onClick={openCart}>
              <img src={cartIcon} alt="" />
              <span>{productsQuantity}</span>
            </div>

            <SearchBar
              currentState={navState.searchBar}
              callBack={dispatchNavState}
              state={navState.searchBar}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
