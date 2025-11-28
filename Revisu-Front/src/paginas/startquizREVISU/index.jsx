import "./style.css";
import { PiFilmReel } from "react-icons/pi";
import { RiFilmAiLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function StartquizREVISU() {
    const navigate = useNavigate();

    const handleStart = () => {
        // ajuste a rota do quiz aqui
        navigate("/quiz");
    };

    return (
        <div className="startquiz-container">
            <div className="startquiz-content">
                {/* LADO ESQUERDO - TEXTO */}
                <div className="startquiz-left">
                    <div className="startquiz-main-card">
                        <div className="startquiz-title-row">
                            <PiFilmReel className="startquiz-title-icon" />
                            <p className="startquiz-title">
                                Responda um quiz rapidinho sobre o universo cinematográfico.
                            </p>
                        </div>

                        <p className="startquiz-subtext">
                            Assim o <span>REVISU</span> vai entender melhor o seu gosto e
                            indicar os títulos perfeitos pra você.
                        </p>
                    </div>

                    <button className="startquiz-button" onClick={handleStart}>
                        <RiFilmAiLine className="startquiz-button-icon" />
                        <span>Começar</span>
                    </button>
                </div>

                {/* LADO DIREITO - IMAGEM */}
                <div className="startquiz-right">
                    <div className="startquiz-image-frame">
                        <img
                            src="src/IMAGES/homemSALAcinema.jpg"
                            alt="Pessoa assistindo filme no cinema"
                            className="startquiz-image"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default StartquizREVISU;