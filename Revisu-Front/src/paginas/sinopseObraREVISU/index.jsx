// src/sinopseObraREVISU/index.jsx
import { useState, useEffect } from "react";
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel, PiFilmSlateBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import {
    BsFillPersonCheckFill,
    BsFillPersonDashFill,
    BsPersonBoundingBox,
} from "react-icons/bs";
import "./style.css";
import { generoColors } from "../../dados/generoColors.js";
import { useNavigate, useParams } from "react-router-dom";

function sinopseObraREVISU() {
    const { idObra, idUsuario } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [sinopsesObra, setSinopsesObra] = useState({
        idObra: "",
        titulo: "",
        sinopse: "",
        imagem: "",
        notaMedia: 0,
        generos: [],
        atores: [],
        marcardo: null,
    });

    const [slidesObra, setSlideObra] = useState([]);
    const [slidesCelebridades, setSlidesCelebridades] = useState([]);

    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);

    useEffect(() => {
        async function fetchObraSinopse() {
            try {

                const resp = await fetch(
                    `https://localhost:44348/api/Recomendacao/detalhes-obras/${idObra}/${idUsuario}`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error("Erro ao buscar detalhes da obra");
                }

                const dados = await resp.json();

                setSinopsesObra({
                    idObra: dados.idObra || dados.id,
                    titulo: dados.titulo,
                    sinopse: dados.sinopse,
                    imagem: dados.imagem,
                    notaMedia: dados.notaMedia,
                    generos: dados.generos || [],
                    atores: dados.atores || [],
                    marcado: dados.marcado,
                });

                setSlidesCelebridades(dados.atores || []);
            } catch (error) {
                console.error("Erro ao buscar sinopse da obra:", error);
            }
        }

        fetchObraSinopse();
    }, [idObra, idUsuario]);

    useEffect(() => {
        async function fetchSlideObra() {
            try {
                setLoading(true);
                const resp = await fetch(
                    `https://localhost:44348/api/Recommendation/similar-obras/${idObra}/${idUsuario}`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error("Erro ao buscar detalhes da obra");
                }

                const dados = await resp.json();

                setSlideObra(dados);

            } catch (error) {
                console.error("Erro ao buscar obras similares:", error);
            } finally {
                setLoading(false); // termina carregamento
            }
        }

        fetchSlideObra();
    }, [idObra, idUsuario]);
    const [idAvaliacao, setIdAvaliacao] = useState("");
    const [comentarioUsuarioPuxou, setComentariousuarioPuxou] = useState("");
    const [comentarioUsuarioInseriu, setComentariousuarioInseriu] = useState("");
    const [notaEstrelaPuxou, setNotaEstrelaPuxou] = useState(0);
    const [notaEstrelaInseriu, setNotaEstrelaInseriu] = useState(null);
    const notaValida = Number.isInteger(notaEstrelaInseriu) && notaEstrelaInseriu >= 1 && notaEstrelaInseriu <= 5;
    useEffect(() => {
        async function pegaAvaliacao() {
            try {
                const resp = await fetch(
                    `https://localhost:44348/api/AvaliacaoUsuario/listar-avaliacao-obra?idUsuario=${idUsuario}&idObra=${idObra}`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error("Erro ao buscar avaliação da obra");
                }

                const dados = await resp.json();

                setIdAvaliacao(dados.idAvaliacaoUsuario);
                setNotaEstrelaPuxou(dados.nota);
                setComentariousuarioPuxou(dados.comentario);

            } catch (error) {
                console.error("Erro ao buscar avaliação da obra:", error);
                setIdAvaliacao("");
                setNotaEstrelaPuxou(0);
                setComentariousuarioPuxou("");
            }
        }

        pegaAvaliacao();
    }, [idObra, idUsuario]);
    async function EnviarAvaliacao() {
        try {
            const response = await fetch(
                `https://localhost:44348/api/AvaliacaoUsuario/salvar-avaliacao-obra?idUsuario=${idUsuario}&idObra=${idObra}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        comentario: comentarioUsuarioInseriu,
                        nota: notaEstrelaInseriu,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao enviar comentário");
            }

        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        } finally {
            pegaAvaliacao();
        }
    }

    function arredondarNota(nota) {
        if (!nota) return "0.0";
        const primeiraCasa = Math.floor(nota * 10) / 10;
        const segundaCasa = Math.floor((nota * 100) % 10);
        return segundaCasa >= 6
            ? (primeiraCasa + 0.1).toFixed(1)
            : primeiraCasa.toFixed(1);
    }

    const visibleCount4 = 4;
    const stepCele = 2;

    function nextSlideObra() {
        if (slidesObra.length === 0) return;
        setIndexCarroselObra((prev) => (prev + 1) % slidesObra.length);
    }

    function prevSlideObra() {
        if (slidesObra.length === 0) return;
        setIndexCarroselObra(
            (prev) => (prev - 1 + slidesObra.length) % slidesObra.length
        );
    }

    function nextSlideCele() {
        if (slidesCelebridades.length === 0) return;
        setIndexCarroselCele((prev) => (prev + stepCele) % slidesCelebridades.length);
    }

    function prevSlideCele() {
        if (slidesCelebridades.length === 0) return;
        setIndexCarroselCele(
            (prev) => (prev - stepCele + slidesCelebridades.length) %
                slidesCelebridades.length
        );
    }

    function getVisibleSlidesObras() {
        if (slidesObra.length === 0) return [];
        const qtd = Math.min(visibleCount4, slidesObra.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselObra + i) % slidesObra.length;
            return { ...slidesObra[slideIndex], _i: slideIndex };
        });
    }

    function getVisibleSlidesCelebridades() {
        if (slidesCelebridades.length === 0) return [];
        const qtd = Math.min(visibleCount4, slidesCelebridades.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselCele + i) % slidesCelebridades.length;
            return { ...slidesCelebridades[slideIndex], _i: slideIndex };
        });
    }
    const celeVisiveis = getVisibleSlidesCelebridades();

    if (!sinopsesObra) {
        return <h2>Obra não encontrada.</h2>;
    }
    async function salvarNaBibliotecaObra(idObra) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Salvar-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        idObra: idObra,
                        idElenco: null,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            setSinopsesObra(prev => ({
                ...prev,
                marcado: true,
            }));

            setSlideObra(prev =>
                prev.map(o => {
                    const oid = o.idObra || o.id;
                    if (oid === idObra) {
                        return { ...o, marcado: true };
                    }
                    return o;
                })
            );
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }

    async function salvarNaBibliotecaCele(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Salvar-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            setSlidesCelebridades(prev =>
                prev.map(a => {
                    const aid = a.idElenco || a.id;
                    if (aid === idElenco) {
                        return { ...a, marcado: true };
                    }
                    return a;
                })
            );
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function removerNaBibliotecaObra(idObra) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Remover-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        idObra: idObra,
                        idElenco: null,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover da biblioteca");
            }

            setSinopsesObra(prev => ({
                ...prev,
                marcado: false,
            }));

            setSlideObra(prev =>
                prev.map(o => {
                    const oid = o.idObra || o.id;
                    if (oid === idObra) {
                        return { ...o, marcado: false };
                    }
                    return o;
                })
            );
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function removerNaBibliotecaCele(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Remover-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: idUsuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover da biblioteca");
            }

            setSlidesCelebridades(prev =>
                prev.map(a => {
                    const aid = a.idElenco || a.id;
                    if (aid === idElenco) {
                        return { ...a, marcado: false };
                    }
                    return a;
                })
            );
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    return (
        <div className="sinopse-container">
            <div>
                <h1>-</h1>
            </div>

            {loading && (
                <div className="home-loading-overlay">
                    <div className="home-loading-inner">
                        <PiFilmSlateBold className="home-loading-icon" />
                        <p className="home-loading-text">Carregando Recomendações...</p>
                    </div>
                </div>
            )}

            <div className="sinopse-content">
                {/* ====== TOPO ====== */}
                <div className="sinopse-top">
                    {/* POSTER */}
                    <div className="sinopse-left">
                        <div
                            className="poster-card"
                            style={{
                                boxShadow:
                                    sinopsesObra.marcado === true
                                        ? "0px -10px 12px -4px #4cd815"
                                        : "0px -10px 12px -4px #9A15D8",
                            }}
                        >
                            <div>
                                {sinopsesObra.imagem === "Sem poster" ? (
                                    <div className="foto-fallback">
                                        <CiImageOff className="fallback-icon" />
                                        <p className="fallback-text">Sem foto</p>
                                    </div>
                                ) : (
                                    <img
                                        className="poster-img"
                                        src={`https://image.tmdb.org/t/p/w500/${sinopsesObra.imagem}`}
                                        alt={sinopsesObra.titulo}
                                    />
                                )}
                            </div>

                            <div className="poster-info">
                                <p className="poster-rating">
                                    <FaStar className="star-icon" />
                                    {arredondarNota(sinopsesObra.notaMedia)}
                                </p>

                                <div className="poster-button">
                                    {sinopsesObra.marcado === true ? (
                                        <button
                                            className="marcar-toggle desmarcar-btn"
                                            style={{ boxShadow: "1px 1px 10px 1px #9A15D8" }}
                                            onClick={() => removerNaBibliotecaObra(sinopsesObra.idObra || sinopsesObra.id)}
                                        >
                                            <LuScissorsLineDashed className="icon" />
                                            <p style={{ marginLeft: "10px" }}>Desmarcar</p>
                                        </button>
                                    ) : (
                                        <button
                                            className="marcar-toggle marcar-btn"
                                            style={{ boxShadow: "1px 1px 10px 1px #4cd815" }}
                                            onClick={() => salvarNaBibliotecaObra(sinopsesObra.idObra || sinopsesObra.id)}
                                        >
                                            <RiFilmAiLine className="icon" />
                                            <p style={{ marginLeft: "10px" }}>Marcar</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* stars visual */}
                        <div className="stars-row">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const isFilled = i < notaEstrelaPuxou; // 1 a 5

                                return (
                                    <FaStar
                                        key={i}
                                        className={isFilled ? "star-filled" : "star-outline"}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* TEXTO */}
                    <div className="sinopse-right">
                        <h2 className="sinopse-title">{sinopsesObra.titulo}</h2>

                        <div className="sinopse-block">
                            <p className="sinopse-label">SINOPSE:</p>
                            <p className="sinopse-text">{sinopsesObra.sinopse || `Não temos sinopse para ${sinopsesObra.titulo} no momento...`}</p>
                        </div>

                        <div className="sinopse-generos">
                            <p className="sinopse-label">GÊNEROS:</p>
                            {sinopsesObra.generos.map((g, idx) => (
                                <span
                                    key={idx}
                                    className="genero-chip"
                                    style={{ borderColor: generoColors[g] || "#9A15D8" }}
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ====== COMENTÁRIOS ====== */}
                <div
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                    <div className="comentario-box">
                        {idAvaliacao ? (
                            // JÁ EXISTE AVALIAÇÃO -> só mostra
                            <>
                                <h3>Sua avaliação</h3>
                                <p style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
                                    {comentarioUsuarioPuxou || "Você não deixou comentário."}
                                </p>
                            </>
                        ) : (
                            // AINDA NÃO TEM AVALIAÇÃO -> mostra inputs
                            <>
                                <label>Nota (1 a 5):</label>
                                <input
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={notaEstrelaInseriu ?? ""}
                                    onChange={(e) => {
                                        const valor = e.target.value;
                                        setNotaEstrelaInseriu(
                                            valor === "" ? null : e.target.valueAsNumber // garante número
                                        );
                                    }}
                                    className="comentario-input-nota"
                                    style={{ width: "2%", height: "3%" }}
                                />

                                <label style={{ marginTop: "10px" }}>Comentário:</label>
                                <textarea
                                    placeholder="Comente o que achou da obra"
                                    value={comentarioUsuarioInseriu}
                                    onChange={(e) =>
                                        setComentariousuarioInseriu(e.target.value)
                                    }
                                />

                                <button
                                    className="comentario-btn"
                                    type="button"
                                    onClick={EnviarAvaliacao}
                                    disabled={!notaValida}
                                >
                                    Enviar
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ====== ELENCO ====== */}
                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>ELENCO</p>
                        <p style={{ marginLeft: "10px" }}>EM DESTAQUE:</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Atores e Atrizes da obra em destaque.</p>
                    </div>


                    <div className="container-carrousel-celeDesta">
                        {celeVisiveis.length === 0 ? (
                            <p className="sem-elenco">
                                Elenco indisponível por um tempo...
                            </p>
                        ) : (
                            <div>
                                <button className="arrow left" onClick={prevSlideCele}>
                                    ❮
                                </button>

                                <div className="slides-grid-celeDesta">
                                    {celeVisiveis.map((cele) => (
                                        <div
                                            className="card-celeDesta"
                                            key={cele._i}
                                            style={{
                                                boxShadow:
                                                    cele.marcado === true
                                                        ? "0px -10px 12px -4px #4cd815"
                                                        : "0px -10px 12px -4px #9A15D8",
                                                border:
                                                    cele.marcado === true
                                                        ? "2px solid #4cd815"
                                                        : "2px solid #9a15d8",
                                            }}
                                        >
                                            <div className="foto-wrapper">
                                                {cele.imagem || cele.foto ? (
                                                    <img
                                                        className="slide-imageceleDesta"
                                                        src={`https://image.tmdb.org/t/p/w500/${cele.imagem || cele.foto
                                                            }`}
                                                        alt={cele.nome}
                                                    />
                                                ) : (
                                                    <div className="foto-fallback">
                                                        <CiImageOff className="fallback-icon" />
                                                        <p className="fallback-text">Sem foto</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info-celeDesta" style={{ width: "77%" }}>
                                                <p className="title-celeDesta">{cele.nome}</p>

                                                <div className="generos-celeDesta">
                                                    {(cele.generos || []).map((g, idx) => (
                                                        <span
                                                            className="genero-chip"
                                                            key={idx}
                                                            style={{
                                                                borderColor: generoColors[g] || "#9A15D8",
                                                            }}
                                                        >
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ width: "8%" }}>
                                                <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${cele.idElenco}/${idUsuario}`)}>
                                                    <BsPersonBoundingBox
                                                        className="icon"
                                                        style={{ color: "#d8c415ff" }}
                                                    />
                                                </button>

                                                <div style={{ marginTop: "10%" }}>
                                                    <div style={{ display: cele.marcado === true ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => salvarNaBibliotecaCele(cele.idElenco)}>
                                                            <BsFillPersonCheckFill
                                                                className="icon"
                                                                style={{ color: "#4cd815" }}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div style={{ display: cele.marcado === false ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => removerNaBibliotecaCele(cele.idElenco)}>
                                                            <BsFillPersonDashFill
                                                                className="icon"
                                                                style={{ color: "#9A15D8" }}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="arrow right" onClick={nextSlideCele}>
                                    ❯
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ====== OBRAS RELACIONADAS ====== */}
                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>OBRAS</p>
                        <p style={{ marginLeft: "10px" }}>RELACIONADAS</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Obras semelhantes à obra em destaque.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        <button className="arrow left" onClick={prevSlideObra}>
                            ❮
                        </button>

                        <div className="slides-row">
                            {getVisibleSlidesObras().map((slide) => (
                                <div
                                    className="card-obra"
                                    key={slide._i}
                                    style={{
                                        boxShadow:
                                            slide.marcado === true
                                                ? "0px -10px 12px -4px #4cd815"
                                                : "0px -10px 12px -4px #9A15D8",
                                        border:
                                            slide.marcado === true
                                                ? "2px solid #4cd815"
                                                : "2px solid #9a15d8",
                                    }}
                                >
                                    <div>
                                        <img
                                            className="slide-imageObras"
                                            src={`https://image.tmdb.org/t/p/w500/${slide.imagem}`}
                                            alt={slide.nome || slide.titulo}
                                        />
                                    </div>

                                    <div>
                                        <p className="title-obra">{slide.nome || slide.titulo}</p>
                                    </div>

                                    <div>
                                        <div>
                                            <p>{slide.tipo === "Filme" ? "Filme" : "Série"}</p>
                                        </div>
                                        <button
                                            className="icon-btn sinopse-btn"
                                            onClick={() =>
                                                navigate(
                                                    `/sinopse-obra/${slide.idObra || slide.id}/${idUsuario}`
                                                )
                                            }
                                        >
                                            <PiFilmReel className="icon" />
                                            <p style={{ marginLeft: "10px" }}>Sinopse</p>
                                        </button>

                                        <div style={{ display: slide.marcado === true ? "none" : "" }}>
                                            <button
                                                className="icon-btn marcar-btn"
                                                style={{ boxShadow: "1px 1px 10px 1px #4cd815" }}
                                                onClick={() => salvarNaBibliotecaObra(slide.idObra || slide.id)}
                                            >
                                                <RiFilmAiLine className="icon" />
                                                <p style={{ marginLeft: "10px" }}>Marcar</p>
                                            </button>
                                        </div>

                                        <div style={{ display: slide.marcado === false ? "none" : "" }}>
                                            <button
                                                className="icon-btn desmarcar-btn"
                                                style={{ boxShadow: "1px 1px 10px 1px #9A15D8" }}
                                                onClick={() => removerNaBibliotecaObra(slide.idObra || slide.id)}
                                            >
                                                <LuScissorsLineDashed className="icon" />
                                                <p style={{ marginLeft: "10px" }}>Desmarcar</p>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="title-obra">
                                            <FaStar style={{ color: "#d8c415ff" }} />{" "}
                                            {arredondarNota(slide.notaMedia)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideObra}>
                            ❯
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h1>-</h1>
            </div>
        </div>
    );
}
export default sinopseObraREVISU;
