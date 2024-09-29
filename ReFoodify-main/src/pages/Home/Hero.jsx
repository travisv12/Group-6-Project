import { useState } from "react";
import heroImage from "@/assets/hero_bg2.png";
import "./hero.style.css";

const Hero = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  return (
    <>
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
                <button className="sustainability-button">
                  BECOME A MEMBER
                </button>
                <button className="sustainability-button">LEARN MORE</button>
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
