import "./vision.style.css";

const Vision = () => {
  return (
    <div>
      <section className="vision-section">
        <div className="vision-bg">
          <div className="vision-grid">
            <div className="vision-image-container">
              <img
                className="vision-image"
                src="/images/vision.png"
                alt="About Us"
              />
            </div>
            <div className="vision-text-container">
              <h1 className="vision-title">Our Vision</h1>
              <hr className="vision-divider" />
              <p className="vision-description">
                At Refoodify, we envision a world where food waste is minimized,
                and every household can contribute to a more sustainable future.
                <br />
                <br />
                We strive to empower individuals to make smarter, more
                eco-friendly choices in the kitchen by turning leftover
                ingredients into culinary possibilities. <br />
                <br />
                Our goal is to create a global community that shares recipes,
                reduces food waste, and supports local markets by buying
                near-expired products.
                <br />
                <br />
                <strong>
                  Through innovation and collaboration, we aim to be a driving
                  force in the fight against food waste, ensuring a healthier
                  planet for future generations.
                </strong>
              </p>
            </div>
          </div>
          {/* <OurTeam /> */}
        </div>
      </section>
    </div>
  );
};

export default Vision;
