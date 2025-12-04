import { useState, useEffect, useMemo } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel, PiFilmSlateBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import { CiImageOff } from "react-icons/ci";
import './style.css'
import { generoColors } from "../../dados/generoColors.js";
import { useNavigate } from "react-router-dom";

function bibliotecaREVISU() {
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [usuario, setUsuario] = useState(() => {
        const usuarioSession = sessionStorage.getItem("usuario");
        if (usuarioSession) {
            const data = JSON.parse(usuarioSession);
            return data.idUsuario; // pega somente o GUID do usuário
        }
        return ""; // valor padrão se não houver ninguém logado
    });
    const [biblioteca, setBiblioteca] = useState({
        obras: [],
        atores: [],
        diretores: [],
    });

    useEffect(() => {
        async function carregarBiblioteca() {
            try {
                setLoading(true); // começa carregando

                const resp = await fetch(
                    `https://localhost:44348/api/Recomendacao/listar-biblioteca/${usuario}`
                );

                const data = await resp.json();

                // se vier array, pega o primeiro; se vier objeto direto, usa ele
                const payload = Array.isArray(data) ? data[0] ?? {} : data ?? {};

                setBiblioteca({
                    obras: payload.obras ?? [],
                    atores: payload.atores ?? [],
                    diretores: payload.diretores ?? [],
                });
            } catch (e) {
                console.error("Erro ao buscar biblioteca:", e);
            } finally {
                setLoading(false); // termina carregamento
            }
        }

        carregarBiblioteca();
    }, []);

    const obras = biblioteca.obras || [];
    const atores = biblioteca.atores || [];
    const diretores = biblioteca.diretores || [];

    const generoCountMap = useMemo(() => {
        const map = {};

        const acumulaGeneros = (lista) => {
            lista.forEach((item) => {
                (item.generos || []).forEach((g) => {
                    map[g] = (map[g] || 0) + 1;
                });
            });
        };

        acumulaGeneros(obras);
        acumulaGeneros(atores);

        return map;
    }, [obras, atores, diretores]);

    const generoColorsBiblioteca = [
        { genero: "Ação", cor: "#E74C3C" },
        { genero: "Aventura", cor: "#F39C12" },
        { genero: "Animação", cor: "#9B59B6" },
        { genero: "Comédia", cor: "#d6af12ff" },
        { genero: "Crime", cor: "#2C3E50" },
        { genero: "Documentário", cor: "#8E44AD" },
        { genero: "Drama", cor: "#5D6D7E" },
        { genero: "Família", cor: "#7E5D7E" },
        { genero: "Fantasia", cor: "#23c240ff" },
        { genero: "História", cor: "#E67E22" },
        { genero: "Terror", cor: "#A568C8" },
        { genero: "Música", cor: "#59B680" },
        { genero: "Mistério", cor: "#C014B5" },
        { genero: "Romance", cor: "#B92F2F" },
        { genero: "Ficção científica", cor: "#00BCD4" },
        { genero: "Cinema TV", cor: "#3498DB" },
        { genero: "Thriller", cor: "#17F5E2" },
        { genero: "Guerra", cor: "#26A93C" },
        { genero: "Faroeste", cor: "#D35400" },
        { genero: "Ação e Aventura", cor: "#688EC8" },
        { genero: "Infantil", cor: "#F1C40F" },
        { genero: "Notícias", cor: "#95A5A6" },
        { genero: "Reality", cor: "#FFFFFF" },
        { genero: "Ficção Científica e Fantasia", cor: "#68C879" },
        { genero: "Novela", cor: "#E69A9A" },
        { genero: "Talk Show", cor: "#EEFF00" },
        { genero: "Guerra e Política", cor: "#566573" }
    ];

    const generoColorsSorted = useMemo(() => {
        return [...generoColorsBiblioteca]
            .filter(g => generoCountMap[g.genero]) // só gêneros com pelo menos 1 ocorrência
            .sort((a, b) => (generoCountMap[b.genero] || 0) - (generoCountMap[a.genero] || 0));
    }, [generoColorsBiblioteca, generoCountMap]);

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

    // ====== CARROSSEL OBRAS ==========
    function nextSlideObra() {
        const total = obras.length;
        if (!total) return;
        setIndexCarroselObra((prev) => (prev + 1) % total);
    }

    function prevSlideObra() {
        const total = obras.length;
        if (!total) return;
        setIndexCarroselObra((prev) => (prev - 1 + total) % total);
    }

    function getVisibleSlidesObras() {
        if (!obras.length) return [];
        const qtd = Math.min(visibleCount4, obras.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselObra + i) % obras.length;
            return { ...obras[slideIndex], _i: slideIndex };
        });
    }

    const obraVisiveis = getVisibleSlidesObras();

    // ====== CARROSSEL CELEBRIDADES (atores) ==========
    function nextSlideCele() {
        const total = atores.length;
        if (!total) return;
        setIndexCarroselCele((prev) => (prev + stepCele) % total);
    }

    function prevSlideCele() {
        const total = atores.length;
        if (!total) return;
        setIndexCarroselCele((prev) => (prev - stepCele + total) % total);
    }

    function getVisibleSlidesCelebridades() {
        if (!atores.length) return [];
        const qtd = Math.min(visibleCount4, atores.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselCele + i) % atores.length;
            return { ...atores[slideIndex], _i: slideIndex };
        });
    }

    const celeVisiveis = getVisibleSlidesCelebridades();

    // ====== CARROSSEL DIRETORES ==========
    function nextSlideDire() {
        const total = diretores.length;
        if (!total) return;
        setIndexCarroselDire((prev) => (prev + 1) % total);
    }

    function prevSlideDire() {
        const total = diretores.length;
        if (!total) return;
        setIndexCarroselDire((prev) => (prev - 1 + total) % total);
    }

    function getVisibleSlidesDiretores() {
        if (!diretores.length) return [];
        const qtd = Math.min(visibleCount2, diretores.length);
        return Array.from({ length: qtd }, (_, i) => {
            const slideIndex = (indexCarroselDire + i) % diretores.length;
            return { ...diretores[slideIndex], _i: slideIndex };
        });
    }

    const direVisiveis = getVisibleSlidesDiretores();

    async function salvarNaBibliotecaObra(idObra) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Salvar-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: idObra,
                        idElenco: null,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                obras: prev.obras.map(o => {
                    const oid = o.idObra || o.id;
                    if (oid === idObra) {
                        return { ...o, marcado: true };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }

    async function salvarNaBibliotecaCele(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Salvar-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                atores: prev.atores.map(o => {
                    const oid = o.idElenco || o.id;
                    if (oid === idElenco) {
                        return { ...o, marcado: true };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function salvarNaBibliotecaDire(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Salvar-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao salvar na biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                diretores: prev.diretores.map(o => {
                    const oid = o.idElenco || o.id;
                    if (oid === idElenco) {
                        return { ...o, marcado: true };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function removerNaBibliotecaObra(idObra) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Remover-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: idObra,
                        idElenco: null,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover da biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                obras: prev.obras.map(o => {
                    const oid = o.idObra || o.id;
                    if (oid === idObra) {
                        return { ...o, marcado: false };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function removerNaBibliotecaCele(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Remover-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover da biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                atores: prev.atores.map(o => {
                    const oid = o.idElenco || o.id;
                    if (oid === idElenco) {
                        return { ...o, marcado: false };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }
    async function removerNaBibliotecaDire(idElenco) {
        try {
            const response = await fetch(
                "https://localhost:44348/api/Recomendacao/Remover-Biblioteca",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                    body: JSON.stringify({
                        idUsuario: usuario,
                        idObra: null,
                        idElenco: idElenco,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Erro ao remover da biblioteca");
            }

            setBiblioteca(prev => ({
                ...prev,
                diretores: prev.diretores.map(o => {
                    const oid = o.idElenco || o.id;
                    if (oid === idElenco) {
                        return { ...o, marcado: false };
                    }
                    return o;
                }),
            }));
        } catch (erro) {
            console.error("ERRO AO ENVIAR POST:", erro);
        }
    }

    return (
        <div className="biblioteca-container">
            <div><h1>-</h1></div>

            {/* OVERLAY DE CARREGAMENTO */}
            {loading && (
                <div className="home-loading-overlay">
                    <div className="home-loading-inner">
                        <PiFilmSlateBold className="home-loading-icon" />
                        <p className="home-loading-text">Carregando Recomendações...</p>
                    </div>
                </div>
            )}

            <div className="biblioteca-content">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className='tituloBiblioteca'>
                        <h1>MINHA BIBLIOTECA</h1>
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
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>OBRAS</p>
                        <p style={{ marginLeft: "10px" }}>SELECIONADAS</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Principais obras que você selecionou.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        {obraVisiveis.length === 0 ? (
                            <p className="sem-elenco">
                                Nenhuma celebridade selecionada...
                            </p>
                        ) : (
                            <div>
                                <button className="arrow left" onClick={prevSlideObra}>
                                    ❮
                                </button>

                                <div className="slides-row">
                                    {obraVisiveis.map((slide) => (
                                        <div
                                            className="card-obra"
                                            key={slide._i}
                                            style={{
                                                boxShadow:
                                                    slide.marcado === true
                                                        ? "0px -10px 12px -4px #4cd815"
                                                        : "0px -10px 12px -4px #9A15D8",
                                                border:
                                                    slide.marcado === true
                                                        ? "2px solid #4cd815"
                                                        : "2px solid #9a15d8",
                                            }}
                                        >
                                            <div>
                                                <img
                                                    className="slide-imageObras"
                                                    src={`https://image.tmdb.org/t/p/w500/${slide.imagem}`}
                                                    alt={slide.nome || slide.titulo}
                                                />
                                            </div>

                                            <div>
                                                <p className="title-obra">{slide.nome || slide.titulo}</p>
                                            </div>

                                            <div>
                                                <div>
                                                    <p>{slide.tipo === "Filme" ? "Filme" : "Série"}</p>
                                                </div>
                                                <button
                                                    className="icon-btn sinopse-btn"
                                                    onClick={() =>
                                                        navigate(
                                                            `/sinopse-obra/${slide.idObra || slide.id}/${usuario}`
                                                        )
                                                    }
                                                >
                                                    <PiFilmReel className="icon" />
                                                    <p style={{ marginLeft: "10px" }}>Sinopse</p>
                                                </button>

                                                <div style={{ display: slide.marcado === true ? "none" : "" }}>
                                                    <button
                                                        className="icon-btn marcar-btn"
                                                        style={{ boxShadow: "1px 1px 10px 1px #4cd815" }}
                                                        onClick={() => salvarNaBibliotecaObra(slide.idObra || slide.id)}
                                                    >
                                                        <RiFilmAiLine className="icon" />
                                                        <p style={{ marginLeft: "10px" }}>Marcar</p>
                                                    </button>
                                                </div>

                                                <div style={{ display: slide.marcado === false ? "none" : "" }}>
                                                    <button
                                                        className="icon-btn desmarcar-btn"
                                                        style={{ boxShadow: "1px 1px 10px 1px #9A15D8" }}
                                                        onClick={() => removerNaBibliotecaObra(slide.idObra || slide.id)}
                                                    >
                                                        <LuScissorsLineDashed className="icon" />
                                                        <p style={{ marginLeft: "10px" }}>Desmarcar</p>
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <p className="title-obra">
                                                    <FaStar style={{ color: "#d8c415ff" }} />{" "}
                                                    {arredondarNota(slide.notaMedia)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="arrow right" onClick={nextSlideObra}>
                                    ❯
                                </button>
                            </div>)}
                    </div>
                </div>

                <div className="carrousel-celeDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>CELEBRIDADES</p>
                        <p style={{ marginLeft: "10px" }}>SELECIONADAS</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Principais celebridades que você selecionou.</p>
                    </div>

                    <div className="container-carrousel-celeDesta">
                        {celeVisiveis.length === 0 ? (
                            <p className="sem-elenco">
                                Nenhuma celebridade selecionada...
                            </p>
                        ) : (
                            <div>
                                <button className="arrow left" onClick={prevSlideCele}>
                                    ❮
                                </button>

                                <div className="slides-grid-celeDesta">
                                    {celeVisiveis.map((cele) => (
                                        <div
                                            className="card-celeDesta"
                                            key={cele._i}
                                            style={{
                                                boxShadow:
                                                    cele.marcado === true
                                                        ? "0px -10px 12px -4px #4cd815"
                                                        : "0px -10px 12px -4px #9A15D8",
                                                border:
                                                    cele.marcado === true
                                                        ? "2px solid #4cd815"
                                                        : "2px solid #9a15d8",
                                            }}
                                        >
                                            <div className="foto-wrapper">
                                                {cele.imagem || cele.foto ? (
                                                    <img
                                                        className="slide-imageceleDesta"
                                                        src={`https://image.tmdb.org/t/p/w500/${cele.imagem || cele.foto
                                                            }`}
                                                        alt={cele.nome}
                                                    />
                                                ) : (
                                                    <div className="foto-fallback">
                                                        <CiImageOff className="fallback-icon" />
                                                        <p className="fallback-text">Sem foto</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info-celeDesta" style={{ width: "77%" }}>
                                                <p className="title-celeDesta">{cele.nome}</p>

                                                <div className="generos-celeDesta">
                                                    {(cele.generos || []).map((g, idx) => (
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

                                            <div style={{ width: "8%" }}>
                                                <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${cele.idElenco}/${usuario}`)}>
                                                    <BsPersonBoundingBox
                                                        className="icon"
                                                        style={{ color: "#d8c415ff" }}
                                                    />
                                                </button>

                                                <div style={{ marginTop: "10%" }}>
                                                    <div style={{ display: cele.marcado === true ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => salvarNaBibliotecaCele(cele.idElenco)}>
                                                            <BsFillPersonCheckFill
                                                                className="icon"
                                                                style={{ color: "#4cd815" }}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div style={{ display: cele.marcado === false ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => removerNaBibliotecaCele(cele.idElenco)}>
                                                            <BsFillPersonDashFill
                                                                className="icon"
                                                                style={{ color: "#9A15D8" }}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="arrow right" onClick={nextSlideCele}>
                                    ❯
                                </button>
                            </div>)}
                    </div>
                </div>

                <div className="carrousel-diretDesta">
                    <div className="titulo">
                        <p style={{ color: "#9A15D8", marginLeft: "10px" }}>DIRETORES</p>
                        <p style={{ marginLeft: "10px" }}>SELECIONADAS</p>
                    </div>

                    <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                        <p>Principais diretores que você selecionou.</p>
                    </div>

                    <div className="container-carrousel-diretDesta">
                        {direVisiveis.length === 0 ? (
                            <p className="sem-elenco">
                                Nenhum diretor selecionado...
                            </p>
                        ) : (
                            <div>
                                <button className="arrow left" onClick={prevSlideDire}>
                                    ❮
                                </button>

                                <div className="slides-grid-diretDesta">
                                    {direVisiveis.map((dire) => (
                                        <div
                                            className="card-diretDesta"
                                            key={dire._i}
                                            style={{
                                                boxShadow:
                                                    dire.marcado === true
                                                        ? "0px -10px 12px -4px #4cd815"
                                                        : "0px -10px 12px -4px #9A15D8",
                                                border:
                                                    dire.marcado === true
                                                        ? "2px solid #4cd815"
                                                        : "2px solid #9a15d8",
                                            }}
                                        >
                                            <div className="foto-wrapper" style={{ width: "15%" }}>
                                                {dire.imagem || dire.foto ? (
                                                    <img
                                                        className="slide-imageceleDesta"
                                                        src={`https://image.tmdb.org/t/p/w500/${dire.imagem || dire.foto
                                                            }`}
                                                        alt={dire.nome}
                                                    />
                                                ) : (
                                                    <div className="foto-fallback">
                                                        <CiImageOff className="fallback-icon" />
                                                        <p className="fallback-text">Sem foto</p>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="info-diretDesta" style={{ width: "77%" }}>
                                                <p className="title-diretDesta">{dire.nome}</p>

                                                <div className="generos-celeDesta">
                                                    {(dire.obras || []).map((g, idx) => (
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

                                            <div style={{ width: "8%" }}>
                                                <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${dire.idElenco}/${usuario}`)}>
                                                    <BsPersonBoundingBox
                                                        className="icon"
                                                        style={{ color: "#d8c415ff" }}
                                                    />
                                                </button>

                                                <div style={{ marginTop: "10%" }}>
                                                    <div style={{ display: dire.marcado === true ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => salvarNaBibliotecaDire(dire.idElenco)}>
                                                            <BsFillPersonCheckFill
                                                                className="icon"
                                                                style={{ color: "#4cd815" }}
                                                            />
                                                        </button>
                                                    </div>
                                                    <div style={{ display: dire.marcado === false ? "none" : "" }}>
                                                        <button className="icon-btn"
                                                            onClick={() => removerNaBibliotecaDire(dire.idElenco)}>
                                                            <BsFillPersonDashFill
                                                                className="icon"
                                                                style={{ color: "#9A15D8" }}
                                                            />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button className="arrow right" onClick={nextSlideDire}>
                                    ❯
                                </button>
                            </div>)}
                    </div>
                </div>
            </div>
            <div><h1>-</h1></div>
        </div >
    )
}
export default bibliotecaREVISU