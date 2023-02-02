import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./SingleBlogPage.module.scss";

const SingleBlogPage = () => {
  const [blog, setBlog] = useState({});
  const { bId } = useParams();

  const fetchBlogsHandler = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BLOGS_REQUEST}/${bId}`
      );
      const data = await response.json();

      setBlog(data);
    } catch (error) {
      console.log(error);
    }
  }, [bId]);

  useEffect(() => {
    fetchBlogsHandler();
  }, [fetchBlogsHandler]);

  console.log(blog);

  return (
    <section className="section_wrapper">
      <div className="container">
        <div className={styles.content__wrapper}>
          <div className={styles.blog__header}>
            <h1>{blog.title}</h1>
          </div>

          <div
            className={styles.blog__body}
            dangerouslySetInnerHTML={{ __html: blog.body }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlogPage;
