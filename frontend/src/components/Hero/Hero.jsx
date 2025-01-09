import hero from "../../assets/hero.jpg";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Hero Left Side */}
      <div className="hero-left">
        <div className="hero-text">
          <div className="bestsellers-label">
            <div className="line"></div>
            <p className="label-text">OUR BESTSELLERS</p>
          </div>
          <h1 className="hero-heading">Latest Arrivals</h1>
          <div className="shop-now">
            <p className="shop-text">SHOP NOW</p>
            <div className="shop-line"></div>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <img className="hero-image" src={hero} alt="" />
    </div>
  );
};

export default Hero;
