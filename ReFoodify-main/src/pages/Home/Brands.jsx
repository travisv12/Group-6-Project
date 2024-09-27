import "./brands.style.css";

const logos = [
  { src: "/images/kMarket.png", alt: "Google" },
  { src: "/images/prisma.png", alt: "Facebook" },
  { src: "/images/sMarket.png", alt: "Airbnb" },
  { src: "/images/lidl.png", alt: "Figma" },
];

const Brands = () => {
  return (
    <>
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
    <div className="collaboration-container">
      <div className="collaboration-text flex justify-center mb-6">
        <h2 className="text-2xl font-bold">TRUSTED BY TOP BRANDS</h2>
      </div>
      <div className="collaboration-box">
        <div className="collaboration-images grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="brand-logo-container flex justify-center items-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="brand-logo max-w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default Brands;
