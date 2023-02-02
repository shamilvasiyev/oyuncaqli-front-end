import React, { useCallback, useEffect, useState } from "react";
import ItemCarousel from "../Item-Carousel/Item-Carousel";

const BlogSlider = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchProductsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${process.env.REACT_APP_BLOGS_ENDPOINT}`
      );
      const data = await response.json();

      setBlogs(data);
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
        <div>
          <h2 className="section_header">Oyuncaqlı blog</h2>

          <ItemCarousel data={blogs} type="blogs" />
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
