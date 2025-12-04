// src/COMPONENTS/Footer.jsx
import { Link } from "react-router-dom";
import { PiFilmSlateBold } from "react-icons/pi";
import "../index.css";

export default function Footer({ logado }) {
    return (
        <footer className="footer">
            <div className="footer-left">
                <div className="footer-clapper">
                    <PiFilmSlateBold className="footer-clapper-icon" />
                </div>
                <p className="footer-left-text" style={{ marginLeft: '4%' }}>Cinema, filmes e séries em um só lugar.</p>
            </div>

            <nav className="footer-nav">
                <Link to="/home">Home</Link>
                <span className="footer-separator">|</span>
                {logado === true && <Link to="/biblioteca">Biblioteca</Link>}
                {logado === true && <span className="footer-separator">|</span>}
                {logado === true && <Link to="/para-voce">Para Você</Link>}
                {logado === true && <span className="footer-separator">|</span>}
                <Link to="/sobre-nos">Sobre nós</Link>
            </nav>

            <div className="footer-right">
                <img
                    src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                    alt="Revisu logo"
                    className="footer-logo"
                />
            </div>
        </footer>
    );
}
