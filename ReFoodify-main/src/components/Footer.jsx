import './footer.style.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            {/* ReFoodify Brand */}
            <div>
              <h2 className="footer-brand">ReFoodify</h2>
            </div>

            {/* ReFoodify Links */}
            <div>
              <h2 className="footer-title">ReFoodify</h2>
              <ul className="footer-links">
                <li>
                  <p className="footer-link">Home</p>
                </li>
                <li>
                  <p className="footer-link">About</p>
                </li>
                <li>
                  <p className="footer-link">Vision</p>
                </li>
                <li>
                  <p className="footer-link">Log In</p>
                </li>
              </ul>
            </div>

            {/* Market Links */}
            <div>
              <h2 className="footer-title">Market</h2>
              <ul className="footer-links">
                <li>
                  <p className="footer-link">Buy products</p>
                </li>
                <li>
                  <p className="footer-link">Share recipes</p>
                </li>
              </ul>
            </div>

            {/* Contact Links */}
            <div>
              <h2 className="footer-title">Contact</h2>
              <ul className="footer-links">
                <li>
                  <p className="footer-link">Email</p>
                </li>
                <li>
                  <p className="footer-link">Instagram</p>
                </li>
                <li>
                  <p className="footer-link">Facebook</p>
                </li>
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h2 className="footer-title">Join our newsletter</h2>
              <form>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="footer-input"
                />
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
