import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  Fragment,
} from "react";

import { useLocation, useParams, Link } from "react-router-dom";

import { Box, Slider } from "@mui/material";

import styles from "./ProductsPage.module.css";
import SingleProduct from "../../Components/SingleProduct/SingleProduct";
import MainSpinner from "../../Components/MainSpinner/MainSpinner";

const initialState = {
  category: null,
  price: [],
  search: null,
  age: [],
  brand: null,
};

const actionsInitialState = {
  toggleBrands: false,
  loading: false,
  filterBoxOpen: false,
};

const brandsData = [
  {
    id: "1",
    text: "Marka seçin",
    urlEndpoint: "Marka seçin",
  },
  {
    id: "2",
    text: "Lego",
    urlEndpoint: "lego",
  },
  { id: "3", text: "Barbie", urlEndpoint: "barbie" },
  {
    id: "4",
    text: "BLX",
    urlEndpoint: "blx",
  },
  { id: "5", text: "Crafy", urlEndpoint: "crafy" },
  { id: "6", text: "Dollz'n More", urlEndpoint: "dollznmore" },
  { id: "7", text: "Fisher-Price", urlEndpoint: "fisher-price" },
  { id: "8", text: "Hot Wheels", urlEndpoint: "hot-wheels" },
  { id: "9", text: "LOL", urlEndpoint: "lol" },
  { id: "10", text: "Play-Doh", urlEndpoint: "play-doh" },
];

const ageInputData = [
  {
    id: "1",
    text: "1-2",
  },
  {
    id: "2",
    text: "2-4",
  },
  {
    id: "3",
    text: "4-6",
  },
  {
    id: "4",
    text: "5-10",
  },
  {
    id: "5",
    text: "12",
  },
];

const categoryInputData = [
  {
    id: "1",
    text: "Oğlan",
    urlEndpoint: "oğlan",
  },
  {
    id: "2",
    text: "Qız",
    urlEndpoint: "qız",
  },
  {
    id: "3",
    text: "Zəka",
    urlEndpoint: "zəka",
  },
  {
    id: "4",
    text: "Musiqi",
    urlEndpoint: "musiqi",
  },
  {
    id: "5",
    text: "Nəqliyyat",
    urlEndpoint: "nəqliyyat",
  },
  {
    id: "6",
    text: "Digər",
    urlEndpoint: "digər",
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "category":
      return { ...state, category: action.payload };
    case "price":
      return { ...state, price: action.payload };
    case "search":
      return { ...state, search: action.payload };
    case "age":
      if (action.checked || action.urlValue) {
        return { ...state, age: [...state.age, action.payload] };
      } else {
        return {
          ...state,
          age: state.age.filter((item) => item !== action.payload),
        };
      }
    case "brand":
      return { ...state, brand: action.payload };

    default:
      throw new Error();
  }
}

function actionsReducer(state, action) {
  switch (action.type) {
    case "brand":
      return { ...state, toggleBrands: action.payload };
    case "loading":
      return { ...state, loading: action.payload };
    case "filter":
      return { ...state, filterBoxOpen: action.payload };
    default:
      throw new Error();
  }
}

const ProductsPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [actionsState, dispatchActions] = useReducer(
    actionsReducer,
    actionsInitialState
  );

  const [products, setProducts] = useState([]);
  const [value, setValue] = useState([0, 1000]);
  const [genderState, setGenderState] = useState({
    options: [
      { id: "0", text: "qız" },
      { id: "1", text: "oğlan" },
    ],
    selected: undefined,
  });

  const { search } = useLocation();

  const fetchProductPageOpen = useCallback(async () => {
    let url;

    if (search.slice(0, 8).trim() === "") {
      // must fix
      url = `${process.env.REACT_APP_PRODUCTS_REQUEST}`;
    } else {
      url = `${process.env.REACT_APP_FILTER_REQUEST}${search}`;
    }

    dispatchActions({ type: "loading", payload: true });

    try {
      const response = await fetch(url);

      const data = await response.json();

      setProducts(data);
      dispatchActions({ type: "loading", payload: false });
    } catch (error) {
      console.log(error);
    }
  }, [search]);

  useEffect(() => {
    fetchProductPageOpen();
  }, [fetchProductPageOpen]);

  useEffect(() => {
    if (search.includes("age")) {
      const value = search.slice(5, search.length - 3);

      if (state.age.includes(value)) {
        return;
      } else {
        dispatch({ type: "age", payload: value, urlValue: true });
      }
    }

    if (search.includes("brand")) {
      const value = search.slice(7, search.length);

      dispatch({ type: "brand", payload: value });
    }
  }, [search, state.age]);

  let filterUrl = `${process.env.REACT_APP_FILTER_REQUEST}?`;

  if (state.category !== null) {
    filterUrl += state.category;
  }
  if (state.price.length > 0) {
    filterUrl += state.price;
  }
  if (state.search !== null) {
    filterUrl += state.search;
  }
  if (state.age.length === 1) {
    filterUrl += state.age[0];
  }
  if (state.age.length > 1) {
    state.age.map((a) => (filterUrl += a));
  }
  if (state.brand !== null && state.brand !== "brand=Marka seçin&") {
    filterUrl += state.brand;
  }

  const fetchFilteredData = async () => {
    const url = filterUrl;
    dispatchActions({ type: "loading", payload: true });

    try {
      const response = await fetch(url);

      const data = await response.json();

      setProducts(data);
      dispatchActions({ type: "loading", payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  function valuetext(value) {
    return `${value} manat`;
  }

  const genderSelectHandler = (e) => {
    if (genderState.selected === e.target.id) {
      setGenderState((prev) => {
        return { ...prev, selected: undefined };
      });
    } else {
      setGenderState((prev) => {
        return {
          ...prev,
          selected: e.target.id,
        };
      });
    }
  };

  useEffect(() => {
    if (genderState.selected !== undefined) {
      dispatch({
        type: "category",
        payload: `category=${genderState.options[genderState.selected].text}&`,
      });
    } else {
      dispatch({
        type: "category",
        payload: null,
      });
    }
  }, [genderState.options, genderState.selected]);

  const tagNameChangeHandler = (e) => {
    const inputValue = e.target.value;

    dispatch({ type: "search", payload: `search=${inputValue}&` });
  };

  const ageSelectHandler = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      dispatch({ type: "age", payload: `age=${value}&`, checked });
    } else {
      dispatch({ type: "age", payload: `age=${value}&` });
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    dispatch({ type: "price", payload: `price=[${newValue}]&` });
  };

  return (
    <Fragment>
      <section className={`${styles.product__page} section_wrapper`}>
        <div className="container">
          <div className={styles.pageWrapper}>
            <form
              className={
                actionsState.filterBoxOpen
                  ? styles.filterBoxWrapper__open
                  : styles.filterBoxWrapper
              }
            >
              <div
                className={styles.filter__close}
                onClick={() => {
                  dispatchActions({ type: "filter", payload: false });
                }}
              >
                <span>&#x2715;</span>
              </div>

              <div className={styles.filterBox}>
                <p className={styles.filterBox__header}>Cins</p>

                {genderState?.options.map((data) => (
                  <label key={data.id}>
                    {data.text}

                    <input
                      id={data.id}
                      checked={data.id === genderState.selected}
                      name={data.text}
                      type={"checkbox"}
                      onChange={(e) => genderSelectHandler(e)}
                    />

                    <span className={styles.checkmark} />
                  </label>
                ))}
              </div>

              <div className={styles.filterBox}>
                <p className={styles.filterBox__header}>
                  Qiymətə görə filtrələyin
                </p>

                <Box className={styles.filterBox__priceSlider}>
                  <Slider
                    getAriaLabel={() => null}
                    value={value}
                    onChange={handleChange}
                    getAriaValueText={valuetext}
                    size="small"
                    max={1000}
                  />
                </Box>

                <div className={styles.filterBox__priceWrapper}>
                  <p>
                    {value[0]} <span>Azn</span>
                  </p>
                  <p>
                    {value[1]} <span>Azn</span>
                  </p>
                </div>
              </div>

              <div className={styles.filterBox}>
                <div className={styles.filterBox__tagWrapper}>
                  <input
                    type="text"
                    placeholder="məhsul növü"
                    onChange={tagNameChangeHandler}
                  />
                </div>
              </div>

              <div className={styles.filterBox}>
                <p className={styles.filterBox__header}>Yaş</p>

                {ageInputData.map((age) => (
                  <label key={age.id}>
                    {age.text} yaş
                    <input
                      defaultChecked={search.includes(age.text)}
                      type={"checkbox"}
                      value={age.text}
                      onChange={ageSelectHandler}
                    />
                    <span className={styles.checkmark} />
                  </label>
                ))}
              </div>

              <div className={styles.filterBox}>
                <p className={styles.filterBox__header}>Marka</p>

                <div className={styles.brandsWrapper}>
                  <div
                    className={styles.brands__header}
                    onClick={() => {
                      dispatchActions({
                        type: "brand",
                        payload: !actionsState.toggleBrands,
                      });
                    }}
                  >
                    <p>
                      {state.brand === null
                        ? "Marka seçin"
                        : state.brand.slice(6, 7).toUpperCase() +
                          state.brand.slice(7, state.brand.length - 1)}
                    </p>

                    <div className={styles.brands__header__icon}>
                      <span>&#9660;</span>
                    </div>
                  </div>

                  <div
                    className={
                      actionsState.toggleBrands
                        ? styles["brands--open"]
                        : styles["brands--close"]
                    }
                  >
                    {brandsData.map((b) => (
                      <button
                        type="button"
                        key={b.id}
                        value={b.text}
                        onClick={() => {
                          dispatch({
                            type: "brand",
                            payload: `brand=${b.urlEndpoint}&`,
                          });
                          dispatchActions({ type: "brand", payload: false });
                        }}
                      >
                        {b.text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className={styles.submitButton}
                onClick={fetchFilteredData}
              >
                Təsdiq
              </button>

              <div className={styles.search__categories}>
                <h3>Kateqoriyalar</h3>

                <div className={styles.search__categories__link}>
                  {categoryInputData.map((data) => (
                    <Link
                      to={`/products?category=${data.urlEndpoint}`}
                      key={data.id}
                    >
                      {data.text}
                    </Link>
                  ))}
                </div>
              </div>
            </form>

            <div className={styles.filterButoonWrapper}>
              <button
                onClick={() => {
                  dispatchActions({ type: "filter", payload: true });
                }}
              >
                Filtr
              </button>
            </div>

            {actionsState.loading ? (
              <MainSpinner />
            ) : (
              <div
                className={
                  // products.length >= 3
                  // ?
                  styles.contentWrapper
                  // : styles.contentWrapper_responsive
                }
              >
                {products?.map((product, i) => (
                  <SingleProduct
                    key={i}
                    product={product}
                    productsPage={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProductsPage;
