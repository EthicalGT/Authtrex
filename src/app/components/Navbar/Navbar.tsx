'use client';
import Image from "next/image";
import "./Navbar.css";
import { useState } from "react";
import Link from "next/link";

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
              <Link href="../components/QuickAuth/" onClick={toggleMenu}>
                Product
              </Link>
            </li>
            <li>
              <Link href="#docs" onClick={toggleMenu}>
                Features
              </Link>
            </li>
            <li>
              <Link href="#github" onClick={toggleMenu}>
                Developers
              </Link>
            </li>
            <li>
              <Link href="#github" onClick={toggleMenu}>
                Security
              </Link>
            </li>
            <li>
              <Link href="#github" onClick={toggleMenu}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="#github" onClick={toggleMenu}>
                Docs
              </Link>
            </li>
          </ul> 
          <div className="action-containers">
            <button className="login-button">Sign In</button>
            <button className="get-started-button">Get Started</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;