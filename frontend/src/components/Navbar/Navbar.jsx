import "./Navbar.css";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const { token, logout } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        <ul className="menu">
          <Link to="/products">Products</Link>
        </ul>
      </div>
      <div className="navbar-right">
        {token ? (
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-link">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
