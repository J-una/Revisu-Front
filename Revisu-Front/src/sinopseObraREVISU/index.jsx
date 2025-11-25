import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { slideObra } from "../dados/slideObra.js";
import { slideCelebridade } from "../dados/slideCelebridades.js";
import { sinopseObra } from "../dados/sinopseObra.js";
import { generoColors } from "../dados/generoColors.js";
import { Link } from "react-router-dom";

function SinopseObraREVISU() {
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [slidesObra, setSlideObra] = useState(slideObra)
    const [slidesCelebridades, setSlidesCelebridades] = useState(sinopseObra.atores || [])
    const [marcado, setMarcado] = useState(true);
    const generosColors = generoColors;
    const sinopsesObra = sinopseObra;

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

    useEffect(() => {
        setSlidesCelebridades(sinopsesObra.atores || []);
    }, [sinopsesObra]);

    return (
        <div className="sinopse-container">

            <div className="sinopse-image"></div>

            <div className="sinopse-content">
                {/* ====== TOPO / SINOPSE DA OBRA ====== */}
                <div className="sinopse-top">
                    {/* COLUNA ESQUERDA */}
                    <div className="sinopse-left">

                        <div className="poster-card" style={{
                            boxShadow: marcado ? '0px -10px 12px -4px #9A15D8' : '0px -10px 12px -4px #4cd815'
                        }}>
                            <img
                                className="poster-img"
                                src={`https://image.tmdb.org/t/p/w500/${sinopsesObra.imagem}`}
                                alt={sinopsesObra.titulo}
                            />

                            <div className="poster-info">
                                <p className="poster-rating">
                                    <FaStar className="star-icon" />
                                    {arredondarNota(sinopsesObra.notaMedia)}
                                </p>

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

                        {/* estrelas de avaliação (visual apenas) */}
                        <div className="stars-row">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} className="star-outline" />
                            ))}
                        </div>

                    </div>

                    {/* COLUNA DIREITA */}
                    <div className="sinopse-right">
                        <h2 className="sinopse-title">{sinopsesObra.titulo}</h2>

                        <div className="sinopse-block">
                            <p className="sinopse-label">SINOPSE:</p>
                            <p className="sinopse-text">
                                {sinopsesObra.sinopse}
                            </p>
                        </div>

                        {/* chips de gêneros */}
                        <div className="sinopse-generos">
                            <p className="sinopse-label">GÊNEROS:</p>
                            {sinopsesObra.generos?.map((g, idx) => (
                                <span
                                    key={idx}
                                    className="genero-chip"
                                    style={{ borderColor: generosColors[g] || "#9A15D8" }}
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* comentário */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="comentario-box">
                        <label>Comentário:</label>
                        <textarea placeholder="comente o que achou da obra"></textarea>
                        <button className="comentario-btn">Enviar</button>
                    </div>
                </div>

                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>ELENCO</p>
                        <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Atores e Atrizes do filme em destaque.</p>
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
                                        <Link to="/sinopse-obra"> <button className="icon-btn">
                                            <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                                        </button></Link>

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
                        <p>Obras relacionados ao filme em destaque.</p>
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
                                        <Link to="/sinopse-obra"> <button className="icon-btn sinopse-btn">
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
        </div >
    );
}
export default SinopseObraREVISU