import { useState, useMemo } from "react";
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import {
    BsFillPersonCheckFill,
    BsFillPersonDashFill,
    BsPersonBoundingBox,
} from "react-icons/bs";
import "./style.css";
import { slideObra } from "../../dados/slideObra.js";
import { slideCelebridade } from "../../dados/slideCelebridades.js";
import { slideDiretore } from "../../dados/slideDiretor.js";
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

function getTopGenresFromCelebs(celebs, limit) {
    const counts = {};

    celebs.forEach((c) => {
        c.generos?.forEach((g) => {
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
    const [slidesObra] = useState(slideObra);
    const [slidesCelebridades] = useState(slideCelebridade);
    const [slidesDiretores] = useState(slideDiretore);
    const [marcado, setMarcado] = useState(true);
    const navigate = useNavigate();

    const visibleCountObra = 4;
    const visibleCountCele = 4;
    const visibleCountDire = 2;

    // índices por gênero (obras e celebridades)
    const [indexObrasPorGenero, setIndexObrasPorGenero] = useState({});
    const [indexCelebridadesPorGenero, setIndexCelebridadesPorGenero] = useState({});
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);

    // Top 5 gêneros de obras
    const topObraGenres = useMemo(
        () => getTopGenresFromObras(slidesObra, 5),
        [slidesObra]
    );

    // Top 3 gêneros de celebridades
    const topCeleGenres = useMemo(
        () => getTopGenresFromCelebs(slidesCelebridades, 2),
        [slidesCelebridades]
    );

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


    function nextSlideCeleGenero(genero) {
        const celebsDoGenero = slidesCelebridades.filter((c) =>
            c.generos?.includes(genero)
        );
        if (!celebsDoGenero.length) return;

        setIndexCelebridadesPorGenero((prev) => {
            const atual = prev[genero] || 0;
            return { ...prev, [genero]: (atual + 1) % celebsDoGenero.length };
        });
    }

    function prevSlideCeleGenero(genero) {
        const celebsDoGenero = slidesCelebridades.filter((c) =>
            c.generos?.includes(genero)
        );
        if (!celebsDoGenero.length) return;

        setIndexCelebridadesPorGenero((prev) => {
            const atual = prev[genero] || 0;
            return {
                ...prev,
                [genero]: (atual - 1 + celebsDoGenero.length) % celebsDoGenero.length,
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
                                                    marcado !== true
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
                                                        navigate("/sinopse-obra/" + slide.idObra)
                                                    }
                                                >
                                                    <PiFilmReel className="icon" />
                                                    <p style={{ marginLeft: "10px" }}>Sinopse</p>
                                                </button>

                                                <div style={{ display: marcado === true ? "" : "none" }}>
                                                    <button
                                                        className="icon-btn marcar-btn"
                                                        style={{ boxShadow: "1px 1px 10px 1px #4cd815" }}
                                                    >
                                                        <RiFilmAiLine className="icon" />
                                                        <p style={{ marginLeft: "10px" }}>Marcar</p>
                                                    </button>
                                                </div>

                                                <div
                                                    style={{ display: marcado !== true ? "" : "none" }}
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

                {topCeleGenres.map((genero) => {
                    const celebsDoGenero = slidesCelebridades.filter((c) =>
                        c.generos?.includes(genero)
                    );
                    const indexAtual = indexCelebridadesPorGenero[genero] || 0;
                    const visibleCelebs = getVisibleSlides(
                        celebsDoGenero,
                        indexAtual,
                        visibleCountCele
                    );

                    if (!celebsDoGenero.length) return null;

                    return (
                        <div className="carrousel-celeDesta" key={genero}>
                            <div className="titulo">
                                <p style={{ color: "#9A15D8", marginLeft: "10px" }}>CELEBRIDADES</p>
                                <p style={{ marginLeft: "10px" }}>EM DESTAQUE  –</p>
                                <p style={{ color: "#9A15D8", marginLeft: "5px", fontWeight: "600" }}>{genero}</p>
                            </div>

                            <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                                <p>
                                    Atores e atrizes que se destacam em obras do gênero {genero}.
                                </p>
                            </div>

                            <div className="container-carrousel-celeDesta">
                                <button
                                    className="arrow left"
                                    onClick={() => prevSlideCeleGenero(genero)}
                                >
                                    ❮
                                </button>

                                <div className="slides-grid-celeDesta">
                                    {visibleCelebs.map((cele) => (
                                        <div
                                            className="card-celeDesta"
                                            key={cele._i}
                                            style={{
                                                boxShadow:
                                                    marcado !== true
                                                        ? "-8px 0 12px -2px #4cd815"
                                                        : "-8px 0 12px -2px #9A15D8",
                                            }}
                                        >
                                            <div className="foto-wrapper">
                                                {cele.foto ? (
                                                    <img
                                                        className="slide-imageceleDesta"
                                                        src={`https://image.tmdb.org/t/p/w500/${cele.foto}`}
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
                                                    {cele.generos?.map((g, idx) => (
                                                        <span
                                                            className="genero-chip"
                                                            key={idx}
                                                            style={{
                                                                borderColor: generosColorsMap[g] || "#9A15D8",
                                                            }}
                                                        >
                                                            {g}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div style={{ width: "8%" }}>
                                                <button className="icon-btn">
                                                    <BsPersonBoundingBox
                                                        className="icon"
                                                        onClick={() => navigate("/detalhe-cele-dire")}
                                                        style={{ color: "#d8c415ff" }}
                                                    />
                                                </button>

                                                <div style={{ marginTop: "10%" }}>
                                                    <div style={{ display: marcado === true ? "" : "none" }}>
                                                        <button className="icon-btn">
                                                            <BsFillPersonCheckFill
                                                                className="icon"
                                                                style={{ color: "#4cd815" }}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div
                                                        style={{ display: marcado !== true ? "" : "none" }}
                                                    >
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

                                <button
                                    className="arrow right"
                                    onClick={() => nextSlideCeleGenero(genero)}
                                >
                                    ❯
                                </button>
                            </div>
                        </div>
                    );
                })}

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
                                            marcado !== true
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
                                        <button className="icon-btn">
                                            <BsPersonBoundingBox
                                                className="icon"
                                                onClick={() => navigate("/detalhe-cele-dire")}
                                                style={{ color: "#d8c415ff" }}
                                            />
                                        </button>

                                        <div style={{ marginTop: "10%" }}>
                                            <div style={{ display: marcado === true ? "" : "none" }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonCheckFill
                                                        className="icon"
                                                        style={{ color: "#4cd815" }}
                                                    />
                                                </button>
                                            </div>
                                            <div style={{ display: marcado !== true ? "" : "none" }}>
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
