"use client";

import React, { useState } from "react";
import "./Footer.css";
import Link from "next/link";
import Image from "next/image";
import PrivacyModal from "../Modals/PrivacyModal";

export default function Footer() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <Link href="/">
            <Image src="/icon.png" alt="Authrex Logo" width={120} height={40} className="footer-logo" />
          </Link>
          <p>Adaptive authentication infrastructure for modern applications.</p>
        </div>

        <div className="footer-links-grid">
          <div className="footer-column">
            <h4>Product</h4>
            <ul>
              <li><Link href="/#features">Features</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/security">Security</Link></li>
              <li><Link href="/security">Enterprise</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Developers</h4>
            <ul>
              <li><Link href="/docs">Documentation</Link></li>
              <li><Link href="/docs/sdk">API Reference</Link></li>
              <li><Link href="/docs/sdk">SDKs</Link></li>
              <li><Link href="/docs">Guides</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about">Careers</Link></li>
              <li><Link href="/docs">Blog</Link></li>
              <li><Link href="/about">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><button onClick={() => setIsPrivacyOpen(true)} className="footer-modal-btn">Privacy Policy</button></li>
              <li><button onClick={() => setIsPrivacyOpen(true)} className="footer-modal-btn">Terms of Service</button></li>
              <li><Link href="/security">Compliance</Link></li>
              <li><Link href="/security">Security</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AUTHREX. All rights reserved.</p>
        <p className="powered-by">Engineered with passion by <strong>GT</strong></p>
      </div>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </footer>
  );
}
