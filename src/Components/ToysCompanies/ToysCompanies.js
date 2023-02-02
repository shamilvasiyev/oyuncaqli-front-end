import React from "react";

import img1 from "../../Companies/lego.jpg";
import img2 from "../../Companies/barbie.jpg";
import img3 from "../../Companies/blx.jpg";
import img4 from "../../Companies/crafy.jpg";
import img5 from "../../Companies/lego2.jpg";
import img from "../../Companies/dollzn.jpg";
import img6 from "../../Companies/fisher.jpg";
import img7 from "../../Companies/hot.jpg";
import img8 from "../../Companies/lol.jpg";
import img9 from "../../Companies/playdo.jpg";

import styles from "./ToysCompanies.module.scss";
import MiniCarousel from "../Mini-Carousel/Mini-Carousel";

const ToysCompanies = () => {
  const data = [
    { id: "1", img: img1, url: "lego" },
    { id: "2", img: img2, url: "barbie" },
    { id: "3", img: img3, url: "blx" },
    { id: "4", img: img4, url: "crafy" },
    { id: "5", img: img5, url: "lego-duplo" },
    { id: "6", img: img6, url: "fisher-price" },
    { id: "7", img: img7, url: "hot-wheels" },
    { id: "8", img: img8, url: "lol" },
    { id: "9", img: img9, url: "play-doh" },
  ];

  return (
    <section>
      <div className="container">
        <div className="section_wrapper">
          <h2 className="section_header">Populyar markalar</h2>

          <MiniCarousel data={data} filterType="brand" />
        </div>
      </div>
    </section>
  );
};

export default ToysCompanies;
