import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <>
    <Navbar /> 
    
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
