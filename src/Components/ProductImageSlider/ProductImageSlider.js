import React from "react";

import Slider from "react-slick";

import "./ProductImageSlider.scss";

const ProductImageSlider = ({ product }) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${product.images[i].imageUrl}`}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </a>
      );
    },
    dots: true,
    arrows: false,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="productSliderWrapper">
      <Slider {...settings}>
        {product?.images?.map((photo, i) => (
          <div key={i} className="product__active__image">
            <img
              src={`${process.env.REACT_APP_BASE_URL}/${photo.imageUrl}`}
              alt={product.title}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageSlider;
