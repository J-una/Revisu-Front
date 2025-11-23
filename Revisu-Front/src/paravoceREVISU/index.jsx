import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { Link } from "react-router-dom";

function paravoceREVISU() {
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [marcado, setMarcado] = useState(true);

    const slidesObra = [
        {
            title: "Lilo & Stitch",
            image: "src/IMAGES/Destaque_Lilo&Stich.PNG",
            value: 7.6,
        },
        {
            title: "Missão Impossível - O Acerto Final",
            image: "src/IMAGES/Destaque_MissaoImpossivel.PNG",
            value: 6.6,
        },
        {
            title: "Premonição 6",
            image: "src/IMAGES/Destaque_Premonicao6.PNG",
            value: 5.9,
        },
        {
            title: "Thunderbolts",
            image: "src/IMAGES/Destaque_ThunderBolts.PNG",
            value: 6.8,
        },
        {
            title: "Pânico",
            image: "src/IMAGES/Panico.PNG",
            value: 8.6,
        },
    ]

    const visibleCount4 = 4;

    function nextSlideObra() {
        setIndexCarroselObra((prev) => (prev + 1) % slidesObra.length);
    }

    function prevSlideObra() {
        setIndexCarroselObra((prev) => (prev - 1 + slidesObra.length) % slidesObra.length);
    }

    function getVisibleSlidesObras() {
        return Array.from({ length: visibleCount4 }, (_, i) => {
            const slideIndex = (indexCarroselObra + i) % slidesObra.length;
            return { ...slidesObra[slideIndex], _i: slideIndex };
        });
    }

    return (
        <div className="paravoce-container">

            <div className="paravoce-image"></div>

            <div className="paravoce-content">
                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Principais filmes de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        <button className="arrow left" onClick={prevSlideObra}>❮</button>

                        <div className="slides-row">
                            {getVisibleSlidesObras().map((slide) => (
                                <div className="card-obra" key={slide._i} style={{ boxShadow: marcado != true ? '0px -10px 12px -4px #4cd815' : '0px -10px 12px -4px #9A15D8' }}>

                                    <img
                                        className="slide-imageObras"
                                        src={slide.image}
                                        alt={slide.title}
                                    />

                                    <p className="title-obra">{slide.title}</p>

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


                                    <p className="title-obra"><FaStar style={{ color: '#d8c415ff' }} /> {slide.value}</p>
                                </div>
                            ))}
                        </div>

                        <button className="arrow right" onClick={nextSlideObra}>❯</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default paravoceREVISU