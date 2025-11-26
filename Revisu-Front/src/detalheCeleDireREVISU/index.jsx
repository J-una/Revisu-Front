import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar, FaMale, FaFemale } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { slideObra } from "../dados/slideObra.js";
import { slideCelebridade } from "../dados/slideCelebridades.js";
import { detalheCeleDire } from "../dados/detalheCeleDire.js";
import { generoColors } from "../dados/generoColors.js";
import { Link } from "react-router-dom";

function DetalheCeleDireREVISU() {
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [slidesObra, setSlideObra] = useState(slideObra)
    const [slidesCelebridades, setSlidesCelebridades] = useState(slideCelebridade)
    const [marcado, setMarcado] = useState(true);
    const generosColors = generoColors;
    const detalhesCeleDire = detalheCeleDire

    function arredondarNota(nota) {
        const primeiraCasa = Math.floor(nota * 10) / 10;
        const segundaCasa = Math.floor((nota * 100) % 10);

        if (segundaCasa >= 6) {
            return (primeiraCasa + 0.1).toFixed(1);
        }

        return primeiraCasa.toFixed(1);
    }

    function formatarData(dateStr) {
        if (!dateStr) return "Data desconhecida";

        const [ano, mes, dia] = dateStr.split("-");
        return `${dia}/${mes}/${ano}`; // dd/mm/yyyy
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

    return (
        <div className="detalheCeleDire-container">
            <div><h1>-</h1></div>
            <div className="detalheCeleDire-content">
                {/* ====== TOPO / detalheCeleDire DA OBRA ====== */}
                <div className="detalheCeleDire-top">
                    {/* COLUNA ESQUERDA */}
                    <div className="detalheCeleDire-left">
                        <div className="poster-card" style={{
                            boxShadow: marcado ? '0px -10px 12px -4px #9A15D8' : '0px -10px 12px -4px #4cd815'
                        }}>
                            <img
                                className="poster-img"
                                src={`https://image.tmdb.org/t/p/w500/${detalhesCeleDire.profile_path}`}
                                alt={detalhesCeleDire.name}
                            />

                            {/* ÍCONE DE GÊNERO */}
                            <div className="poster-gender">
                                {detalhesCeleDire.gender === 1 && (
                                    <div className="gender-chip female">
                                        <FaFemale className="gender-icon" />
                                        <span>Feminino</span>
                                    </div>
                                )}

                                {detalhesCeleDire.gender === 2 && (
                                    <div className="gender-chip male">
                                        <FaMale className="gender-icon" />
                                        <span>Masculino</span>
                                    </div>
                                )}
                            </div>

                            <div className="poster-info">
                                {/* botão marcar/desmarcar */}
                                <div className="poster-button">
                                    {marcado ? (
                                        <button
                                            className="marcar-toggle marcar-btn"
                                            onClick={() => setMarcado(false)}
                                            style={{ boxShadow: '1px 1px 10px 1px #4cd815' }}
                                        >
                                            <RiFilmAiLine className="icon" />
                                            <p style={{ marginLeft: '10px' }}>Marcar</p>
                                        </button>
                                    ) : (
                                        <button
                                            className="marcar-toggle desmarcar-btn"
                                            onClick={() => setMarcado(true)}
                                            style={{ boxShadow: '1px 1px 10px 1px #9A15D8' }}
                                        >
                                            <LuScissorsLineDashed className="icon" />
                                            <p style={{ marginLeft: '10px' }}>Desmarcar</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUNA DIREITA */}
                    <div className="detalheCeleDire-right">
                        <h2 className="detalheCeleDire-title">{detalhesCeleDire.name}</h2>

                        <div className="detalheCeleDire-block">
                            <p className="detalheCeleDire-label">BIOGRAFIA:</p>
                            <p className="detalheCeleDire-text">
                                {detalhesCeleDire.biography}
                            </p>

                            {/* BLOCO DE DATAS */}
                            <div className="detalheCeleDire-dates">
                                <div className="date-item">
                                    <span className="date-label">Nascimento</span>
                                    <span className="date-value">
                                        {formatarData(detalhesCeleDire.birthday)}
                                    </span>
                                </div>

                                <div className="date-item">
                                    <span className="date-label">Falecimento</span>
                                    <span className="date-value">
                                        {detalhesCeleDire.deathday
                                            ? formatarData(detalhesCeleDire.deathday)
                                            : "Não morreu"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>CELEBRIDADES</p>
                        <p style={{ marginLeft: '10px' }}>RELACIONADAS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Atores e Atrizes que associam com a celebridade em destaque.</p>
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

                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>RELACIONADAS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Obras relacionados a celebridade em destaque.</p>
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
                                        <Link to="/sinopse-obra"> <button className="icon-btn detalheCeleDire-btn">
                                            <PiFilmReel className='icon' />
                                            <p style={{ marginLeft: '10px' }}>Sinopse</p>
                                        </button></Link>

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
            </div>
            <div><h1>-</h1></div>
        </div >
    );
}
export default DetalheCeleDireREVISU