import React from 'react';

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Café Fausse</h3>
          <p>1234 Culinary Ave, Suite 100</p>
          <p>Washington, DC 20002</p>
        </div>

        <div className="footer-section">
          <h3>Hours</h3>
          <p>Monday – Saturday: 5:00 PM – 11:00 PM</p>
          <p>Sunday: 5:00 PM – 9:00 PM</p>
        </div>

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Phone: (202) 555-4567</p>
          <p>Email: info@cafefausse.com</p>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Café Fausse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
