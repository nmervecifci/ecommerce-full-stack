import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import products from "../assets/products";
import axios from "axios";
import { toast } from "react-toastify";
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const currency = "$";
  const shippingFee = 29.99;
  const backendUrl = "http://localhost:3000";
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  // Token ile ilgili fonksiyonlar
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // Sepete ürün ekleme
  const addToCart = async (product) => {
    try {
      // Önce local state'i güncelle
      const existingItem = cart.find((item) => item.id === product.id);
      const newCart = existingItem
        ? cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...cart, { ...product, quantity: 1 }];

      setCart(newCart);

      // Sonra backend'e kaydet
      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            items: newCart,
            amount: newCart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Sepet güncelleme hatası:", error);
      toast.error("Sepet güncellenirken bir hata oluştu");
    }
  };

  // Sepetten ürün çıkarma
  const removeFromCart = async (productId) => {
    try {
      const existingItem = cart.find((item) => item.id === productId);
      const newCart =
        existingItem.quantity === 1
          ? cart.filter((item) => item.id !== productId)
          : cart.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );

      setCart(newCart);

      if (token) {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          {
            items: newCart,
            amount: newCart.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            ),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
    } catch (error) {
      console.error("Sepet güncelleme hatası:", error);
      toast.error("Sepet güncellenirken bir hata oluştu");
    }
  };

  // Giriş yapıldığında sepeti veritabanından al
  useEffect(() => {
    const fetchCart = async () => {
      if (token) {
        try {
          const response = await axios.get(`${backendUrl}/api/cart`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.items) {
            setCart(response.data.items);
          }
        } catch (error) {
          console.error("Sepet getirme hatası:", error);
        }
      }
    };

    fetchCart();
  }, [token, backendUrl]);

  // Ürünü tamamen sepetten silme
  const deleteFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Toplam tutarı hesaplama
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const value = {
    products,

    currency,
    shippingFee,

    backendUrl,
    token,
    setToken,
    login,
    logout,
    addToCart,
    removeFromCart,
    deleteFromCart,
    total,
    cart,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node,
};

export default ProductProvider;
