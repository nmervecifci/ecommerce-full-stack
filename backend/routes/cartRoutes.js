const express = require("express");
const router = express.Router();
const Cart = require("../models/cartModel");
const authMiddleware = require("../middleware/authMiddleware");

// Sepeti getirme endpoint'i
router.get("/cart", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    res.json(cart || { items: [], amount: 0 });
  } catch (error) {
    res.status(500).json({ message: "Sepet getirilemedi" });
  }
});

// Sepeti güncelleme endpoint'i
router.post("/cart/update", authMiddleware, async (req, res) => {
  try {
    const { items, amount } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId: req.user.id },
      { items, amount },
      { upsert: true, new: true }
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Sepet güncellenemedi" });
  }
});

module.exports = router;
