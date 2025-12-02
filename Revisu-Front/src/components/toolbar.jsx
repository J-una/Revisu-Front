import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { CiImageOff } from "react-icons/ci";
import "../index.css";
import { pesquisar } from "../dados/pesquisar.js";

export default function Toolbar({ logado }) {
    const navigate = useNavigate();

    // seu mock de pesquisa (array com 1 objeto)
    const [pesquisas] = useState(pesquisar);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const data = pesquisas[0] || { obras: [], atores: [], diretores: [] };

    const term = searchTerm.trim().toLowerCase();

    const obrasFiltradas = term
        ? data.obras.filter((o) => o.nome.toLowerCase().includes(term))
        : [];
    const atoresFiltrados = term
        ? data.atores.filter((a) => a.nome.toLowerCase().includes(term))
        : [];
    const diretoresFiltrados = term
        ? data.diretores.filter((d) => d.nome.toLowerCase().includes(term))
        : [];

    const temResultados =
        obrasFiltradas.length || atoresFiltrados.length || diretoresFiltrados.length;

    return (
        <div className="toolbar-wrapper">
            <div className="toolbar">
                <div className="logo">
                    <img
                        src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                        style={{ width: "10%", height: "10%", borderRadius: "8px" }}
                    />
                </div>

                <nav className="nav-center">
                    <Link className="toolbar-search-trigger" to="/home">Home</Link>

                    <Link
                        className="toolbar-search-trigger"
                        onClick={() => setIsSearchOpen((prev) => !prev)}
                    >
                        Pesquisar
                    </Link>

                    {logado === true && <Link className="toolbar-search-trigger" to="/biblioteca">Biblioteca</Link>}
                    {logado === true && <Link className="toolbar-search-trigger" to="/para-voce">Para Você</Link>}

                    <Link className="toolbar-search-trigger" to="/sobre-nos">Sobre nós</Link>
                </nav>

                <nav className="nav-right">
                    <button className="icon-btn" onClick={() => navigate("/editar")}>
                        <FaCog className="icon" />
                    </button>

                    <div style={{ display: logado === false ? "none" : "" }}>
                        <button className="icon-btn" onClick={() => navigate("/editar")}>
                            <ImExit className="icon" />
                        </button>
                    </div>

                    <FaUser className="icon" style={{ marginTop: "5%" }} />

                    <div style={{ display: logado === true ? "none" : "", marginTop: "5%" }}>
                        <Link to="/login">Entrar</Link>
                    </div>
                    {/* <div style={{ display: logado === false ? "none" : "", marginTop: "5%" }}>
                        <Link to="/login">Pedro</Link>
                    </div> */}
                </nav>
            </div>

            {/* PAINEL DE PESQUISA */}
            {isSearchOpen && (
                <div className="toolbar-search-panel">
                    <div className="toolbar-search-header">
                        <input
                            type="text"
                            className="toolbar-search-input"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="toolbar-search-results">
                        {!term && (
                            <p className="toolbar-search-empty">
                                Digite algo para pesquisar no catálogo.
                            </p>
                        )}

                        {term && !temResultados && (
                            <p className="toolbar-search-empty">
                                Nenhum resultado encontrado para <strong>{searchTerm}</strong>.
                            </p>
                        )}

                        {obrasFiltradas.length > 0 && (
                            <div className="toolbar-search-group">
                                <p className="toolbar-search-group-title">Obras</p>
                                {obrasFiltradas.map((obra) => (
                                    <div
                                        key={obra.id}
                                        className="toolbar-search-item"
                                    // aqui depois você pode colocar navigate para a página da obra
                                    // onClick={() => navigate(`/sinopse-obra/${obra.id}`)}
                                    >
                                        <div className="toolbar-search-thumb">
                                            {obra.imagem ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${obra.imagem}`}
                                                    alt={obra.nome}
                                                />
                                            ) : (
                                                <CiImageOff className="toolbar-search-thumb-fallback" />
                                            )}
                                        </div>
                                        <div className="toolbar-search-info">
                                            <span className="toolbar-search-name">{obra.nome}</span>
                                            <span className="toolbar-search-tag">Obra</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {atoresFiltrados.length > 0 && (
                            <div className="toolbar-search-group">
                                <p className="toolbar-search-group-title">Atores</p>
                                {atoresFiltrados.map((ator) => (
                                    <div
                                        key={ator.id}
                                        className="toolbar-search-item"
                                    // onClick={() => navigate(`/detalhe-ator/${ator.id}`)}
                                    >
                                        <div className="toolbar-search-thumb">
                                            {ator.imagem ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${ator.imagem}`}
                                                    alt={ator.nome}
                                                />
                                            ) : (
                                                <CiImageOff className="toolbar-search-thumb-fallback" />
                                            )}
                                        </div>
                                        <div className="toolbar-search-info">
                                            <span className="toolbar-search-name">{ator.nome}</span>
                                            <span className="toolbar-search-tag">Ator / Atriz</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {diretoresFiltrados.length > 0 && (
                            <div className="toolbar-search-group">
                                <p className="toolbar-search-group-title">Diretores</p>
                                {diretoresFiltrados.map((dir) => (
                                    <div
                                        key={dir.id}
                                        className="toolbar-search-item"
                                    // onClick={() => navigate(`/detalhe-diretor/${dir.id}`)}
                                    >
                                        <div className="toolbar-search-thumb">
                                            {dir.imagem ? (
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500/${dir.imagem}`}
                                                    alt={dir.nome}
                                                />
                                            ) : (
                                                <CiImageOff className="toolbar-search-thumb-fallback" />
                                            )}
                                        </div>
                                        <div className="toolbar-search-info">
                                            <span className="toolbar-search-name">{dir.nome}</span>
                                            <span className="toolbar-search-tag">Diretor(a)</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
