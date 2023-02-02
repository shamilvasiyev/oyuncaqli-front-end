import React from "react";
import { Link } from "react-router-dom";

import Slider from "react-slick";

import "./Mini-Carousel.scss";

let dragging = false;
const onClickProduct = (e) => dragging && e.preventDefault();

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  navigator: false,
  arrows: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 4,
  initialSlide: 0,
  beforeChange: () => (dragging = true),
  afterChange: () => (dragging = false),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        // infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    // {
    //   breakpoint: 480,
    //   settings: {
    //     slidesToShow: 3,
    //     slidesToScroll: 1,
    //     initialSlide: 2,
    //   },
    // },
  ],
};

const MiniCarousel = ({ data, filterType }) => {
  return (
    <Slider {...settings}>
      {data.map((d) => (
        <div className="item_wrapper" key={d.id}>
          <Link
            to={`products?${filterType}=${d.url}`}
            className="carousel_item"
            onClick={onClickProduct}
          >
            <img src={d.img} alt="Age-filter-images" />
          </Link>
        </div>
      ))}
    </Slider>
  );
};

export default MiniCarousel;
