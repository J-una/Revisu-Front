import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";
import './style.css'
import { slideObra } from "../dados/slideObra.js";
import { slideCelebridade } from "../dados/slideCelebridades.js";
import { slideDiretore } from "../dados/slideDiretor.js";
import { generoColors } from "../dados/generoColors.js";

function bibliotecaREVISU() {
    const [indexCarroselHome, setIndexCarroselHome] = useState(0);
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);
    const [slidesObra, setSlideObra] = useState(slideObra)
    const [slidesCelebridades, setSlidesCelebridades] = useState(slideCelebridade)
    const [slidesDiretores, setSlidesDiretores] = useState(slideDiretore)
    const [marcado, setMarcado] = useState(true);
    const generosColors = generoColors;

    function arredondarNota(nota) {
        const primeiraCasa = Math.floor(nota * 10) / 10;
        const segundaCasa = Math.floor((nota * 100) % 10);

        if (segundaCasa >= 6) {
            return (primeiraCasa + 0.1).toFixed(1);
        }

        return primeiraCasa.toFixed(1);
    }

    const visibleCount4 = 4;
    const visibleCount2 = 2;
    const stepCele = 2;

    function nextSlideObra() {
        setIndexCarroselObra((prev) => (prev + 1) % slidesObra.length);
    }

    function prevSlideObra() {
        setIndexCarroselObra((prev) => (prev - 1 + slidesObra.length) % slidesObra.length);
    }

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
        setIndexCarroselDire((prev) => (prev - 1 + slidesDiretores.length) % slidesDiretores.length);
    }

    function getVisibleSlidesObras() {
        return Array.from({ length: visibleCount4 }, (_, i) => {
            const slideIndex = (indexCarroselObra + i) % slidesObra.length;
            return { ...slidesObra[slideIndex], _i: slideIndex };
        });
    }

    function getVisibleSlidesCelebridades() {
        return Array.from({ length: visibleCount2 }, (_, i) => {
            const slideIndex = (indexCarroselCele + i) % slidesCelebridades.length;
            return { ...slidesCelebridades[slideIndex], _i: slideIndex };
        });
    }

    function getVisibleSlidesDiretores() {
        return Array.from({ length: visibleCount2 }, (_, i) => {
            const slideIndex = (indexCarroselDire + i) % slidesDiretores.length;
            return { ...slidesDiretores[slideIndex], _i: slideIndex };
        });
    }

    const generoColorsBiblioteca = [
        { genero: "História", cor: "#E67E22", },
        { genero: "Terror", cor: "#A568C8", },
        { genero: "Música", cor: "#59b680ff", },
        { genero: "Mistério", cor: "#C014B5", },
        { genero: "Romance", cor: "#B92F2F", },
        { genero: "Ficção científica", cor: "#00BCD4", },
        { genero: "Cinema TV", cor: "#3498DB", },
        { genero: "Thriller", cor: "#17f5e2ff", },
        { genero: "Guerra", cor: "#26a93cff", },
        { genero: "Faroeste", cor: "#D35400", },
        { genero: "Ação e Aventura", cor: "#688EC8", },
        { genero: "Crime", cor: "#2740aeff", },
        { genero: "Documentário", cor: "#ce17b5ff", },
        { genero: "Drama", cor: "#5D6D7E", },
        { genero: "Família", cor: "#7e5d7eff", },
        { genero: "Infantil", cor: "#F1C40F", },
        { genero: "Notícias", cor: "#95A5A6", },
        { genero: "Reality", cor: "#FFFFFF", },
        { genero: "Ficção Científica e Fantasia", cor: "#68C879", },
        { genero: "Novela", cor: "#E69A9A", },
        { genero: "Talk Show", cor: "#EEFF00", },
        { genero: "Guerra e Política", cor: "#566573" },
    ];

    const generoQtd = [
        { genero: ["História", "Guerra", "Música"] },
        { genero: ["Terror", "Música", "Romance"] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
    ];

    const generoCountMap = generoQtd.reduce((acc, item) => {
        item.genero.forEach((g) => {
            acc[g] = (acc[g] || 0) + 1;
        });
        return acc;
    }, {});

    const generoColorsSorted = [...generoColorsBiblioteca].sort((a, b) => {
        return (generoCountMap[b.genero] || 0) - (generoCountMap[a.genero] || 0);
    });

    return (
        <div className="biblioteca-container">
            <div><h1>-</h1></div>
            <div className="biblioteca-content">

                <div className='tituloBiblioteca'>
                    <div style={{ marginTop: '15px' }}>
                        <h1 style={{ marginLeft: '15px' }}>MINHA BIBLIOTECA</h1>
                    </div>
                </div>

                <div className="generosPreferidos">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>GÊNEROS</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div className="generos-preferidos">
                        {generoColorsSorted.map((g, idx) => (
                            <div key={idx} className="generos-item">
                                <span
                                    className="generos-preferidos-chip"
                                    style={{ borderColor: g.cor }}
                                >
                                    {g.genero}:{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        {generoCountMap[g.genero] || 0}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Principais filmes de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        <button className="arrow left" onClick={prevSlideObra}>❮</button>

                        <div className="slides-row">
                            {getVisibleSlidesObras().map((slide) => (
                                <div className="card-obra" key={slide._i} style={{ boxShadow: marcado != true ? '0px -10px 12px -4px #4cd815' : '0px -10px 12px -4px #9A15D8' }}>

                                    <div >
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
                                        <button className="icon-btn sinopse-btn">
                                            <PiFilmReel className='icon' />
                                            <p style={{ marginLeft: '10px' }}>Sinopse</p>
                                        </button>

                                        <div style={{ display: marcado === true ? '' : 'none' }}>
                                            <button className="icon-btn marcar-btn" style={{ boxShadow: '1px 1px 10px 1px #4cd815' }}>
                                                <RiFilmAiLine className='icon' />
                                                <p style={{ marginLeft: '10px' }}>Marcar</p>
                                            </button>
                                        </div>

                                        <div style={{ display: marcado !== true ? '' : 'none' }}>
                                            <button className="icon-btn desmarcar-btn" style={{ boxShadow: '1px 1px 10px 1px #9A15D8' }}>
                                                <LuScissorsLineDashed className='icon' />
                                                <p style={{ marginLeft: '10px' }}>Desmarcar</p>
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="title-obra"><FaStar style={{ color: '#d8c415ff' }} /> {arredondarNota(slide.notaMedia)}</p>
                                    </div>

                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideObra}>❯</button>
                    </div>
                </div>

                <div className="carrousel-celeDesta">

                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>CELEBRIDADES</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Atores e Atrizes de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-celeDesta">
                        <button className="arrow left" onClick={prevSlideCele}>❮</button>

                        <div className="slides-grid-celeDesta">
                            {getVisibleSlidesCelebridades().map((cele) => (
                                <div className="card-celeDesta" key={cele._i} style={{ boxShadow: marcado != true ? '-8px 0 12px -2px #4cd815' : '-8px 0 12px -2px #9A15D8' }}>

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


                                    <div className="info-celeDesta" style={{ width: '77%' }}>
                                        <p className="title-celeDesta">{cele.nome}</p>

                                        <div className="generos-celeDesta">
                                            {cele.generos.map((g, idx) => (
                                                <span
                                                    className="genero-chip"
                                                    key={idx}
                                                    style={{
                                                        borderColor: generosColors[g] || "#9A15D8",  // fallback caso não exista
                                                    }}
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ width: '8%' }}>
                                        <button className="icon-btn">
                                            <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                                        </button>

                                        <div style={{ marginTop: '10%' }}>
                                            <div style={{ display: marcado === true ? '' : 'none' }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonCheckFill className="icon" style={{ color: '#4cd815' }} />
                                                </button>
                                            </div>
                                            <div style={{ display: marcado != true ? '' : 'none' }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonDashFill className="icon" style={{ color: '#9A15D8' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideCele}>❯</button>
                    </div>
                </div>

                <div className="carrousel-diretDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>DIRETORES</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Diretores de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-diretDesta">
                        <button className="arrow left" onClick={prevSlideDire}>❮</button>

                        <div className="slides-grid-diretDesta">
                            {getVisibleSlidesDiretores().map((dire) => (
                                <div className="card-diretDesta" key={dire._i} style={{ boxShadow: marcado != true ? '-8px 0 12px -2px #4cd815' : '-8px 0 12px -2px #9A15D8' }}>

                                    <div className="foto-wrapper" style={{ width: '15%' }}>
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

                                    <div className="info-diretDesta" style={{ width: '77%' }}>
                                        <p className="title-diretDesta">{dire.nome}</p>

                                        <div className="generos-celeDesta">
                                            {dire.obras.map((g, idx) => (
                                                <span
                                                    className="genero-chip"
                                                    key={idx}
                                                    style={{
                                                        borderColor: "#9A15D8",
                                                    }}
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ width: '8%' }}>
                                        <button className="icon-btn">
                                            <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                                        </button>

                                        <div style={{ marginTop: '10%' }}>
                                            <div style={{ display: marcado === true ? '' : 'none' }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonCheckFill className="icon" style={{ color: '#4cd815' }} />
                                                </button>
                                            </div>
                                            <div style={{ display: marcado != true ? '' : 'none' }}>
                                                <button className="icon-btn">
                                                    <BsFillPersonDashFill className="icon" style={{ color: '#9A15D8' }} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideDire}>❯</button>
                    </div>
                </div>
            </div>
            <div><h1>-</h1></div>
        </div >
    )
}
export default bibliotecaREVISU