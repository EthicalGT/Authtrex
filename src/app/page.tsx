import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
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
          <ul className="nav-links">
            <li>
              <a href="#features">Product</a>
            </li>
            <li>
              <a href="#docs">Features</a>
            </li>
            <li>
              <a href="#github">Developers</a>
            </li>
            <li>
              <a href="#github">Security</a>
            </li>
            <li>
              <a href="#github">Pricing</a>
            </li>
            <li>
              <a href="#github">Docs</a>
            </li>
          </ul> 
          <div className="action-containers">
            <button className="book-a-demo-button">Book a Demo</button>
            <button className="get-started-button">Get Started</button>
          </div>
        </div>
      </nav>
    </header>
    <section className="hero-section">
      <div className="hero-content">
        <h1>Adaptive Authentication Infrastructure for Modern Applications</h1>
        <p>Design, control, and scale secure authentication workflows without locking your UI or logic.</p>
        
      </div>
      <div className="cta-buttons">
          <button className="start-free-button">Start Free</button>
          <button className="view-docs-button">View Docs</button>
        </div>
       <div className="featured-container">
        <div className="featured-item">
        <i className="fa-solid fa-shield-halved"></i>
        <span>Enterprise Grade Security</span>
        </div>
        <div className="featured-item">
        <i className="fa-solid fa-code"></i>
        <span>Developer Friendly</span>
        </div>
        <div className="featured-item">
        <i className="fa-regular fa-clock"></i>
        <span>Fast & Scalable</span>
        </div>
        </div> 
    </section>
    </>
  );
}
