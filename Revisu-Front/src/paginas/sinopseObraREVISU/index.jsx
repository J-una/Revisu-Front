import { useState, useEffect } from 'react';
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css';
import { generoColors } from "../../dados/generoColors.js";
import { slideObra } from "../../dados/slideObra.js";
import { Link, useParams } from "react-router-dom";
import { getObraById } from "../../services/obraService";

function sinopseObraREVISU() {
    const { idObra } = useParams();
    const [loading, setLoading] = useState(true);
    const [marcado, setMarcado] = useState(true);

    const [sinopsesObra, setSinopsesObra] = useState({
        titulo: "",
        sinopse: "",
        imagem: "",
        notaMedia: 0,
        generos: [],
        atores: []
    });

    const [slidesObra, setSlideObra] = useState(slideObra);
    const [slidesCelebridades, setSlidesCelebridades] = useState([]);

    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);

    // ======================== FETCH ========================
    useEffect(() => {

        async function fetchObra() {
            try {
                setLoading(true);
                const dados = await getObraById(idObra);

                setSinopsesObra({
                    titulo: dados.titulo,
                    sinopse: dados.sinopse,
                    imagem: dados.imagem,
                    notaMedia: dados.notaMedia,
                    generos: dados.generos || [],
                    atores: dados.atores || []
                });

                setSlidesCelebridades(dados.atores || []);
                // setSlideObra(dados.obrasRelacionadas || []);
            } catch (error) {
                console.error("Erro ao buscar obra:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchObra();
    }, [idObra]);

    // ======================== PROTEÇÕES ========================
    if (loading) return <h2 style={{ textAlign: "center" }}>Carregando...</h2>;
    if (!sinopsesObra) return <h2>Obra não encontrada.</h2>;

    // ======================== FUNÇÕES ========================
    function arredondarNota(nota) {
        if (!nota) return "0.0";
        const primeiraCasa = Math.floor(nota * 10) / 10;
        const segundaCasa = Math.floor((nota * 100) % 10);
        return segundaCasa >= 6 ? (primeiraCasa + 0.1).toFixed(1) : primeiraCasa.toFixed(1);
    }

    const visibleCount4 = 4;
    const visibleCount2 = 2;
    const stepCele = 2;

    function nextSlideObra() {
        if (slidesObra.length === 0) return;
        setIndexCarroselObra((prev) => (prev + 1) % slidesObra.length);
    }

    function prevSlideObra() {
        if (slidesObra.length === 0) return;
        setIndexCarroselObra((prev) => (prev - 1 + slidesObra.length) % slidesObra.length);
    }

    function nextSlideCele() {
        if (slidesCelebridades.length === 0) return;
        setIndexCarroselCele((prev) => (prev + stepCele) % slidesCelebridades.length);
    }

    function prevSlideCele() {
        if (slidesCelebridades.length === 0) return;
        setIndexCarroselCele((prev) => (prev - stepCele + slidesCelebridades.length) % slidesCelebridades.length);
    }

    function getVisibleSlidesObras() {
        if (slidesObra.length === 0) return [];
        return Array.from({ length: visibleCount4 }, (_, i) => {
            const slideIndex = (indexCarroselObra + i) % slidesObra.length;
            return { ...slidesObra[slideIndex], _i: slideIndex };
        });
    }

    function getVisibleSlidesCelebridades() {
        if (slidesCelebridades.length === 0) return [];
        return Array.from({ length: visibleCount2 }, (_, i) => {
            const slideIndex = (indexCarroselCele + i) % slidesCelebridades.length;
            return { ...slidesCelebridades[slideIndex], _i: slideIndex };
        });
    }

    // ======================== JSX ========================
    return (
        <div className="sinopse-container">
            <div><h1>-</h1></div>
            <div className="sinopse-content">

                {/* ====== TOPO ====== */}
                <div className="sinopse-top">

                    {/* POSTER */}
                    <div className="sinopse-left">
                        <div className="poster-card"
                            style={{
                                boxShadow: marcado == true ? '0px -10px 12px -4px #4cd815' : '0px -10px 12px -4px #9A15D8'
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

                                <div className="poster-button">
                                    {marcado === true ? (
                                        <button className="marcar-toggle desmarcar-btn"
                                            onClick={() => setMarcado(true)}
                                            style={{ boxShadow: '1px 1px 10px 1px #9A15D8' }}>
                                            <LuScissorsLineDashed className="icon" />
                                            <p style={{ marginLeft: '10px' }}>Desmarcar</p>
                                        </button>
                                    ) : (
                                        <button className="marcar-toggle marcar-btn"
                                            onClick={() => setMarcado(false)}
                                            style={{ boxShadow: '1px 1px 10px 1px #4cd815' }}>
                                            <RiFilmAiLine className="icon" />
                                            <p style={{ marginLeft: '10px' }}>Marcar</p>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* stars */}
                        <div className="stars-row">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar key={i} className="star-outline" />
                            ))}
                        </div>
                    </div>

                    {/* TEXTO */}
                    <div className="sinopse-right">
                        <h2 className="sinopse-title">{sinopsesObra.titulo}</h2>

                        <div className="sinopse-block">
                            <p className="sinopse-label">SINOPSE:</p>
                            <p className="sinopse-text">{sinopsesObra.sinopse}</p>
                        </div>

                        <div className="sinopse-generos">
                            <p className="sinopse-label">GÊNEROS:</p>
                            {sinopsesObra.generos.map((g, idx) => (
                                <span key={idx}
                                    className="genero-chip"
                                    style={{ borderColor: generoColors[g] || "#9A15D8" }}>
                                    {g}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ====== COMENTÁRIOS ====== */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="comentario-box">
                        <label>Comentário:</label>
                        <textarea placeholder="comente o que achou da obra"></textarea>
                        <button className="comentario-btn">Enviar</button>
                    </div>
                </div>

                {/* ====== ELENCO ====== */}
                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>ELENCO</p>
                        <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Atores e Atrizes da obra em destaque.</p>
                    </div>

                    <div className="container-carrousel-celeDesta">
                        <button className="arrow left" onClick={prevSlideCele}>❮</button>

                        <div className="slides-grid-celeDesta">
                            {getVisibleSlidesCelebridades().map((cele) => (
                                <div className="card-celeDesta" key={cele._i}>
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

                                    <div className="info-celeDesta">
                                        <p className="title-celeDesta">{cele.nome}</p>

                                        <div className="generos-celeDesta">
                                            {cele.generos.map((g, idx) => (
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

                                    <div>
                                        <button className="icon-btn">
                                            <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideCele}>❯</button>
                    </div>
                </div>


                {/* ====== OBRAS RELACIONADAS ====== */}
                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>EM DESTAQUE</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Principais obras de acordo a de destaque.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        <button className="arrow left" onClick={prevSlideObra}>❮</button>

                        <div className="slides-row">
                            {getVisibleSlidesObras().map((slide) => (
                                <div className="card-obra" key={slide._i} style={{
                                    boxShadow: marcado == true ? '0px -10px 12px -4px #4cd815' : '0px -10px 12px -4px #9A15D8',
                                    border: marcado == true ? '2px solid #4cd815' : '2px solid #9a15d8'
                                }}>

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
                                        <div>
                                            <button
                                                className="icon-btn sinopse-btn"
                                                onClick={() => navigate("/sinopse-obra/" + slide.idObra)}
                                            >
                                                <PiFilmReel className="icon" />
                                                <p style={{ marginLeft: "10px" }}>Sinopse</p>
                                            </button>
                                        </div>

                                        <div style={{ display: marcado === true ? 'none' : '' }}>
                                            <button className="icon-btn marcar-btn" style={{ boxShadow: '1px 1px 10px 1px #4cd815' }}>
                                                <RiFilmAiLine className='icon' />
                                                <p style={{ marginLeft: '10px' }}>Marcar</p>
                                            </button>
                                        </div>

                                        <div style={{ display: marcado !== true ? 'none' : '' }}>
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
        </div>
    );
}

export default sinopseObraREVISU;
