import React from "react";

import styles from "./OrderProductSection.module.scss";

import cover_image from "../../Static-images/cover-main.png";
import logoGreen from "../../Static-images/logo-green.svg";

const OrderProductSection = () => {
  return (
    <section className={styles.order_section}>
      <img src={cover_image} alt="" />

      <div className="container">
        <div className={styles.order_product_content}>
          <h1>
            Oyuncaqsız
            <br /> uşaq qalmasın
          </h1>

          <p>
            Dünyada yeganə məsum və sevgiylə dolu olan varlığımız, uşaqlarımız
            üçün bu brendi ərsəyə gətirdik.
          </p>

          <button>Sifariş et</button>

          <div className={styles.logo_green_box}>
            <img src={logoGreen} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderProductSection;
