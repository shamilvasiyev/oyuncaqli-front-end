import React from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import styles from "./ProductModal.module.scss";
import ProductActionWrapper from "../Product-action-wrapper/ProductActionWrapper";
import ProductImageSlider from "../ProductImageSlider/ProductImageSlider";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "clamp(calc(50%-52px), 700px, calc(70%-52px))",
  bgcolor: "background.paper",
  border: "1px solid #f9632e",
  borderRadius: "15px",
  padding: "50px",
  boxShadow: 24,
};

const ProductModal = ({ product, open, handleClose }) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <div className={styles.modal}>
            <div className={styles.modal__imageBox}>
              <ProductImageSlider product={product} />
            </div>

            <div className={styles.modal__contentBox}>
              <div className={styles.modal__contentBox__text}>
                <h3>{product?.title}</h3>
                <p className={styles.modal__contentBox__desc}>
                  {product?.description}
                </p>
              </div>

              <ProductActionWrapper
                id={product?._id}
                image={product && product.images && product.images[0]}
                title={product?.title}
                price={product?.price}
              />
            </div>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ProductModal;
