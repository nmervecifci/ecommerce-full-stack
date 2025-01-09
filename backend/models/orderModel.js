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
  address: {
    street: String,
    city: String,
    country: String,
    zipCode: String,
  },
  status: {
    type: String,
    required: true,
    default: "Active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const cartModel = mongoose.models.cart || mongoose.model("cart", cartSchema);

module.exports = cartModel;
