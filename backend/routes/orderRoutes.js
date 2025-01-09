const express = require("express");
const {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middleware/adminAuth");

const orderRouter = express.Router();

// Admin Routes
orderRouter.post("/list", adminAuth, allOrders); // Admin: Tüm siparişleri listele
orderRouter.post("/status", adminAuth, updateStatus); // Admin: Sipariş durumunu güncelle

// User Routes
orderRouter.post("/place", placeOrder); // Kullanıcı: Yeni sipariş oluştur
orderRouter.post("/userorders", userOrders); // Kullanıcı: Siparişlerini görüntüle

module.exports = orderRouter;
