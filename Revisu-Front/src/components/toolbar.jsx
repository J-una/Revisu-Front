import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCog, FaUser } from "react-icons/fa";
import { ImExit } from "react-icons/im";
import { CiImageOff } from "react-icons/ci";
import "../index.css";

export default function Toolbar({ logado }) {
    const navigate = useNavigate();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState(null);

    const panelRef = useRef(null);
    const buttonRef = useRef(null);

    // ► FECHAR AO CLICAR FORA
    useEffect(() => {
        function handleClickOutside(e) {
            if (
                panelRef.current &&
                !panelRef.current.contains(e.target) &&
                buttonRef.current &&
                !buttonRef.current.contains(e.target)
            ) {
                setIsSearchOpen(false);
            }
        }

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    // ► BUSCA NO BACK VIA FETCH
    async function buscarNoBack(termo) {
        if (!termo || termo.trim() === "") {
            setResultados(null);
            return;
        }

        try {
            const response = await fetch(
                `https://localhost:44348/api/Recomendacao/pesquisar?termo=${encodeURIComponent(termo)}`,
                { method: "GET", headers: { Accept: "*/*" } }
            );

            if (!response.ok) {
                console.error("Erro na requisição:", response.status);
                return;
            }

            const data = await response.json();
            setResultados(data);
        } catch (err) {
            console.error("Erro ao buscar:", err);
        }
    }

    function handleInput(e) {
        const termo = e.target.value;
        setSearchTerm(termo);
        buscarNoBack(termo);
    }

    return (
        <div className="toolbar-wrapper">

            {/* ============================ TOP BAR ============================ */}
            <div className="toolbar">
                <div className="logo">
                    <img
                        src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                        alt="Revisu logo"
                        style={{ width: "10%", height: "10%", borderRadius: "8px" }}
                    />
                </div>

                <nav className="nav-center">
                    <Link className="toolbar-search-trigger" to="/home">Home</Link>

                    <a
                        ref={buttonRef}
                        className="toolbar-search-trigger"
                        onClick={() => setIsSearchOpen((prev) => !prev)}
                    >
                        Pesquisar
                    </a>

                    {logado && <Link className="toolbar-search-trigger" to="/biblioteca">Biblioteca</Link>}
                    {logado && <Link className="toolbar-search-trigger" to="/para-voce">Para Você</Link>}
                    <Link className="toolbar-search-trigger" to="/sobre-nos">Sobre nós</Link>
                </nav>

                <nav className="nav-right">
                    <button className="icon-btn" onClick={() => navigate("/editar")}>
                        <FaCog className="icon" />
                    </button>

                    {logado && (
                        <button className="icon-btn" onClick={() => navigate("/editar")}>
                            <ImExit className="icon" />
                        </button>
                    )}

                    <FaUser className="icon" style={{ marginTop: "5%" }} />

                    {!logado && (
                        <div style={{ marginTop: "5%" }}>
                            <Link to="/login">Entrar</Link>
                        </div>
                    )}
                </nav>
            </div>

            {/* ============================ PAINEL DE PESQUISA ============================ */}
            {isSearchOpen && (
                <div className="toolbar-search-panel" ref={panelRef}>
                    {/* Input */}
                    <div className="toolbar-search-header">
                        <input
                            type="text"
                            className="toolbar-search-input"
                            placeholder="Pesquisar..."
                            value={searchTerm}
                            onChange={handleInput}
                        />
                    </div>

                    {/* Resultados */}
                    <div className="toolbar-search-results">
                        {!searchTerm && (
                            <p className="toolbar-search-empty">
                                Digite algo para pesquisar no catálogo.
                            </p>
                        )}

                        {searchTerm && resultados === null && (
                            <p className="toolbar-search-empty">Carregando...</p>
                        )}

                        {resultados && (
                            <>
                                {/* Obras */}
                                {resultados.obras?.length > 0 && (
                                    <div className="toolbar-search-group">
                                        <p className="toolbar-search-group-title">Obras</p>
                                        {resultados.obras.map((o) => (
                                            <div className="toolbar-search-item" key={o.id}>
                                                <div className="toolbar-search-thumb">
                                                    {o.imagem ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${o.imagem}`}
                                                            alt={o.nome}
                                                        />
                                                    ) : (
                                                        <CiImageOff className="toolbar-search-thumb-fallback" />
                                                    )}
                                                </div>
                                                <div className="toolbar-search-info">
                                                    <span className="toolbar-search-name">{o.nome}</span>
                                                    <span className="toolbar-search-tag">Obra</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Atores */}
                                {resultados.atores?.length > 0 && (
                                    <div className="toolbar-search-group">
                                        <p className="toolbar-search-group-title">Atores</p>
                                        {resultados.atores.map((a) => (
                                            <div className="toolbar-search-item" key={a.id}>
                                                <div className="toolbar-search-thumb">
                                                    {a.imagem ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${a.imagem}`}
                                                            alt={a.nome}
                                                        />
                                                    ) : (
                                                        <CiImageOff className="toolbar-search-thumb-fallback" />
                                                    )}
                                                </div>
                                                <div className="toolbar-search-info">
                                                    <span className="toolbar-search-name">{a.nome}</span>
                                                    <span className="toolbar-search-tag">Ator/Atriz</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Diretores */}
                                {resultados.diretores?.length > 0 && (
                                    <div className="toolbar-search-group">
                                        <p className="toolbar-search-group-title">Diretores</p>
                                        {resultados.diretores.map((d) => (
                                            <div className="toolbar-search-item" key={d.id}>
                                                <div className="toolbar-search-thumb">
                                                    {d.imagem ? (
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500/${d.imagem}`}
                                                            alt={d.nome}
                                                        />
                                                    ) : (
                                                        <CiImageOff className="toolbar-search-thumb-fallback" />
                                                    )}
                                                </div>
                                                <div className="toolbar-search-info">
                                                    <span className="toolbar-search-name">{d.nome}</span>
                                                    <span className="toolbar-search-tag">Diretor(a)</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
