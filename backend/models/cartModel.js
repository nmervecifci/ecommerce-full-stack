// models/Cart.js
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  amount: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
