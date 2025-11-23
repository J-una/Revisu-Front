import { Link } from "react-router-dom";
import { FaCog, FaUser } from "react-icons/fa";
import "../style.css"; // ou o css da toolbar

export default function Toolbar({ logado }) {
    return (
        <div className="toolbar">
            <img
                src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                style={{ width: "3.5%", height: "3.5%", borderRadius: "8px" }}
            />

            <nav className="nav">
                <Link to="/home">Home</Link>
                <Link to="/pesquisar">Pesquisar</Link>

                {logado === true && <Link to="/biblioteca">Biblioteca</Link>}
                {logado === true && <Link to="/para-voce">Para Você</Link>}

                <Link to="/sobre">Sobre nós</Link>
            </nav>

            <nav className="nav">
                <button className="icon-btn"><FaCog className="icon" /></button>
                <button className="icon-btn"><FaUser className="icon" /></button>
                <Link to="/login">Entrar</Link>
            </nav>
        </div>
    );
}
