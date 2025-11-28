import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { slideObra } from "../../dados/slideObra.js";
import { slideCelebridade } from "../../dados/slideCelebridades.js";
import { slideDiretore } from "../../dados/slideDiretor.js";
import { generoColors } from "../../dados/generoColors.js";
import { useNavigate } from "react-router-dom";

function sobrenosREVISU() {

    return (
        <div className="sobrenos-container">
            <div><h1>-</h1></div>
            <div className="sobrenos-content">

            </div>
            <div><h1>-</h1></div>
        </div>
    );
}
export default sobrenosREVISU