import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ProductDetails.css";
import AllProducts from "../assets/allProducts.json";
import Loader from "../components/Loader";
import { IoIosBackspace, IoIosCheckmark } from "react-icons/io";
import { FaCartArrowDown, FaStar } from "react-icons/fa6";
import Axios from "axios";
import { toast } from "sonner";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const [showLoader, setShowLoader] = useState(true);
  const navigate = useNavigate();

  const handleAddCart = async (id) => {
    try {
      let user = localStorage.getItem("token");
      if (user !== null) {
        let res = await Axios.post("http://localhost:3001/user/cart", {
          user,
          id,
        });
        if (res.status === 200) {
          toast.success("Successfully product added to cart");
        }
      } else {
        toast.warning("Please Login to Add Products to cart");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const res = AllProducts;
      const result = res;
      const data = result.find((item) => item.asin === id);
      setProduct(data);
    };
    loadData();
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <>
      {showLoader ? (
        <Loader />
      ) : (
        <div className="productDetails">
          <div className="back_btn_container">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="back_btn"
            >
              <IoIosBackspace />
              Back
            </button>
          </div>
          {product ? (
            <div className="container">
              <img src={product.product_photo} alt="productImg" />
              <div className="details">
                <h3 className="product_title_details">
                  {product.product_title}
                </h3>
                <div className="product_stocks">
                  <p className="Stocks_title">No of Stocks :</p>
                  <p>
                    {" "}
                    {product.unit_count ? product.unit_count : "Stocks Sold"}
                  </p>
                </div>
                <div className="product_price_container">
                  <div className="product_org_price">
                    {product.product_original_price}
                  </div>
                  <div className="product_discount_price">
                    {product.product_minimum_offer_price}
                  </div>
                  {product.is_prime && (
                    <div className="prime_tag">
                      <IoIosCheckmark className="prime_tag_icon" />
                      <p className="prime_tag_text">prime</p>
                    </div>
                  )}
                </div>
                <div className="product_rating">
                  <div className="product_rating_title">Ratings</div>
                  <div className="product_rating_container">
                    {product.product_star_rating}
                    <FaStar className="rating_icon" />
                  </div>
                </div>
                <p className="product_delivery_text">{product.delivery}</p>
                <div
                  className="add_to_cart_container"
                  onClick={() => {
                    handleAddCart(product.asin);
                  }}
                >
                  <FaCartArrowDown />
                  <div className="add_to_cart_text">Add Cart</div>
                </div>
              </div>
            </div>
          ) : (
            <>Requested Product has not Found</>
          )}
        </div>
      )}
    </>
  );
};

export default ProductDetails;
