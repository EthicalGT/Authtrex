'use client';
import Image from "next/image";
import "./Navbar.css";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="homepage-header">
      <nav>
        <div className="navbar-container">
          <div className="logo">
            <Image
              src="/favicon.png"
              alt="Authrex Logo"
              width={150}
              height={50}
            />
          </div>
          <div className="hamburger-container" onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
            <li>
              <a href="#features" onClick={toggleMenu} >Product</a>
            </li>
            <li>
              <a href="#docs" onClick={toggleMenu}>Features</a>
            </li>
            <li>
              <a href="#github" onClick={toggleMenu}>Developers</a>
            </li>
            <li>
              <a href="#github" onClick={toggleMenu}>Security</a>
            </li>
            <li>
              <a href="#github" onClick={toggleMenu}>Pricing</a>
            </li>
            <li>
              <a href="#github" onClick={toggleMenu}>Docs</a>
            </li>
          </ul> 
          <div className="action-containers">
            <button className="book-a-demo-button">Book a Demo</button>
            <button className="get-started-button">Get Started</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;