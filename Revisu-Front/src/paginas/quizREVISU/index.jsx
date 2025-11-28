// src/quizREVISU/index.jsx
import { useState } from "react";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmSlateBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import "./style.css";
import { slideObra } from "../../dados/slideObra.js";
import { generoColors } from "../../dados/generoColors.js";

function arredondarNota(nota) {
    const primeiraCasa = Math.floor(nota * 10) / 10;
    const segundaCasa = Math.floor((nota * 100) % 10);

    if (segundaCasa >= 6) {
        return (primeiraCasa + 0.1).toFixed(1);
    }

    return primeiraCasa.toFixed(1);
}

// pega N obras aleatórias, ignorando as que já foram selecionadas
function getRandomObras(all, count, excludeIds = []) {
    const disponiveis = all.filter((o) => !excludeIds.includes(o.idObra));
    const embaralhado = [...disponiveis].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, Math.min(count, embaralhado.length));
}

function QuizREVISU() {
    const [selecionadas, setSelecionadas] = useState([]); // ids
    const [obrasVisiveis, setObrasVisiveis] = useState(() =>
        getRandomObras(slideObra, 4)
    );
    const generosColors = generoColors;
    const maxSelecoes = 10;

    function handleRefresh() {
        setObrasVisiveis(getRandomObras(slideObra, 4, selecionadas));
    }

    function handleSelecionar(idObra) {
        // já chegou no limite ou já selecionou essa obra
        if (selecionadas.length >= maxSelecoes || selecionadas.includes(idObra)) {
            return;
        }

        const novasSelecionadas = [...selecionadas, idObra];
        setSelecionadas(novasSelecionadas);

        // troca o “conjunto” por outras 4
        const novasObras = getRandomObras(slideObra, 4, novasSelecionadas);
        setObrasVisiveis(novasObras);
    }

    return (
        <div className="quiz-container">
            <div>
                <h1>-</h1>
            </div>

            <div className="quiz-content">
                {/* topo: título + contador */}
                <div className="quiz-header-row">
                    <h1 className="quiz-title">QUIZ</h1>
                </div>

                {/* instrução + botão de novas recomendações */}
                <div className="quiz-top-row">
                    <div className="quiz-instruction-card" style={{ display: 'flex' }}>
                        <div className="footer-clapper">
                            <PiFilmSlateBold className="footer-clapper-icon" />
                        </div>
                        <p className="quiz-instruction-title">
                            Dentre os filmes e séries sugeridos, indique apenas um de sua preferência.
                        </p>
                    </div>

                    <div>
                        <div style={{ display: 'none' }} className="footer-clapper">
                            <h1>-</h1>
                        </div>
                    </div>
                    <div className="quiz-counter" style={{ height: "50px", marginTop: "6%" }} >
                        <span>Selecionadas</span>
                        <strong>
                            {selecionadas.length}/{maxSelecoes}
                        </strong>
                    </div>
                    <button
                        type="button"
                        className="quiz-refresh-card"
                        onClick={handleRefresh}
                    >
                        <span>Gerar outras recomendações</span>
                        <LuRefreshCcw className="quiz-refresh-icon" />
                    </button>

                </div>

                {/* grade de 4 cards */}
                <div className="quiz-grid">
                    {obrasVisiveis.map((obra) => {
                        const jaSelecionada = selecionadas.includes(obra.idObra);
                        const disabled =
                            jaSelecionada || selecionadas.length >= maxSelecoes;

                        return (
                            <div key={obra.idObra} className="quiz-card">
                                <div className="quiz-card-image-frame">
                                    <img
                                        className="quiz-card-image"
                                        src={`https://image.tmdb.org/t/p/w500/${obra.imagem}`}
                                        alt={obra.titulo}
                                    />
                                </div>

                                <div className="quiz-card-info">
                                    <p className="quiz-card-title">{obra.titulo}</p>

                                    <div className="quiz-card-rating">
                                        <FaStar className="quiz-star-icon" />
                                        <span>{arredondarNota(obra.notaMedia)}</span>
                                    </div>


                                    <div className="generos-celeDesta">
                                        {obra.generos.map((g, idx) => (
                                            <span
                                                className="genero-chip"
                                                key={idx}
                                                style={{
                                                    borderColor: generosColors[g] || "#9A15D8",
                                                }}
                                            >
                                                {g}
                                            </span>
                                        ))}
                                    </div>


                                    <button
                                        type="button"
                                        className={`quiz-select-btn ${jaSelecionada ? "quiz-select-btn--selected" : ""
                                            }`}
                                        onClick={() => handleSelecionar(obra.idObra)}
                                        disabled={disabled}
                                    >
                                        <RiFilmAiLine className="quiz-select-icon" />
                                        <span>{jaSelecionada ? "Selecionado" : "Selecionar"}</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <h1>-</h1>
            </div>
        </div>
    );
}

export default QuizREVISU;
