import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import { RiTShirt2Line } from "react-icons/ri";
import { GiAmpleDress, GiLargeDress } from "react-icons/gi";
import { PiDress, PiPantsFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import AllProducts from "../assets/allProducts.json";

const Home = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      const res = AllProducts;
      setProducts(res.slice(1, 31));
    };
    loadData();
  }, []);

  return (
    <>
      <div className="topBrands">
        <p>Home . Products</p>
        <h1>All Product</h1>
      </div>
      <div className="categories">
        <h1 className="title">Product Categories</h1>
        <div className="category">
          <div className="card1">
            <p>
              <GiAmpleDress />
            </p>
            <Link to="bridal">Bridal Wears</Link>
          </div>
          <div className="card2">
            <p>
              <GiLargeDress />
            </p>
            <Link to="frocks">Frocks</Link>
          </div>
          <div className="card3">
            <p>
              <PiPantsFill />
            </p>
            <Link to="sports">Sports Wear</Link>
          </div>
          <div className="card4">
            <p>
              <PiDress />
            </p>
            <Link to="women_clothes">Women's Clothing</Link>
          </div>
          <div className="card5">
            <p>
              <RiTShirt2Line />
            </p>
            <Link to="men_clothes">Men's Products</Link>
          </div>
        </div>
      </div>
      <div className="products">
        {products.map((item, index) => (
          <div className="product_container" key={index}>
            <Link
              to={`/product_details/${item.asin}`}
              className="product_details_wrapper"
            >
              <img
                src={item.product_photo}
                alt="productImg"
                className="productImage"
              />
              {/* <div class="product_title_container"> */}
              <p class="product_title">{item.product_title}</p>
              {/* </div> */}
              <h3 className="product_price">
                {item.product_original_price || item.product_price}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
