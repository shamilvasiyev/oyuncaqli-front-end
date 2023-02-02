import React from "react";
import { BeatLoader } from "react-spinners";

import styles from "./MainSpinner.module.scss";

const MainSpinner = () => {
  return (
    <div className={styles.spinner__wrapper}>
      <BeatLoader color="#2ca666" size={20} margin={10} />
    </div>
  );
};

export default MainSpinner;
