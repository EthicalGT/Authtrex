import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar/Navbar";
import Link from "next/link";

export default function Home() {

  const featuresData = [
    {
      icon: "fa-solid fa-code-branch",
      title: "Custom Authentication Workflows",
      description: "Design flexible authentication flows tailored to your security requirements"
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Risk-Based & Context-Aware Access",
      description: "Adaptive security that responds to user behavior and threat signals"
    },
    {
      icon: "fa-solid fa-code",
      title: "Headless & API-First Design",
      description: "Complete control over your authentication UI and user experience"
    },
    {
      icon: "fa-solid fa-fingerprint",
      title: "Passwordless & Multi-Factor Authentication",
      description: "Modern authentication methods including biometrics and MFA"
    },
    {
      icon: "fa-solid fa-key",
      title: "Advanced Session & Token Control",
      description: "Granular control over session management and token lifecycle"
    }, 
    {
      icon: "fa-solid fa-sheet-plastic",
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
      <div className="assistant-btn">
        <i className="fa-solid fa-headset"></i>
      <span>Talk With Us!</span>
      </div>
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
      <div className="working-container">
        <h2 className="working-heading">How AUTHREX Works</h2>
        <p>Three simple steps to implement adaptive authentication</p>
        <div className="working-steps-container">
          <div className="working-step">
            <div className="step-icon-container">
              <i className="fa-solid fa-gear"></i>
            </div>
            <span>STEP 1</span>
            <h3>1. Define Policies</h3>
            <p>Configure authentication rules, risk thresholds, and access policies through our intuitive dashboard or API.</p>
          </div>
          <div className="working-step">
            <div className="step-icon-container">
              <i className="fa-solid fa-code"></i>
            </div>
            <span>STEP 2</span> 
            <h3>2. Authenticate via APIs</h3>
            <p>Integrate our authentication APIs into your application with minimal code using our SDKs.</p>
          </div>
          <div className="working-step">
            <div className="step-icon-container">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <span>STEP 3</span>
            <h3>3. Adaptive Access Decisions</h3>
            <p>AUTHREX evaluates context and risk in real-time to make intelligent access control decisions.</p>
          </div>
        </div>
      </div>
      <div className="developer-documetation-container">
        <div className="snippet-container">
          <div className="snippet-header">
            <div className="action-container">
              <div className="actions-red"></div>
              <div className="actions-yellow"></div>
              <div className="actions-green"></div>
            </div>
            <span>API Call</span>
          </div>
          <div className="snippet-content">
            <pre>
              <code>
                {
                  `// Initialize AUTHREX SDK
import { AuthRex } from '@authrex/sdk';

const auth = new AuthRex({
  apiKey: process.env.AUTHREX_API_KEY,
  environment: 'production'
});

// Authenticate user with risk assessment
const result = await auth.authenticate({
  userId: 'user_123',
  method: 'passwordless',
  context: {
    ipAddress: req.ip,
    userAgent: req.headers['user-agent'],
    deviceId: req.cookies.deviceId
  }
});

if (result.decision === 'allow') {
  // Grant access
  return res.json({ token: result.token });
} else if (result.decision === 'challenge') {
  // Request additional verification
  return res.json({ 
    requiresMFA: true,
    challengeId: result.challengeId 
  });
}`
                }
              </code>
            </pre>
          </div>
        </div>
        <div className="documentation-container">
          <h2>Built for Developers</h2>
          <p>AUTHREX provides clean, intuitive APIs and comprehensive SDKs that make integration seamless. Focus on building your application while we handle the complexity of authentication.</p>
          <ul>
            <li><i className="fa-solid fa-check"></i>Comprehensive SDKs</li>
            <p>Available for Node.js, Python, Go, Java, and more</p>
            <li><i className="fa-solid fa-check"></i>Clean REST APIs</li>
            <p>Well-documented, predictable, and easy to use</p>
            <li><i className="fa-solid fa-check"></i>Language Agnostic</li>
            <p>Integrate with any tech stack or framework</p>
            <li><i className="fa-solid fa-check"></i>Easy Integration</li>
            <p>Get started in minutes with our quick-start guides</p>
          </ul>
          <button>Read Documentation</button>
        </div>
      </div>
    </main>
    </>
  );
}
