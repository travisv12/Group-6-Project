import infoImage from "@/assets/info-img.jpg";
import { Button } from "@/components/ui/button";
import "./info.style.css";

const Info = () => {
  return (
    <>
      <section className="info-section lg:max-w-screen-2xl mx-auto">
        <div className="info-grid">
          <div className="info-image-container">
            <img
              className="info-image"
              src={infoImage}
              alt="Discounted Items"
            />
          </div>
          <div className="info-text-container  bg-gradient-to-r from-[#D9D9D94D] to-[#7373734D] p-5 rounded">
            <h2 className="info-title">
              BUY DISCOUNTED ITEMS AND CLAIM YOUR POINTS
            </h2>
            <p className="info-description">
              Order discounted products from collaborators in just one click.
              Earn points by reducing food wastage and use those points as you
              shop.
            </p>
            <div className="info-button-container">
              <Button size={"lg"} className="info-button">
                CLAIM YOUR POINTS
              </Button>
            </div>
          </div>
        </div>
        <div className="info-ready-section">
          <h1 className="info-ready-title">are you ready?</h1>
          <p className="info-ready-subtitle">
            SHAPE <br />
          </p>
          <p className="info-ready-subtitle">A sustainable WORLD! </p>
          <div className="info-ready-button-container">
            <button className="info-ready-button">GET STARTED</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Info;
