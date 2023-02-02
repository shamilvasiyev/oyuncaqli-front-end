import React from "react";

import Slider from "react-slick";
import SingleBlog from "../SingleBlog/SingleBlog";
import SingleProduct from "../SingleProduct/SingleProduct";

import "./Item-Carousel.scss";

let dragging = false;
const onClickProduct = (e) => dragging && e.preventDefault();

const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  navigator: false,
  arrows: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  initialSlide: 0,
  beforeChange: () => (dragging = true),
  afterChange: () => (dragging = false),
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ItemCarousel = ({ data, type }) => {
  return (
    <div className="carousel__container">
      <Slider {...settings}>
        {data?.map((d, i) =>
          type === "products" ? (
            <SingleProduct
              key={i}
              product={d}
              onClickProduct={onClickProduct}
            />
          ) : (
            <SingleBlog key={i} data={d} onClickBlog={onClickProduct} />
          )
        )}
      </Slider>
    </div>
  );
};

export default ItemCarousel;
