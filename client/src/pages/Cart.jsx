import axios from "axios";
import React, { useEffect, useState } from "react";
import AllProducts from "../assets/allProducts.json";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "sonner";
import "../styles/Cart.css";

const Cart = () => {
  const [userData, setUserData] = useState({});
  const [products, setProducts] = useState([]);
  const [render, setRender] = useState(false);

  const handleRender = () => {
    setRender((prev) => !prev);
  };

  const filterProductsByIds = (ids) => {
    return AllProducts.filter((product) => ids.includes(product.asin));
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.post(
          "http://localhost:3001/user/cart/details",
          {
            token: token,
          }
        );
        if (res.status === 200) {
          setUserData(res.data);
          const productData = filterProductsByIds(res.data.products).map(
            (product) => ({ ...product, quantity: 1 })
          );
          setProducts(productData);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    loadData();
  }, [render]);

  const handleQuantityChange = (index, action) => {
    const updatedProducts = [...products];
    if (action === "increment") {
      updatedProducts[index].quantity++;
    } else if (action === "decrement" && updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity--;
    }
    setProducts(updatedProducts);
  };

  const calculateTotalAmount = () => {
    let total = 0;
    products.forEach((product) => {
      total +=
        parseFloat(product.product_price.replace("$", "")) * product.quantity;
    });
    return total.toFixed(2);
  };

  const handleRemoveProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`http://localhost:3001/user/cart/${id}`, {
        token: token,
      });
      if (res.status === 200) {
        toast.success("Removed Product Success");
        handleRender();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile_cart_container">
      <div className="profile_card_wrapper">
        <div className="cart_container_title">
          <div className="cart_container_text">Shopping Cart</div>
        </div>
        {products.length > 0 ? (
          <div className="profile_cart_details_table">
            <table>
              <thead>
                <tr>
                  <th>Remove</th>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td>
                      <button
                        className="cart_delete_icon"
                        onClick={() => {
                          handleRemoveProduct(product.asin);
                        }}
                      >
                        <BsFillTrashFill />
                      </button>
                    </td>
                    <td>
                      <img
                        src={product.product_photo}
                        alt="product"
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td className="td_title_container">
                      {product.product_title}
                    </td>
                    <td>{product.product_price}</td>
                    <td>
                      <div className="cart_quantity_changer">
                        <div
                          className="quantity_minus"
                          onClick={() =>
                            handleQuantityChange(index, "decrement")
                          }
                        >
                          -
                        </div>
                        <div className="quantity">{product.quantity}</div>
                        <div
                          className="quantity_add"
                          onClick={() =>
                            handleQuantityChange(index, "increment")
                          }
                        >
                          +
                        </div>
                      </div>
                    </td>
                    <td>
                      $
                      {(
                        parseFloat(product.product_price.replace("$", "")) *
                        product.quantity
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" style={{ textAlign: "right" }}>
                    Total:
                  </td>
                  <td className="total_price_amount">
                    ${calculateTotalAmount()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="profile_cart_details_table">
            No Products Found in Cart
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
