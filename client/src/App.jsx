import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Loader from "./components/Loader";
import WomenClothes from "./pages/WomenClothes";
import MenClothes from "./pages/MenClothes";
import ProductDetails from "./pages/ProductDetails";
import Bridal from "./pages/Bridal";
import Frocks from "./pages/Frocks";
import Sports from "./pages/Sports";
import Auth from "./pages/Auth";
import { Toaster } from "sonner";
import Cart from "./pages/Cart";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Toaster richColors />
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="auth" element={<Auth />} />
              <Route path="women_clothes" element={<WomenClothes />} />
              <Route path="men_clothes" element={<MenClothes />} />
              <Route path="bridal" element={<Bridal />} />
              <Route path="frocks" element={<Frocks />} />
              <Route path="sports" element={<Sports />} />
              <Route path="product_details/:id" element={<ProductDetails />} />
              <Route path="carts" element={<Cart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
