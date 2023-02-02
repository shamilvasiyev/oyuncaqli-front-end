import React, { useState, useEffect, useCallback } from "react";
import ItemCarousel from "../Item-Carousel/Item-Carousel";

import styles from "./BestSellers.module.scss";

const BestSellers = () => {
  const [products, setProducts] = useState([]);

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_BESTSELLERS_ENDPOINT}`
      );
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchProductsHandler();
  }, [fetchProductsHandler]);

  return (
    <section className="section_wrapper" style={{ backgroundColor: "#F4F4F4" }}>
      <div className="container">
        <div className={styles.content_wrapper}>
          <h2 className="section_header">Çox satılanlar</h2>

          <ItemCarousel data={products} type="products" />
        </div>
      </div>
    </section>
  );
};

export default BestSellers;

//
