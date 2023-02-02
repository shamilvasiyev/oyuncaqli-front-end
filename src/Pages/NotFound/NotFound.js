import React from "react";

import { Link } from "react-router-dom";

import styles from "./NotFound.module.scss";

export const NotFound = () => {
  return (
    <section className={styles.notFound}>
      <h1>Məlumat tapılmadı</h1>
      <Link to="/products">Alış-verişə davam edin</Link>
    </section>
  );
};
