import { useState } from "react";
import heroImage from "@/assets/hero_bg2.png";
import { Link } from "react-router-dom";
import "./hero.style.css";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
      <div className="hero-container">
        <div className="hero-gradient">
          <section className="hero-section">
            <div className="hero-grid">
              <div className="hero-text-container">
                <h1 className="hero-title">
                  Reduce Food Wastage for Sustainable Living
                </h1>
                <p className="hero-description">
                  Using existing food instead of dining out significantly
                  reduces food waste, lowers the carbon footprint associated,
                  conserves resources by minimizing the energy and packaging
                  waste.
                </p>

                <div className="hero-buttons">
                  <Link
                    to="/register"
                    title=""
                    className="hero-button"
                    role="button"
                  >
                    <span>Become a member</span>
                  </Link>
                  <Link
                    to="/about"
                    title=""
                    className="hero-button"
                    role="button"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
              <div className="hero-image-container">
                <img
                  className={`hero-image ${isImageLoaded ? "loaded" : ""}`}
                  src={heroImage}
                  alt=""
                  loading="lazy"
                  onLoad={() => setIsImageLoaded(true)}
                />
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="sustainability-wrapper">
        {" "}
        <div className="sustainability-box">
          <div className="sustainability-content">
            <div className="sustainability-header">
              <h2>REDUCE FOOD WASTAGE FOR SUSTAINABLE LIVING</h2>
            </div>
            <div className="sustainability-body">
              <div className="sustainability-text">
                <p>
                  Using existing food instead of dining out significantly
                  reduces food waste, lowers the carbon footprint associated,
                  conserves resources by minimizing the energy and packaging
                  waste.{" "}
                </p>
              </div>
              <div className="sustainability-future">
                <Link
                  to="/register"
                  title=""
                  className="sustainability-button"
                  role="button"
                >
                  <span>Become a member</span>
                </Link>
                <Link
                  to="/about"
                  title=""
                  className="sustainability-button"
                  role="button"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
          <div className="sustainability-image">
            <img src={heroImage} alt="Sustainability" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
