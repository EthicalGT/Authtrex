"use client";

import { useState } from "react";
import "./style.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PrivacyModal from "../Modals/PrivacyModal";

const Authorize = () => {
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const router = useRouter();

    const handleAccountSelect = () => {
        router.push('/components/QuickAuth/authorize');
    };

    return (
        <section className="authorize-section">
            <div className="authorize-main-container">
                <div className="authorize-container">
                    <div className="authorize-logo">
                        <Link href="/">
                            <Image src="/icon.png" alt="AuthREX" width={100} height={32} style={{ objectFit: 'contain' }} />
                        </Link>
                    </div>
                    <h2>Choose an AUTHREX account</h2>
                    <p className="subtitle">Continue to DevForum</p>

                    <div className="authrex-account-container">
                        <div className="authrex-account-data" onClick={handleAccountSelect}>
                            <div className="account-initials">GT</div>
                            <div className="authrex-account-info">
                                <h3>Ganesh Telore</h3>
                                <p>ganesh@example.com</p>
                            </div>
                            <i className="fa-solid fa-angle-right icon"></i>
                        </div>

                        <div className="authrex-account-data" onClick={handleAccountSelect}>
                            <div className="account-initials">TD</div>
                            <div className="authrex-account-info">
                                <h3>Test Developer</h3>
                                <p>dev@test.com</p>
                            </div>
                            <i className="fa-solid fa-angle-right icon"></i>
                        </div>

                        <div className="use-another-account">
                            <Link href="/sign-in">Use another account</Link>
                        </div>
                    </div>

                    <div className="authorize-footer">
                        <div className="footer-links">
                            <button onClick={() => setIsPrivacyOpen(true)} className="footer-link-btn">Privacy Policy</button>
                            <button onClick={() => setIsPrivacyOpen(true)} className="footer-link-btn">Terms</button>
                            <Link href="/security">Security</Link>
                            <Link href="/security">AUTHREX Status</Link>
                        </div>
                        <div className="copyright">
                            © AUTHREX Identity Infrastructure
                        </div>
                    </div>
                </div>
            </div>

            <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </section>
    );
}

export default Authorize;