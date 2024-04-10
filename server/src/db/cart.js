const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  products: [{ type: String }],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = { Cart };
