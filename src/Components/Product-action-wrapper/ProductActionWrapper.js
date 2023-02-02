import React, { Fragment, useState } from "react";
import Cart from "../Cart/Cart";
import { useDispatch } from "react-redux";
import { cardActions } from "../../Store/index";

import { ToastContainer, toast } from "react-toastify";

import styles from "./ProductActionWrapper.module.scss";
import "react-toastify/dist/ReactToastify.css";

import cart from "../../Icons/cart-o-icon.svg";

const ProductActionWrapper = ({ id, image, title, price, onSalePrice }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    dispatch(
      cardActions.addItemToCard({
        id,
        image,
        title,
        price: onSalePrice ? onSalePrice : price,
      })
    );
  };

  const openCart = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const notificationHandler = () =>
    toast.success("Məhsul səbətə əlavə olundu!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  return (
    <Fragment>
      <Cart open={open} handleClose={handleClose} />

      <div className={styles.modal__action__wrapper}>
        <div
          className={styles.modal__addToCart}
          onClick={() => {
            addToCartHandler();
            notificationHandler();
          }}
        >
          <img src={cart} alt="Cart icon" />
          <span>Səbətə at </span>
        </div>

        <div className={styles.modal__priceBox}>
          {onSalePrice !== null && (
            <span className={styles.modal__product__oldPrice}>{price} azn</span>
          )}

          <button
            onClick={() => {
              addToCartHandler();
              openCart();
            }}
          >
            <p className={styles.modal__product__price}>
              {onSalePrice !== null ? onSalePrice : price}
            </p>

            <p>
              <span>AZN</span>
              <br />
              <span>İndi al</span>
            </p>
          </button>

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
            style={{ borderColor: "#2CA666", color: "#000" }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductActionWrapper;
