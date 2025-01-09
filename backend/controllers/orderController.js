const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");

// Admin: Tüm siparişleri listele
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin: Sipariş durumunu güncelle
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Sipariş durumu güncellendi" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Kullanıcı: Yeni sipariş oluştur
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      address,
      amount,
      status: "Onay Bekliyor",
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Sipariş oluşturulduktan sonra sepeti temizle
    await userModel.findByIdAndUpdate(userId, { cart: [] });

    res.json({ success: true, message: "Sipariş oluşturuldu" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Kullanıcı: Siparişleri görüntüle
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
};
