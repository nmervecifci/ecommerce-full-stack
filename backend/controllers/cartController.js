const userModel = require("../models/userModel");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, name, price, image } = req.body;
    const user = await userModel.findById(userId);

    if (!user.cart) {
      user.cart = [];
    }

    const existingProduct = user.cart.find(
      (item) => item.productId === productId
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      user.cart.push({
        productId,
        name,
        price,
        image,
        quantity: 1,
      });
    }

    await user.save();
    res.status(200).json({
      success: true,
      message: "Ürün sepete eklendi",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Ürün sepete eklenirken hata oluştu",
    });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    res.status(200).json({
      success: true,
      cart: user.cart || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Sepet bilgileri alınamadı",
    });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const user = await userModel.findById(userId);

    if (!user.cart) {
      user.cart = [];
    }

    const productIndex = user.cart.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex > -1) {
      if (quantity === 0) {
        user.cart.splice(productIndex, 1);
      } else {
        user.cart[productIndex].quantity = quantity;
      }
    }

    await user.save(); // Veritabanına kayıt işlemi
    res.status(200).json({
      // HTTP yanıtı
      success: true,
      message: "Sepet güncellendi",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Sepet güncellenirken hata oluştu",
    });
  }
};

module.exports = {
  addToCart,
  getUserCart,
  updateCart,
};
