import { useContext } from "react";
import "./ProductDetail.css";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, currency } = useContext(ProductContext);

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Ürün bulunamadı</div>;
  }

  // Sepete ekle ve yönlendirme fonksiyonu
  const handleAddToCart = () => {
    addToCart(product); // Önce ürünü sepete ekleyin
    navigate("/cart"); // Sonra cart sayfasına yönlendirin
  };

  return (
    <div className="productdetail-container">
      <div className="productdetail">
        <img src={product.image} alt={product.name} />
        <div className="productdetail-description">
          <p>{product.date}</p>
          <h1>{product.name}</h1>
          <h2>
            {product.price} {currency}
          </h2>
          <p>{product.description}</p>
        </div>
        <div className="productdetail-button">
          <button onClick={handleAddToCart}>Add to basket</button>{" "}
          {/* onClick'i güncelle */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
