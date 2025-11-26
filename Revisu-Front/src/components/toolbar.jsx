import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCog, FaUser } from "react-icons/fa";
import "../index.css";

export default function Toolbar({ logado }) {
    const navigate = useNavigate();

    return (
        <div className="toolbar">
            <div className="logo">
                <img
                    src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                    style={{ width: "10%", height: "10%", borderRadius: "8px" }}
                />
            </div>

            <nav className="nav-center">
                <Link to="/home">Home</Link>
                <Link to="/pesquisar">Pesquisar</Link>

                {logado === true && <Link to="/biblioteca">Biblioteca</Link>}
                {logado === true && <Link to="/para-voce">Para Você</Link>}

                <Link to="/sobre">Sobre nós</Link>
            </nav>

            <nav className="nav-right">
                <button className="icon-btn" onClick={() => navigate("/editar")}><FaCog className="icon" /></button>
                <FaUser className="icon" style={{ marginTop: '7%' }} />
                <Link to="/login">Entrar</Link>
            </nav>
        </div>
    );
}
