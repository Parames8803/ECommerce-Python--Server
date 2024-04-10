const express = require("express");
const {
  CartController,
  getCarts,
  deleteCart,
} = require("../controllers/cartController");
const router = express.Router();

router.post("/cart", CartController);
router.post("/cart/details", getCarts);
router.post("/cart/:id", deleteCart);

module.exports = router;
