import { Link } from "react-router-dom";


export default function Hero() {
    return (
        <section >
            <h1 style={{ color: "black"}}>
                Building Amazing WEB-APPS
            </h1>
            <p>
                I am a web developer with a passion for creating beautiful and functional web applications.
            </p>
            <Link to="/about">
                <button style={{
                    padding: "12px 24px",
                    fontSize: "20px"
                }}>
                    Get Started
                </button>
            </Link>
        </section>
    )
}
