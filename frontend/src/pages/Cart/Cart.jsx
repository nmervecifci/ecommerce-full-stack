import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, addToCart, deleteFromCart, total } =
    useContext(ProductContext);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <svg
          className="cart-icon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <h2>Sepetim</h2>
      </div>

      {cart.length === 0 ? (
        <p className="empty-cart">Sepetiniz boş</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h3>{item.name}</h3>
                  <p className="item-price">{item.price} TL</p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => addToCart(item)}
                    >
                      +
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deleteFromCart(item.id)}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
              <p className="item-total">{item.price * item.quantity} TL</p>
            </div>
          ))}
          <div className="cart-total">
            <div className="total-row">
              <h3>Toplam:</h3>
              <p>{total} TL</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
