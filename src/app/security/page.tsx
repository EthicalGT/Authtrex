import { Metadata } from "next";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import Link from "next/link";
import "./security.css";

export const metadata: Metadata = {
  title: "Security & Compliance - Authrex",
  description: "Enterprise-grade identity orchestration platform with defense-in-depth security.",
};

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="security-main-container">
        {/* Hero Section */}
        <section className="security-hero">
          <div className="section-subtitle">Security & Compliance</div>
          <h1>Security is not a feature. It is our foundation.</h1>
          <p>
            AUTHREX is engineered with defense-in-depth at every layer. From encryption and key management to continuous monitoring and strict compliance, we build infrastructure that organizations can trust with their most sensitive identity data.
          </p>
          <div className="security-hero-badges">
            <span>SOC 2 Type II Certified</span>
            <span>ISO 27001 Certified</span>
            <span>GDPR Compliant</span>
          </div>

          <div className="security-metrics">
            <div className="metric-card">
              <div className="metric-value">99.99%</div>
              <div className="metric-label">Uptime SLA</div>
              <div className="metric-sub">Guaranteed availability</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">AES-256</div>
              <div className="metric-label">Data Encrypted</div>
              <div className="metric-sub">At rest & in transit</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">15+</div>
              <div className="metric-label">Global Regions</div>
              <div className="metric-sub">Multi-region deployment</div>
            </div>
            <div className="metric-card">
              <div className="metric-value">24/7</div>
              <div className="metric-label">Security Events</div>
              <div className="metric-sub">Real-time monitoring</div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="compliance-section">
          <div className="section-subtitle">Trust & Assurance</div>
          <h2>Compliance & Certifications</h2>
          <p>
            AUTHREX maintains rigorous third-party certifications and adheres to global regulatory frameworks so your organization can operate with confidence.
          </p>
          <div className="compliance-grid">
            <div className="compliance-card">
              <span className="compliance-badge">Certified</span>
              <h3>SOC 2 Type II</h3>
              <p>Independent audit of our security controls, availability, processing integrity, confidentiality, and privacy.</p>
            </div>
            <div className="compliance-card">
              <span className="compliance-badge">Certified</span>
              <h3>ISO 27001</h3>
              <p>Internationally recognized standard for information security management systems (ISMS).</p>
            </div>
            <div className="compliance-card">
              <span className="compliance-badge">Compliant</span>
              <h3>GDPR</h3>
              <p>Full compliance with EU General Data Protection Regulation for data subject rights and processing.</p>
            </div>
            <div className="compliance-card">
              <span className="compliance-badge" style={{background: 'rgba(255, 255, 255, 0.1)', color: 'white'}}>Ready</span>
              <h3>HIPAA</h3>
              <p>Architecture and controls designed to meet HIPAA requirements for protected health information.</p>
            </div>
            <div className="compliance-card">
              <span className="compliance-badge" style={{background: 'rgba(255, 255, 255, 0.1)', color: 'white'}}>Level 1</span>
              <h3>PCI DSS</h3>
              <p>Payment Card Industry Data Security Standard compliance for secure payment data handling.</p>
            </div>
            <div className="compliance-card">
              <span className="compliance-badge">Compliant</span>
              <h3>CCPA</h3>
              <p>California Consumer Privacy Act compliance ensuring consumer data rights and transparency.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="section-subtitle">Platform Capabilities</div>
          <h2>Security Features</h2>
          <p>
            A comprehensive security stack designed for enterprise identity infrastructure — protecting every layer of the authentication lifecycle.
          </p>
          
          <div className="features-grid">
            <div className="security-feature-card">
              <i className="fa-solid fa-lock"></i>
              <h3>End-to-End Encryption</h3>
              <p>All data is encrypted at rest using AES-256 and in transit via TLS 1.3. Encryption keys are managed through a dedicated HSM infrastructure with strict rotation policies.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-mobile-screen"></i>
              <h3>Multi-Factor Authentication</h3>
              <p>Support for TOTP, WebAuthn/FIDO2, hardware security keys, SMS, and email-based MFA. Enforce MFA policies organization-wide or per-application with granular controls.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-fingerprint"></i>
              <h3>Zero Trust Architecture</h3>
              <p>Every request is verified regardless of origin. Continuous risk assessment evaluates device posture, location, behavior, and context before granting access.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-shield-virus"></i>
              <h3>Anomaly Detection</h3>
              <p>Machine learning models analyze login patterns, device fingerprints, and behavioral biometrics to detect and block suspicious activity in real time.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-key"></i>
              <h3>Secure Key Management</h3>
              <p>Cryptographic keys are generated, stored, and rotated within hardware security modules (HSMs). No key material ever leaves the secure boundary.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-file-contract"></i>
              <h3>Comprehensive Audit Logging</h3>
              <p>Immutable audit trails capture every authentication event, policy change, and administrative action. Export logs to SIEM tools via webhook or API.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-users-gear"></i>
              <h3>Role-Based Access Control</h3>
              <p>Granular RBAC with custom roles, resource-level permissions, and organization hierarchies. Enforce least-privilege access across all identity operations.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <h3>Session Management</h3>
              <p>Fine-grained session policies with configurable timeouts, idle detection, concurrent session limits, and global revocation capabilities.</p>
            </div>
            <div className="security-feature-card">
              <i className="fa-solid fa-sliders"></i>
              <h3>Policy Engine</h3>
              <p>Define custom authentication flows, access rules, and risk thresholds using a declarative policy language. Version control and rollback supported.</p>
            </div>
          </div>
        </section>

        {/* Stack/Architecture Section */}
        <section className="architecture-section">
          <div className="section-subtitle">Architecture</div>
          <h2>Infrastructure & Security Stack</h2>
          <p>AUTHREX runs on a hardened, multi-tenant cloud infrastructure with defense-in-depth at every layer of the stack.</p>
          
          <div className="stack-grid">
            <div className="stack-column">
              <h3>Data Encryption</h3>
              <div className="stack-item">
                <span className="stack-label">At Rest</span>
                <span className="stack-value">AES-256-GCM</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">In Transit</span>
                <span className="stack-value">TLS 1.3</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Key Rotation</span>
                <span className="stack-value">90-day cycle</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Key Storage</span>
                <span className="stack-value">FIPS 140-2 HSMs</span>
              </div>
            </div>

            <div className="stack-column">
              <h3>Network Security</h3>
              <div className="stack-item">
                <span className="stack-label">DDoS Protection</span>
                <span className="stack-value">Always-on</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">WAF</span>
                <span className="stack-value">Layer 7 filtering</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">VPC Isolation</span>
                <span className="stack-value">Per-tenant</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Private Endpoints</span>
                <span className="stack-value">AWS/Azure/GCP</span>
              </div>
            </div>

            <div className="stack-column">
              <h3>Operational Security</h3>
              <div className="stack-item">
                <span className="stack-label">Penetration Testing</span>
                <span className="stack-value">Quarterly</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Vulnerability Scans</span>
                <span className="stack-value">Continuous</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Incident Response</span>
                <span className="stack-value">&lt; 15 min SLAs</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Security Team</span>
                <span className="stack-value">24/7/365</span>
              </div>
            </div>

            <div className="stack-column">
              <h3>Data Residency</h3>
              <div className="stack-item">
                <span className="stack-label">US Regions</span>
                <span className="stack-value">4 data centers</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">EU Regions</span>
                <span className="stack-value">GDPR-aligned</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">APAC Regions</span>
                <span className="stack-value">Singapore, Tokyo</span>
              </div>
              <div className="stack-item">
                <span className="stack-label">Custom Regions</span>
                <span className="stack-value">Enterprise</span>
              </div>
            </div>
          </div>
        </section>

        {/* Incident Response */}
        <section className="incident-section">
          <h2>Security Incident Response</h2>
          <p style={{marginBottom: "30px", color: "rgba(255,255,255,0.7)"}}>In the unlikely event of a security incident, our response team is ready.</p>
          <div className="status-badge">
            <i className="fa-solid fa-circle-check"></i> All Systems Operational
          </div>
          
          <div className="incident-steps">
            <div className="incident-step">
              <h3>Detection</h3>
              <p>Automated anomaly detection and alerting pipeline with &lt; 5 minute detection SLAs.</p>
            </div>
            <div className="incident-step">
              <h3>Containment</h3>
              <p>Immediate isolation capabilities with automated quarantine and access revocation.</p>
            </div>
            <div className="incident-step">
              <h3>Communication</h3>
              <p>Transparent incident reporting within 24 hours. Customer notifications within 1 hour.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="security-cta">
          <h2>Ready to secure your authentication infrastructure?</h2>
          <p>Talk to our security team about how AUTHREX can meet your organization&apos;s compliance and security requirements.</p>
          <div className="cta-actions">
            <Link href="/sign-up" className="btn-primary">Get Started</Link>
            <Link href="/about" className="btn-outline">Contact Security Team</Link>
          </div>
          <div className="cta-checklist">
            <span><i className="fa-solid fa-check"></i> Free security assessment</span>
            <span><i className="fa-solid fa-check"></i> SOC 2 report available</span>
            <span><i className="fa-solid fa-check"></i> Dedicated compliance support</span>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
