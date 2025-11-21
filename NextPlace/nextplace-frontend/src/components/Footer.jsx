import React from "react";
import { FaInstagram, FaFacebook } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <h2 className="footer-logo">NextPlace</h2>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook size={24} />
            </a>
          </div>
        </div>
        <div className="footer-links">
          <a href="#">Descubre eventos</a>
          <a href="#">Organiza con nosotros</a>
          <a href="#">Ayuda</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 - NextPlace. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
