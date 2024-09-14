import { useState } from "react";
import heroImage from "@/assets/hero_bg2.png";
import "./hero.style.css";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="hero-container">
      <div className="hero-gradient">
        <section className="hero-section">
          <div className="hero-grid">
            <div className="hero-text-container">
              <h1 className="hero-title">
                Reduce Food Wastage for Sustainable Living
              </h1>
              <p className="hero-description">
                Using existing food instead of dining out significantly reduces
                food waste, lowers the carbon footprint associated, conserves
                resources by minimizing the energy and packaging waste.
              </p>

              <div className="hero-buttons">
                <a href="#" title="" className="hero-button" role="button">
                  <span>Become a member</span>
                </a>
                <a href="#" title="" className="hero-button" role="button">
                  Learn more
                </a>
              </div>
            </div>

            <img
              className={`hero-image ${isImageLoaded ? "loaded" : ""}`}
              src={heroImage}
              alt=""
              loading="lazy"
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
