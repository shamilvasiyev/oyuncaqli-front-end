import React from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Wrapper from "./Components/ScrollToTop/ScrollToTop";

import { Provider } from "react-redux";
import store from "./Store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <Wrapper>
      <Provider store={store}>
        <App />
      </Provider>
    </Wrapper>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
