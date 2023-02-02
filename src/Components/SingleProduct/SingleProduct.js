import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import Cart from "../Cart/Cart";
import ProductModal from "../Product-modal/ProductModal";

import { ToastContainer, toast } from "react-toastify";

import { useDispatch } from "react-redux";
import { cardActions } from "../../Store";

import eyeIcon from "../../Icons/eye-icon.svg";
import cartIcon from "../../Icons/cart-o-icon.svg";

import styles from "./SingleProduct.module.scss";
import "react-toastify/dist/ReactToastify.css";
import ProductActionWrapper from "../Product-action-wrapper/ProductActionWrapper";

const SingleProduct = ({ product, onClickProduct, productsPage }) => {
  const [currentID, setCurrentId] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const dispatch = useDispatch();

  const close = () => setModalOpen(false);

  const handleOpen = (e) => {
    setCurrentId(e.currentTarget.id);
    setModalOpen(true);
  };

  // const openHandler = (e) => {
  //   setCurrentId(e.currentTarget.id);
  // };

  useEffect(() => {
    if (currentID === product._id) {
      setCurrentProduct(product);
    }
  }, [currentID, product]);

  const addToCartHandler = () => {
    dispatch(
      cardActions.addItemToCard({
        id: product._id,
        image: product.images[0],
        title: product.title,
        price: product.onSalePrice ? product.onSalePrice : product.price,
      })
    );
  };

  const openCartHandler = () => setCartOpen(true);

  const closeCartHandler = () => setCartOpen(false);

  // const notificationHandler = useCallback(
  //   () =>
  //     toast.success("Məhsul səbətə əlavə olundu!", {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     }),
  //   []
  // );

  return (
    <Fragment>
      <ProductModal
        product={currentProduct}
        open={modalOpen}
        handleClose={close}
      />

      <Cart open={cartOpen} handleClose={closeCartHandler} />

      <div
        className={styles.product__wrapper}
        style={productsPage && { height: "fit-content", maxWidth: "300px" }}
      >
        {/* <div className={styles.toastWrapper}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{
              borderColor: "#2CA666",
              color: "#000",
            }}
          />
        </div> */}

        <Link
          to={`/${product.category}/${product._id}`}
          className={styles.product__infoWrapper}
          onClick={onClickProduct}
        >
          <div className={styles.product__imageBox}>
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${product.images[0].imageUrl}`}
              alt={product.title}
            />
          </div>

          <div className={styles.product__info__box}>
            <h3>{product.title}</h3>

            <p>{product.description}</p>
          </div>
        </Link>

        <div className={styles.product__actionWrapper}>
          {/* <div className={styles.product__actionButtons}>
            <div className={styles.product__buttonWrapper} onClick={handleOpen}>
              <img src={eyeIcon} alt="" id={product._id} />
              <span id={product._id}>Bax</span>
            </div>
          </div>

          <div
            className={styles.product__actionButtons}
            id={product._id}
            onClick={openHandler}
          >
            <ProductActionWrapper
              toastState
              id={currentProduct?._id}
              title={currentProduct?.title}
              image={currentProduct?.images[0]?.imageUrl}
              price={currentProduct?.price}
            />
          </div> */}

          <div className={styles.product__actionButtons}>
            <div
              className={styles.product__buttonWrapper}
              onClick={handleOpen}
              id={product._id}
            >
              <img src={eyeIcon} alt="" id={product._id} />
              <span id={product._id}>Bax</span>
            </div>

            <div
              className={styles.product__buttonWrapper}
              onClick={addToCartHandler}
            >
              <img src={cartIcon} alt="" />
              <span>Səbətə at</span>
            </div>
          </div>

          <div
            className={styles.product__priceBox}
            id={product._id}
            onClick={() => {
              openCartHandler();
              addToCartHandler();
            }}
          >
            {product.onSalePrice !== "null" && (
              <p>
                {product.price} <span>azn</span>
              </p>
            )}

            {product.onSalePrice !== "null" ? (
              <h5>
                {product.onSalePrice} <span>azn</span>
              </h5>
            ) : (
              <h5>
                {product.price} <span>azn</span>
              </h5>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleProduct;
