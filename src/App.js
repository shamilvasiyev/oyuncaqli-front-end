import { Route, Routes } from "react-router-dom";

import BestSellers from "./Components/BestSellers/BestSellers";
import Nav from "./Components/Navigation/Nav";
import OrderProductSection from "./Components/OrderProductSection/OrderProductSection";
import SelectByAge from "./Components/SelectByAge/SelectByAge";
import Footer from "./Components/Footer/Footer";
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage";
import ProductsPage from "./Pages/ProductsPage/ProductsPage";
import ToysCompanies from "./Components/ToysCompanies/ToysCompanies";
import BlogSlider from "./Components/BlogSlider/BlogSlider";
import { NotFound } from "./Pages/NotFound/NotFound";
import SingleBlogPage from "./Pages/SingleBlogPage/SingleBlogPage";

function App() {
  return (
    <div className="App">
      <Nav />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <OrderProductSection />
              <SelectByAge />
              <BestSellers />
              <ToysCompanies />
              <BlogSlider />
            </>
          }
        />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/products?:filter" element={<ProductsPage />} />

        <Route path="/:category/:pId" element={<SingleProductPage />} />

        <Route path="/blogs/:bId" element={<SingleBlogPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
