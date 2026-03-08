import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  const featuresData = [
    {
      icon: "fa-solid fa-shield-halved",
      title: "Custom Authentication Workflows",
      description: "Design flexible authentication flows tailored to your security requirements"
    },
    {
      icon: "fa-solid fa-code",
      title: "Risk-Based & Context-Aware Access",
      description: "Adaptive security that responds to user behavior and threat signals"
    },
    {
      icon: "fa-regular fa-clock",
      title: "Headless & API-First Design",
      description: "Complete control over your authentication UI and user experience"
    },
    {
      icon: "fa-regular fa-clock",
      title: "Passwordless & Multi-Factor Authentication",
      description: "Modern authentication methods including biometrics and MFA"
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Advanced Session & Token Control",
      description: "Granular control over session management and token lifecycle"
    }, 
    {
      icon: "fa-solid fa-code",
      title: "Security Audit Logs & Events",
      description: "Comprehensive logging and monitoring for compliance and security"
    }
  ];
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
    <main>
      <div className="features-container">
        <h2 className="features-heading">Enterprise-Grade Authentication Features</h2>
        <p>Everything you need to build secure, scalable authentication systems</p>
        <div className="features-item-container">
          { featuresData.map((feature, index) => (
          <div className="feature-item" key={index}>
            <div className="feature-icon-container">
              <i className={feature.icon}></i>
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
          ))}
        </div>
      </div>
    </main>
    </>
  );
}
