import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { cardActions } from "../../Store";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { FiCheckCircle } from "react-icons/fi";

import styles from "./Cart.module.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(calc(30% - 54px), 500px, calc(90% - 54px))",
  bgcolor: "background.paper",
  border: "2px solid #f9632e",
  borderRadius: "15px",
  boxShadow: 24,
  outline: "none",
};

const inputs = [
  {
    id: "1",
    placeholder: "Ad Soyad",
    name: "name",
  },

  {
    id: "2",
    placeholder: "Ünvan",
    name: "address",
  },

  {
    id: "3",
    placeholder: "Telefon",
    name: "phone",
  },
];

const Cart = ({ open, handleClose }) => {
  const products = useSelector((state) => state.card.items);
  const totalPrices = products?.map((p) => p.totalPrice);
  const totalPrice = totalPrices.reduce((a, b) => a + b, 0);
  const dispatch = useDispatch();

  const [orderFinishData, setOrderFinishData] = useState(null);
  const [finisOrder, setFinishOrder] = useState(false);

  const [inputValidation, setInputValidation] = useState({
    name: false,
    address: false,
    phone: false,
    checked: false,
  });

  const [orderDetails, setOrderDetails] = useState({
    products: [],
    totalPrice: 0,
    name: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    setOrderDetails((prev) => {
      return { ...prev, totalPrice, products };
    });
  }, [products, totalPrice]);

  const orderDataHandler = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setOrderDetails((prev) => {
      return { ...prev, [inputName]: inputValue };
    });

    if (
      orderDetails.name !== "" &&
      orderDetails.address !== "" &&
      orderDetails.phone !== ""
    ) {
      setInputValidation((prev) => {
        return { ...prev, name: true, address: true, phone: true };
      });
    }
  };

  const submitButtonValidation =
    orderDetails.products.length > 0 &&
    inputValidation.checked &&
    inputValidation.name &&
    inputValidation.address &&
    inputValidation.phone;

  const orderSubmitHadler = useCallback(async () => {
    let requestData;
    requestData = orderDetails;

    try {
      const response = await fetch(process.env.REACT_APP_POST_ORDER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();
      setOrderFinishData(data);
      setFinishOrder(true);
    } catch (error) {
      console.log(error);
    }
  }, [orderDetails]);

  const closeFinisOrderHandler = () =>
    setTimeout(() => {
      setFinishOrder(false);
      setOrderFinishData(null);
    }, 1000);

  const addToCartHandler = (e) => {
    const currentId = e.currentTarget.id;
    const currentProduct = products.find((p) => p.id === currentId);

    const { id, image, title, price, onSalePrice } = currentProduct;

    dispatch(
      cardActions.addItemToCard({
        id,
        image,
        title,
        price: onSalePrice ? onSalePrice : price,
      })
    );
  };

  const removeCartProductHandler = (e) => {
    dispatch(cardActions.removeItemFromCard(e.currentTarget.id));
  };

  let content =
    orderFinishData !== null ? (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <h3>Ödəmə təsdiqləndi</h3>
        </div>

        <div className={styles.cart__line} />

        <div className={styles.cart__finishOrderContent}>
          <div className={styles.cart__finishOrderContent__iconWrapper}>
            <FiCheckCircle />
          </div>

          <p>
            <span>{orderFinishData?.message}</span>
            Sifarişiniz təsdiq olunması üçün <span>10 dəqiqə</span> ərzində
            sizinlə əlaqə saxlanılacaq.
          </p>
        </div>

        <div className={styles.cart__line} />

        <div className={styles.cart__finishOrderContent__footer}>
          <p>
            Cəmi <span>{orderFinishData?.totalPrice} Azn</span>
          </p>

          <p>
            Çatdırılma <span>Pulsuz</span>
          </p>
        </div>
      </div>
    ) : (
      <div className={styles.cart}>
        <div className={styles.cart__header}>
          <h3>Ödəmə paneli</h3>
        </div>

        <div className={styles.cart__line} />

        {products.length > 0 ? (
          products?.map((p) => (
            <Fragment key={p.id}>
              <div className={styles.cart__product}>
                <div className={styles.cart__product__imageBox}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${p.image.imageUrl}`}
                    alt={p.title}
                  />

                  <span className={styles.cart__product__quantity}>
                    {p.quantity}
                  </span>
                </div>

                <div className={styles.cart__product__content}>
                  <h5>{p.title}</h5>

                  <div className={styles.cart__product__info}>
                    <span>Qiymət</span>

                    <span>{p.totalPrice} AZN</span>
                  </div>

                  <div className={styles.cart__product__info}>
                    <span>Çatdırılma</span>

                    <span>Pulsuz</span>
                  </div>

                  <div className={styles.cart__action__buttons}>
                    <button id={p.id} onClick={removeCartProductHandler}>
                      -
                    </button>
                    <button id={p.id} onClick={addToCartHandler}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className={styles.cart__line} />
            </Fragment>
          ))
        ) : (
          <div className={styles.cart__empty}>
            <h2>Səbətdə məhsul yoxdur</h2>

            <Link to="/products" onClick={handleClose}>
              Məhsul sifariş etmək üçün
            </Link>
          </div>
        )}

        <div className={styles.cart__rulesWrapper}>
          <p>50% öncədən karta ödənilməlidir ki, sifariş qeydə alınsın</p>

          <div className={styles.cart__rulesWrapper__checkbox}>
            <input type="checkbox" checked={inputValidation.checked} readOnly />

            <span
              className={styles.checkmark}
              onClick={() =>
                setInputValidation((prev) => {
                  return { ...prev, checked: !prev.checked };
                })
              }
            />
          </div>
        </div>

        <div className={styles.cart__formWrapper}>
          <h3>Çatdırılma ünvanını yaz</h3>

          <div className={styles.cart__form__inputs}>
            {inputs.map((input) => (
              <input
                key={input.id}
                type="text"
                placeholder={input.placeholder}
                name={input.name}
                onChange={orderDataHandler}
              />
            ))}

            <button
              type="button"
              disabled={!submitButtonValidation}
              onClick={orderSubmitHadler}
            >
              Sifariş et
            </button>
          </div>
        </div>
      </div>
    );

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={orderFinishData !== null ? finisOrder : open}
      onClose={orderFinishData !== null ? closeFinisOrderHandler : handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={orderFinishData !== null ? finisOrder : open}>
        <Box sx={style}>{content}</Box>
      </Fade>
    </Modal>
  );
};

export default Cart;
