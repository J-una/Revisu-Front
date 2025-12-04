import { useState, useMemo, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";

// ---- helpers ----
function getTopGenresFromObras(obras, limit) {
    const counts = {};

    obras.forEach((obra) => {
        obra.generos?.forEach((g) => {
            counts[g] = (counts[g] || 0) + 1;
        });
    });

    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([genre]) => genre);
}

function getVisibleSlides(list, startIndex, visibleCount) {
    if (!list || list.length === 0) return [];

    const maxVisible = Math.min(visibleCount, list.length);
    const result = [];

    for (let i = 0; i < maxVisible; i++) {
        const slideIndex = (startIndex + i) % list.length;
        result.push({ ...list[slideIndex], _i: slideIndex });
    }

    return result;
}

function paravoceREVISU() {
    const navigate = useNavigate();

    const visibleCountObra = 4;
    const visibleCountCele = 4;
    const visibleCountDire = 2;

    // índices por gênero (obras e celebridades)
    const [indexObrasPorGenero, setIndexObrasPorGenero] = useState({});
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);

    const [obrasParaVoce, setObrasParaVoce] = useState({
        obras: [],
        atores: [],
        diretores: [],
    });
    const [usuario, setUsuario] = useState(() => {
        const usuarioSession = sessionStorage.getItem("usuario");
        if (usuarioSession) {
            const data = JSON.parse(usuarioSession);
            return data.idUsuario; // pega somente o GUID do usuário
        }
        return ""; // valor padrão se não houver ninguém logado
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarParaVoce() {
            try {
                setLoading(true); // começa carregando

                const resp = await fetch(
                    `https://localhost:44348/api/Recommendation/recommend/${usuario}`
                );

                const data = await resp.json();

                // se vier array, pega o primeiro; se vier objeto direto, usa ele
                const payload = Array.isArray(data) ? data[0] ?? {} : data ?? {};

                setObrasParaVoce({
                    obras: payload.obras ?? [],
                    atores: payload.atores ?? [],
                    diretores: payload.diretores ?? [],
                });
            } catch (e) {
                console.error("Erro ao buscar conteúdos para voce:", e);
            } finally {
                setLoading(false); // termina carregamento
            }
        }

        carregarParaVoce();
    }, []);

    const slidesObra = obrasParaVoce.obras || [];
    const slidesCelebridades = obrasParaVoce.atores || [];
    const slidesDiretores = obrasParaVoce.diretores || [];

    // Top 5 gêneros de obras
    const topObraGenres = useMemo(
        () => getTopGenresFromObras(slidesObra, 5),
        [slidesObra]
    );

    const visibleCount4 = 4;
    const stepCele = 2;

    function nextSlideCele() {
        const total = slidesCelebridades.length;
        if (!total) return;
        setIndexCarroselCele((prev) => (prev + stepCele) % total);
    }

    function prevSlideCele() {
        const total = slidesCelebridades.length;
        if (!total) return;
        setIndexCarroselCele((prev) => (prev - stepCele + total) % total);
    }

    function getVisibleSlidesCelebridades() {
        if (!slidesCelebridades.length) return [];
        const qtd = Math.min(visibleCount4, slidesCelebridades.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselCele + i) % slidesCelebridades.length;
            return { ...slidesCelebridades[slideIndex], _i: slideIndex };
        });
    }

    function arredondarNota(nota) {
        if (nota == null) return "-";
        const primeiraCasa = Math.floor(nota * 10) / 10;
        const segundaCasa = Math.floor((nota * 100) % 10);

        if (segundaCasa >= 6) {
            return (primeiraCasa + 0.1).toFixed(1);
        }

        return primeiraCasa.toFixed(1);
    }

    // Navegação carrossel por gênero (OBRAS)
    function nextSlideObraGenero(genero) {
        const obrasDoGenero = slidesObra.filter((o) =>
            o.generos?.includes(genero)
        );
        if (!obrasDoGenero.length) return;

        setIndexObrasPorGenero((prev) => {
            const atual = prev[genero] || 0;
            return { ...prev, [genero]: (atual + 1) % obrasDoGenero.length };
        });
    }

    function prevSlideObraGenero(genero) {
        const obrasDoGenero = slidesObra.filter((o) =>
            o.generos?.includes(genero)
        );
        if (!obrasDoGenero.length) return;

        setIndexObrasPorGenero((prev) => {
            const atual = prev[genero] || 0;
            return {
                ...prev,
                [genero]: (atual - 1 + obrasDoGenero.length) % obrasDoGenero.length,
            };
        });
    }

    // Diretores (mantido como estava, 1 carrossel)
    function nextSlideCele() {
        setIndexCarroselCele((prev) => (prev + stepCele) % slidesCelebridades.length);
    }

    function prevSlideCele() {
        setIndexCarroselCele((prev) => (prev - stepCele + slidesCelebridades.length) % slidesCelebridades.length);
    }

    function nextSlideDire() {
        setIndexCarroselDire((prev) => (prev + 1) % slidesDiretores.length);
    }

    function prevSlideDire() {
        setIndexCarroselDire(
            (prev) => (prev - 1 + slidesDiretores.length) % slidesDiretores.length
        );
    }

    const generosColorsMap = generoColors;

    return (
        <div className="paravoce-container">
            <div>
                <h1>-</h1>
            </div>

            {/* OVERLAY DE CARREGAMENTO */}
            {loading && (
                <div className="home-loading-overlay">
                    <div className="home-loading-inner">
                        <PiFilmSlateBold className="home-loading-icon" />
                        <p className="home-loading-text">Carregando Recomendações...</p>
                    </div>
                </div>
            )}

            <div className="paravoce-content">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="tituloParaVoce">
                        <h1>PARA VOCÊ</h1>
                    </div>
                </div>

                {topObraGenres.map((genero) => {
                    const obrasDoGenero = slidesObra.filter((o) =>
                        o.generos?.includes(genero)
                    );
                    const indexAtual = indexObrasPorGenero[genero] || 0;
                    const visibleObras = getVisibleSlides(
                        obrasDoGenero,
                        indexAtual,
                        visibleCountObra
                    );

                    if (!obrasDoGenero.length) return null;

                    return (
                        <div className="carrousel-obrasDesta" key={genero}>
                            <div className="titulo">
                                <p style={{ color: "#9A15D8", marginLeft: "5px" }}>OBRAS</p>
                                <p style={{ marginLeft: "10px" }}>EM DESTAQUE –</p>
                                <p style={{ color: "#9A15D8", marginLeft: "5px", fontWeight: "600" }}>{genero}</p>
                            </div>

                            <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                                <p>Obras do gênero {genero} recomendadas para você.</p>
                            </div>

                            <div className="container-carrousel-obrasDesta">
                                <button
                                    className="arrow left"
                                    onClick={() => prevSlideObraGenero(genero)}
                                >
                                    ❮
                                </button>

                                <div className="slides-row">
                                    {visibleObras.map((slide) => (
                                        <div
                                            className="card-obra"
                                            key={slide._i}
                                            style={{
                                                boxShadow:
                                                    slide.marcado === true
                                                        ? "0px -10px 12px -4px #4cd815"
                                                        : "0px -10px 12px -4px #9A15D8",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    className="slide-imageObras"
                                                    src={`https://image.tmdb.org/t/p/w500/${slide.imagem}`}
                                                    alt={slide.titulo}
                                                />
                                            </div>

                                            <div>
                                                <p className="title-obra">{slide.titulo}</p>
                                            </div>

                                            <div>
                                                <button
                                                    className="icon-btn sinopse-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/sinopse-obra/${slide.idObra || slide.id}/${usuario}`
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
                                                    >
                                                        <RiFilmAiLine className="icon" />
                                                        <p style={{ marginLeft: "10px" }}>Marcar</p>
                                                    </button>
                                                </div>

                                                <div
                                                    style={{ display: slide.marcado === false ? "none" : "" }}
                                                >
                                                    <button
                                                        className="icon-btn desmarcar-btn"
                                                        style={{ boxShadow: "1px 1px 10px 1px #9A15D8" }}
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

                                <button
                                    className="arrow right"
                                    onClick={() => nextSlideObraGenero(genero)}
                                >
                                    ❯
                                </button>
                            </div>
                        </div>
                    );
                })}

                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>CELEBRIDADES</p>
                        <p style={{ marginLeft: "10px" }}>EM DESTAQUE</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Principais Atores e Atrizes de com sua preferências.</p>
                    </div>

                    <div className="container-carrousel-celeDesta">
                        <button className="arrow left" onClick={prevSlideCele}>
                            ❮
                        </button>

                        <div className="slides-grid-celeDesta">
                            {getVisibleSlidesCelebridades().map((cele) => (
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
                                        <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${cele.idElenco}/${usuario}`)}>
                                            <BsPersonBoundingBox
                                                className="icon"
                                                style={{ color: "#d8c415ff" }}
                                            />
                                        </button>

                                        <div style={{ marginTop: "10%" }}>
                                            <div style={{ display: cele.marcado === true ? "none" : "" }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonCheckFill
                                                        className="icon"
                                                        style={{ color: "#4cd815" }}
                                                    />
                                                </button>
                                            </div>
                                            <div style={{ display: cele.marcado === false ? "none" : "" }}>
                                                <button className="icon-btn">
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
                </div>

                {/* DIRETORES – deixei 1 carrossel igual você já tinha */}
                <div className="carrousel-diretDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>DIRETORES</p>
                        <p style={{ marginLeft: "10px" }}>EM DESTAQUE:</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Principais Diretores de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-diretDesta">
                        <button className="arrow left" onClick={prevSlideDire}>
                            ❮
                        </button>

                        <div className="slides-grid-diretDesta">
                            {getVisibleSlides(
                                slidesDiretores,
                                indexCarroselDire,
                                visibleCountDire
                            ).map((dire) => (
                                <div
                                    className="card-diretDesta"
                                    key={dire._i}
                                    style={{
                                        boxShadow:
                                            dire.marcado === true
                                                ? "-8px 0 12px -2px #4cd815"
                                                : "-8px 0 12px -2px #9A15D8",
                                    }}
                                >
                                    <div className="foto-wrapper" style={{ width: "15%" }}>
                                        {dire.foto ? (
                                            <img
                                                className="slide-imageceleDesta"
                                                src={`https://image.tmdb.org/t/p/w500/${dire.foto}`}
                                                alt={dire.nome}
                                            />
                                        ) : (
                                            <div className="foto-fallback">
                                                <CiImageOff className="fallback-icon" />
                                                <p className="fallback-text">Sem foto</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="info-diretDesta" style={{ width: "77%" }}>
                                        <p className="title-diretDesta">{dire.nome}</p>

                                        <div className="generos-celeDesta">
                                            {dire.obras?.map((g, idx) => (
                                                <span
                                                    className="genero-chip"
                                                    key={idx}
                                                    style={{ borderColor: "#9A15D8" }}
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ width: "8%" }}>
                                        <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${dire.idElenco}/${usuario}`)}>
                                            <BsPersonBoundingBox
                                                className="icon"
                                                style={{ color: "#d8c415ff" }}
                                            />
                                        </button>

                                        <div style={{ marginTop: "10%" }}>
                                            <div style={{ display: dire.marcado === true ? "none" : "" }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonCheckFill
                                                        className="icon"
                                                        style={{ color: "#4cd815" }}
                                                    />
                                                </button>
                                            </div>
                                            <div style={{ display: dire.marcado === false ? "none" : "" }}>
                                                <button className="icon-btn">
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

                        <button className="arrow right" onClick={nextSlideDire}>
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

export default paravoceREVISU;
