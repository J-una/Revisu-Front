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
            <div><h1>-</h1></div>
            <div className="paravoce-content">

            </div>
            <div><h1>-</h1></div>
        </div >
    )
}

export default paravoceREVISU