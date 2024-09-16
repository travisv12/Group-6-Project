import "./about.style.css";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div>
      <section className="about-section">
        <div className="about-bg">
          <div className="about-grid">
            <div className="about-image-container">
              <img
                className="about-image"
                src="/images/about.png"
                alt="About Us"
              />
            </div>
            <div className="about-text-container">
              <h1 className="about-title">About Us</h1>
              <hr className="about-divider" />
              <p className="about-description">
                At Refoodify, we are passionate about reducing food waste and
                promoting sustainability. <br />
                <br /> Our mission is simple: to help people make the most out
                of the food they already have at home while supporting the
                environment.
                <br />
                <br /> With Refoodify, you can easily type in the ingredients
                you have on hand, and we’ll instantly generate delicious,
                easy-to-make recipes to reduce food waste. In addition, users
                can share their favorite recipes with our growing community,
                spreading the joy of creative cooking. We also partner with
                local markets to offer near-expired foods at discounted prices,
                helping to prevent edible food from going to waste.
                <br /> <br />
                <strong>
                  Together, we can make a positive impact on the planet
                  <br />
                  —one meal at a time.
                </strong>
              </p>
            </div>
          </div>
          {/* <OurTeam /> */}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
