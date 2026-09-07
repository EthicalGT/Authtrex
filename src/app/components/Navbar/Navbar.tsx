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
            <Link href="/">
              <Image
                src="/favicon.png"
                alt="Authrex Logo"
                width={150}
                height={50}
              />
            </Link>
          </div>
          <div className={`hamburger-container ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          <ul className={isMenuOpen ? "nav-links active" : "nav-links"}>
            <li>
              <Link href="/components/QuickAuth" onClick={toggleMenu}>
                Product
              </Link>
            </li>
            <li>
              <Link href="/pricing" onClick={toggleMenu}>
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/#developers-docs" onClick={toggleMenu}>
                Developers
              </Link>
            </li>
            <li>
              <Link href="/security" onClick={toggleMenu}>
                Security
              </Link>
            </li>
            <li>
              <Link href="/docs" onClick={toggleMenu}>
                Docs
              </Link>
            </li>
            <div className="mobile-action-containers">
              <Link href="/sign-in"><button className="login-button">Sign In</button></Link>
              <Link href="/sign-up"><button className="get-started-button">Get Started</button></Link>
            </div>
          </ul>
          <div className="action-containers desktop-actions">
            <Link href="/sign-in"><button className="login-button">Sign In</button></Link>
            <Link href="/sign-up"><button className="get-started-button">Get Started</button></Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;