import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaCog, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
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

                <Link to="/sobre-nos">Sobre nós</Link>
            </nav>

            <nav className="nav-right">
                <button className="icon-btn" onClick={() => navigate("/editar")}><FaCog className="icon" /></button>
                <div style={{ display: logado === false ? "none" : "" }}>
                    <button className="icon-btn" onClick={() => navigate("/editar")}><ImExit className="icon" /></button>
                </div>
                <FaUser className="icon" style={{ marginTop: '5%' }} />
                <div style={{ display: logado === true ? "none" : "", marginTop: '5%' }}>
                    <Link to="/login">Entrar</Link>
                </div>
                <div style={{ display: logado === false ? "none" : "", marginTop: '5%' }}>
                    <Link to="/login">Pedro</Link>
                </div>
            </nav>
        </div>
    );
}
