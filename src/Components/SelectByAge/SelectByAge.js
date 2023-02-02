import React from "react";

import MiniCarousel from "../Mini-Carousel/Mini-Carousel";

import styles from "./SelectByAge.module.scss";

import yas1 from "../../Age-filter-images/0-2-yas.svg";
import yas2 from "../../Age-filter-images/2-4-yas.svg";
import yas3 from "../../Age-filter-images/4-6-yas.svg";
import yas4 from "../../Age-filter-images/5-12-yas.svg";
import yas5 from "../../Age-filter-images/12-yas.svg";
import yas6 from "../../Age-filter-images/her-kes.svg";

const ageFilterİmages = [
  { id: "1", img: yas1, url: "1-2" },
  { id: "2", img: yas2, url: "2-4" },
  { id: "3", img: yas3, url: "4-6" },
  { id: "4", img: yas4, url: "5-10" },
  { id: "5", img: yas5, url: "12" },
  { id: "6", img: yas6, url: "everybody" },
];

const SelectByAge = () => {
  return (
    <section className="section_wrapper">
      <div className="container">
        <div className={styles.content_wrapper}>
          <h2 className="section_header">Yaşa uyğun seçim</h2>

          <MiniCarousel data={ageFilterİmages} filterType="age" />
        </div>
      </div>
    </section>
  );
};

export default SelectByAge;
