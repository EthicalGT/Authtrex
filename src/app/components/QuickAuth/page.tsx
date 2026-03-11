import "./style.css";
import Image from "next/image";
import favicon from "../../assets/img/favicon.svg";

const authorize = () => {
    return (
        <section>
            <div className="authorize-main-container">
            <div className="authorize-container">
                <Image src="/favicon.png" alt="AuthREX" width={70} height={85} />
                <h2>Choose an AuthREX Account</h2>
                <p>Continue to DevForum</p>
                <div className="authrex-account-container">
                    <div className="authrex-account-data">
                        <i className="fa-solid fa-shield-halved user-icon"></i>
                        <div className="authrex-account-info">
                            <h3>Ganesh Telore</h3>
                            <p>ganesh.telore@example.com</p>
                        </div>
                        <i className="fa-solid fa-angle-right icon"></i>
                    </div>
                    <div className="authrex-account-data">
                        <i className="fa-solid fa-shield-halved user-icon"></i>
                        <div className="authrex-account-info">
                            <h3>Ganesh Telore</h3>
                            <p>ganesh.telore@example.com</p>
                        </div>
                        <i className="fa-solid fa-angle-right icon"></i>
                    </div>
                    <div className="authrex-account-actions">
                        <i className="fas fa-caret-down"></i>
                    </div>
                </div>
            </div>
            </div>
        </section>
    );

}

export default authorize;