
import './brands.style.css';

const logos = [
  { src: "/images/kMarket.png", alt: "Google" },
  { src: "/images/prisma.png", alt: "Facebook" },
  { src: "/images/sMarket.png", alt: "Airbnb" },
  { src: "/images/lidl.png", alt: "Figma" },
];

const Brands = () => {
  return (
    <div className="brands-container">
      <div className="brands-section">
        <div className="brands-content">
          <h2 className="brands-title">
            Trusted by Top Brands
          </h2>

          <div className="brands-grid">
            {logos.map((logo, index) => (
              <div key={index} className="brand-logo-container">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="brand-logo"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
