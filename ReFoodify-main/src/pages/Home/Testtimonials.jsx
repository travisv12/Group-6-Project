import { useState } from "react";
import { testtimonialsData } from "../../data/testimonials";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import QuoteImg from "@/assets/quote-img.png";
import './testtimonials.style.css'; // Import the new CSS file

const Testtimonials = () => {
  const [client, setClient] = useState(testtimonialsData[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="testimonials-container">
      <p className="testimonials-title">Testimonials</p>
      <h2 className="testimonials-heading">What our Clients Say</h2>
      <p className="testimonials-description">See what our satisfied customers have to say about ReFoodify</p>
      <div className="testimonials-content">
        <div className="quote-section">
          <img src={QuoteImg} alt="quote icon" className="quote-icon" />
          <p className="client-text">{client.text}</p>
          <p className="client-info">
            <span className="client-name">{client.name}</span> {client.title}
          </p>
        </div>
        <div className="client-images">
          {testtimonialsData.map((client, index) => (
            <div
              className={`client-image ${index === activeIndex ? 'active' : 'inactive'}`}
              key={index}
              onClick={() => {
                handleClick(index);
                setClient(client);
              }}
            >
              {!client.img ? (
                <Skeleton height={120} width={180} />
              ) : (
                <img
                  src={client.img}
                  alt={client.name}
                  className="client-img"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testtimonials;
