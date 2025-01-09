import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import "./Card.css";

const Card = () => {
  const { products, currency } = useContext(ProductContext);

  return (
    <div className="cards-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <Link to={`/product/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <div className="card-description">
            <p>{product.date}</p>
            <h1>{product.name}</h1>
            <h2>
              {product.price} {currency}
            </h2>
          </div>
          <div className="card-button">
            <Link to={`/product/${product.id}`}>
              <button>Show Details</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
