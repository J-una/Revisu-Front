// src/quizREVISU/index.jsx
import { useState, useEffect } from "react";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmSlateBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import "./style.css";
import { generoColors } from "../../dados/generoColors.js";
import { useNavigate } from "react-router-dom";

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
    if (!all || all.length === 0) return [];
    const disponiveis = all.filter((o) => !excludeIds.includes(o.idObra));
    const embaralhado = [...disponiveis].sort(() => Math.random() - 0.5);
    return embaralhado.slice(0, Math.min(count, embaralhado.length));
}

function QuizREVISU() {
    const navigate = useNavigate();
    const [slideObra, setSlideObra] = useState([]);
    const [selecionadas, setSelecionadas] = useState([]);
    const [obrasVisiveis, setObrasVisiveis] = useState([]);

    const [usuario, setUsuario] = useState(() => {
        const usuarioSession = sessionStorage.getItem("usuario");
        if (usuarioSession) {
            const data = JSON.parse(usuarioSession);
            return data.idUsuario;
        }
        return "";
    });

    useEffect(() => {
        async function SlideObraQuiz() {
            try {
                const resp = await fetch(
                    `https://localhost:44348/api/Recomendacao/obras-quiz`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error("Erro ao buscar detalhes da obra");
                }

                const dados = await resp.json();

                setSlideObra(dados || []);
                // já define as 4 primeiras aleatórias aqui
                setObrasVisiveis(getRandomObras(dados, 4));

            } catch (error) {
                console.error("Erro ao buscar obras similares:", error);
            }
        }

        SlideObraQuiz();
    }, []);

    async function salvarNaBibliotecaObraQuiz(idsObras) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/quiz/salvar",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObras: idsObras, // array de GUIDs
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            navigate("/home", { replace: true });
            window.scrollTo(0, 0);
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }


    const maxSelecoes = 10;

    function handleRefresh() {
        setObrasVisiveis(getRandomObras(slideObra, 4, selecionadas));
    }

    function handleSelecionar(idObra) {
        // se já atingiu o máximo ou já selecionou essa, não faz nada
        if (selecionadas.length >= maxSelecoes || selecionadas.includes(idObra)) {
            return;
        }

        const novasSelecionadas = [...selecionadas, idObra];
        setSelecionadas(novasSelecionadas);

        // acabou de bater 10
        if (novasSelecionadas.length === maxSelecoes) {
            salvarNaBibliotecaObraQuiz(novasSelecionadas);
            // se você quiser, pode também travar o refresh ou limpar as obrasVisiveis aqui:
            // setObrasVisiveis([]);
            return;
        }

        // se ainda não chegou em 10, gera mais 4 obras aleatórias
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
                                    <p className="quiz-card-title">{obra.nome}</p>

                                    <div>
                                        <a>{obra.tipo}</a>
                                    </div>
                                    <div className="quiz-card-rating">
                                        <FaStar className="quiz-star-icon" />
                                        <span>{arredondarNota(obra.nota)}</span>
                                    </div>


                                    <div className="generos-celeDesta">
                                        {obra.generos.map((g, idx) => (
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
