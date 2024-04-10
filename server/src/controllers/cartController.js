const { Cart } = require("../db/cart");
const { verifyToken } = require("../helpers/token");

const CartController = async (req, res) => {
  try {
    const { user, id } = req.body;
    let decode = verifyToken(user);

    // Check if the user has an existing cart
    let cart = await Cart.findOne({ userId: decode.id });

    if (!cart) {
      // If the user does not have a cart, create a new one
      cart = new Cart({ userId: decode.id, products: [] });
    }

    // Check if the product ID already exists in the user's cart
    if (cart.products.includes(id)) {
      // Product already exists in the cart
      res.status(409).json({ message: "Product already exists in the cart" });
    } else {
      // Product does not exist in the cart, add it
      cart.products.push(id);
      await cart.save();

      res.status(200).json({ message: "Product added to cart", cart });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCarts = async (req, res) => {
  try {
    const { token } = req.body;
    let user = verifyToken(token);
    let cartDetails = await Cart.findOne({ userId: user.id });
    if (cartDetails) {
      res.status(200).json(cartDetails);
    } else {
      res.status(404).json({ message: "No Products Found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { token } = req.body;
    const user = verifyToken(token); // Assuming verifyToken returns a promise

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the cart details for the user
    let cartDetails = await Cart.findOne({ userId: user.id });

    if (!cartDetails) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the product to be removed
    cartDetails.products = cartDetails.products.filter(
      (product) => product !== req.params.id
    );

    // Save the updated cart
    await cartDetails.save();

    res.status(200).json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  CartController,
  getCarts,
  deleteCart,
};
