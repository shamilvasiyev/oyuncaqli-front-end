import React, { useState, useCallback, useEffect } from "react";

import { useParams } from "react-router-dom";
import ProductActionWrapper from "../../Components/Product-action-wrapper/ProductActionWrapper";
import ProductImageSlider from "../../Components/ProductImageSlider/ProductImageSlider";

import { TbTruckDelivery } from "react-icons/tb";

import styles from "./SingleProductPage.module.scss";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const { pId } = useParams();

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PRODUCTS_REQUEST}/${pId}`
      );
      const data = await response.json();

      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  }, [pId]);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  return (
    <section>
      <div className="container">
        <div className={styles.product__wrapper}>
          <div className={styles.product__content__wrapper}>
            <div className={styles.product__photo__wrapper}>
              <ProductImageSlider product={product} />
            </div>

            <div className={styles.product__info}>
              <div className={styles.product__info__text}>
                <h1>{product.title}</h1>

                <p>{product.description}</p>
              </div>

              <ProductActionWrapper
                id={product?._id}
                image={product && product.images && product.images[0]}
                title={product?.title}
                price={product?.price}
                onSalePrice={product?.onSalePrice}
              />
            </div>
          </div>

          <div className={styles.product__delivary__terms}>
            <div className={styles.product__delivary__terms__header}>
              <h2>
                <p>Çatdırılma və şərtlər</p>
                <span>
                  <TbTruckDelivery />
                </span>
              </h2>
            </div>

            <ul>
              <li>
                <span />
                Pulsuz çatdırılma Bakı şəhər daxili
              </li>
              <li>
                <span />
                Şəhər ətrafı,rayonlara poçtla çatdırılma
              </li>
              <li>
                <span />
                Sifariş vaxtı 50% məbləğ ödənilməsi
              </li>
              <li>
                <span />
                Pulun geri qalan 50%-i məhsul çatdıran kuryerə ödənilir
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
