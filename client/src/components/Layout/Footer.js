import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark text-light p-3" id="footer">
      <h3 className="text-center">All Right Reserved &copy; Vikas Bishnoi</h3>
      <p className="text-center mt-3">
        <Link to="/about" className="footerLink">
          About
        </Link>
        |
        <Link to="/contact" className="footerLink">
          Contact
        </Link>
        |
        <Link to="/policy" className="footerLink">
          PrivacyPolicy
        </Link>
      </p>
    </div>
  );
};

export default Footer;
