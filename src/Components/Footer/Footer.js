import React from "react";
import { Link } from "react-router-dom";

import { BsTelephone, BsInstagram } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";

import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className={styles.footer_container}>
          <div className={styles.footer__leftSide}>
            <h4>Haqqımızda</h4>

            <div className={styles.footer__aboutUs}>
              <p>
                Dünyada yeganə məsum və sevgiylə dolu olan varlığımız
                uşaqlarımız üçün bu brendi ərsəyə gətirdik.
              </p>

              <p>
                Brendin məqsədi və missiyası ondan ibarətdir ki, göstərdiyimiz
                qayğı və sevgini daha da artırıb, onlara bu həyatı daha gözəl
                yöndən göstərək.
              </p>

              <p>
                Dəstəyiniz və qatdığınız hər müsbət duyğuya görə minnətdarıq!
              </p>
            </div>

            <div className={styles.footer__social__media__wrapper}>
              <div className={styles.footer__social__media__box}>
                <div className={styles.footer__social__media__icon}>
                  <BsInstagram />
                </div>

                <p>oyuncaqli</p>
              </div>

              <div className={styles.footer__social__media__box}>
                <div className={styles.footer__social__media__icon}>
                  <TfiEmail />
                </div>

                <p>oyuncaqli@gmail.com</p>
              </div>

              <div className={styles.footer__social__media__box}>
                <div className={styles.footer__social__media__icon}>
                  <BsTelephone />
                </div>

                <p>070 990 40 90</p>
              </div>
            </div>
          </div>

          <div className={styles.footer__rightSide}>
            <div className={styles.categories__wrapper}>
              <h4 className="footer__header">Kateqoriyalar</h4>

              <div className={styles.categories}>
                <Link to="/products?category=oğlan">Oğlan</Link>
                <Link to="/products?category=qız">Qız</Link>
                <Link to="/products?category=zəka">Zəka</Link>
                <Link to="/products?category=musiqi">Musiqi</Link>
                <Link to="/products?category=nəqliyyat">Nəqliyyat</Link>
                <Link to="/products?category=digər">Digər</Link>
              </div>
            </div>

            <div className={styles.categories__wrapper}>
              <h4 className="footer__header">Yaşa uyğun seçim</h4>

              <div className={styles.categories}>
                <Link to="/products?age=0-2">0-2 yaş</Link>
                <Link to="/products?age=2-4">2-4 yaş</Link>
                <Link to="/products?age=4-6">4-6 yaş</Link>
                <Link to="/products?age=5-10">5-10 yaş</Link>
                <Link to="/products?age=12">12+ yaş</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
