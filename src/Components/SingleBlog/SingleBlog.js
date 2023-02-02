import React from "react";
import { Link } from "react-router-dom";

import styles from "./SingleBlog.module.scss";

const SingleBlog = ({ data, onClickBlog }) => {
  const body = data.body;

  return (
    <>
      <Link
        to={`/blogs/${data._id}`}
        className={styles.blog}
        onClick={onClickBlog}
      >
        <div className={styles.blog__imageBox}>
          <img
            src={`${process.env.REACT_APP_BASE_URL}/${data.image.imageUrl}`}
            alt={data.title}
          />
        </div>

        <div className={styles.blog__content}>
          <h3>{data.title}</h3>

          <p
            dangerouslySetInnerHTML={{ __html: body.split(" ", 10).join(" ") }}
          ></p>

          <button>Ətraflı</button>
        </div>
      </Link>
    </>
  );
};

export default SingleBlog;
