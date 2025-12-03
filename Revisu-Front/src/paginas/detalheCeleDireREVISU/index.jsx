import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel, PiFilmSlateBold } from "react-icons/pi";
import { FaStar, FaMale, FaFemale } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { slideObra } from "../../dados/slideObra.js";
import { slideCelebridade } from "../../dados/slideCelebridades.js";
import { generoColors } from "../../dados/generoColors.js";
import { Link, useNavigate, useParams } from "react-router-dom";

function DetalheCeleDireREVISU() {
    const { idElenco, idUsuario } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [marcado, setMarcado] = useState(true);

    const [detalheCeleDire, setDetalheCeleDire] = useState({
        biografia: "",
        dataNascimento: "",
        dataMorte: "",
        sexo: "",
        nome: "",
        foto: "",
        marcado: null,
    });

    const [relacionados, setRelacionados] = useState({
        obras: [],
        atores: [],
        diretores: [],
    });

    const [slidesObra, setSlideObra] = useState(slideObra)
    const [slidesCelebridades, setSlidesCelebridades] = useState(slideCelebridade)

    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);

    useEffect(() => {
        async function fetchCeleDire() {
            try {

                const resp = await fetch(
                    `https://localhost:44348/api/Recomendacao/pessoa/${idElenco}/${idUsuario}`,
                    {
                        headers: {
                            accept: "application/json",
                        },
                    }
                );

                if (!resp.ok) {
                    throw new Error("Erro ao buscar detalhes da celebridade ou diretor");
                }

                const dados = await resp.json();

                setDetalheCeleDire({
                    biografia: dados.biografia,
                    dataNascimento: dados.dataNascimento,
                    dataMorte: dados.dataMorte,
                    sexo: dados.sexo,
                    nome: dados.nome,
                    foto: dados.foto,
                    marcado: dados.marcado,
                });

            } catch (error) {
                console.error("Erro ao buscar celebridade ou diretor:", error);
            }
        }

        fetchCeleDire();
    }, [idElenco, idUsuario]);

    useEffect(() => {
        async function carregarRelacionados() {
            try {
                setLoading(true); // começa carregando

                const resp = await fetch(
                    `https://localhost:44348/api/Recommendation/similar-elenco/${idElenco}/${idUsuario}`
                );

                const data = await resp.json();

                // se vier array, pega o primeiro; se vier objeto direto, usa ele
                const payload = Array.isArray(data) ? data[0] ?? {} : data ?? {};
                console.log(payload);
                setRelacionados({
                    obras: payload.obrasRelacionadas ?? [],
                    atores: payload.atoresParecidos ?? [],
                    diretores: payload.diretoresParecidos ?? [],
                });
            } catch (e) {
                console.error("Erro ao buscar relacionados:", e);
            } finally {
                setLoading(false); // termina carregamento
            }
        }

        carregarRelacionados();
    }, [idElenco, idUsuario]);

    // console.log(relacionados);

    const obras = relacionados.obras || [];
    const atores = relacionados.atores || [];
    const diretores = relacionados.diretores || [];

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

    return (
        <div className="detalheCeleDire-container">
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
                                src={`https://image.tmdb.org/t/p/w500/${detalheCeleDire.foto}`}
                                alt={detalheCeleDire.nome}
                            />

                            {/* ÍCONE DE GÊNERO */}
                            <div className="poster-gender">
                                {detalheCeleDire.sexo === "Feminino" && (
                                    <div className="gender-chip female">
                                        <FaFemale className="gender-icon" />
                                        <span>Feminino</span>
                                    </div>
                                )}

                                {detalheCeleDire.sexo === "Masculino" && (
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
                        <h2 className="detalheCeleDire-title">{detalheCeleDire.nome}</h2>

                        <div className="detalheCeleDire-block">
                            <p className="detalheCeleDire-label">BIOGRAFIA:</p>
                            <p className="detalheCeleDire-text">
                                {detalheCeleDire.biografia || `Não temos biografia para ${detalheCeleDire.nome} no momento...`}
                            </p>

                            {/* BLOCO DE DATAS */}
                            <div className="detalheCeleDire-dates">
                                <div className="date-item">
                                    <span className="date-label">Nascimento</span>
                                    <span className="date-value">
                                        {formatarData(detalheCeleDire.dataNascimento)}
                                    </span>
                                </div>

                                <div className="date-item">
                                    <span className="date-label">Falecimento</span>
                                    <span className="date-value">
                                        {detalheCeleDire.deathday
                                            ? formatarData(detalheCeleDire.dataMorte)
                                            : "Não morreu"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {celeVisiveis.length === 0 ? (
                    <div className="carrousel-diretDesta">
                        <div className="titulo">
                            <p style={{ color: "#9A15D8", marginLeft: "10px" }}>DIRETORES</p>
                            <p style={{ marginLeft: "10px" }}>EM DESTAQUE</p>
                        </div>

                        <div style={{ marginTop: "10px", marginLeft: "5%" }}>
                            <p>Principais Diretores que associam com o de destaque.</p>
                        </div>

                        <div className="container-carrousel-diretDesta">
                            <button className="arrow left" onClick={prevSlideDire}>
                                ❮
                            </button>

                            <div className="slides-grid-diretDesta">
                                {getVisibleSlidesDiretores().map((dire) => (
                                    <div
                                        className="card-diretDesta"
                                        key={dire._i}
                                        style={{
                                            boxShadow:
                                                marcado === true
                                                    ? "0px -10px 12px -4px #4cd815"
                                                    : "0px -10px 12px -4px #9A15D8",
                                            border:
                                                marcado === true
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

                                        <div style={{ width: "8%" }} onClick={() => navigate(`/detalhe-cele-dire/${dire.idElenco}/${idUsuario}`)}>
                                            <button className="icon-btn">
                                                <BsPersonBoundingBox
                                                    className="icon"
                                                    style={{ color: "#d8c415ff" }}
                                                />
                                            </button>

                                            <div style={{ marginTop: "10%" }}>
                                                <div style={{ display: marcado === true ? "none" : "" }}>
                                                    <button className="icon-btn">
                                                        <BsFillPersonCheckFill
                                                            className="icon"
                                                            style={{ color: "#4cd815" }}
                                                        />
                                                    </button>
                                                </div>
                                                <div style={{ display: marcado !== true ? "none" : "" }}>
                                                    <button className="icon-btn">
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
                        </div>
                    </div>
                ) : (
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
                                {celeVisiveis.map((cele) => (
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
                                                            borderColor: generoColors[g] || "#9A15D8",  // fallback caso não exista
                                                        }}
                                                    >
                                                        {g}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ width: '8%' }}>
                                            <button className="icon-btn" onClick={() => navigate(`/detalhe-cele-dire/${cele.idElenco}/${idUsuario}`)}>
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
                )}


                <div className="carrousel-obrasDesta">
                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>RELACIONADAS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Obras relacionados a celebridade/diretor em destaque.</p>
                    </div>

                    <div className="container-carrousel-obrasDesta">
                        <button className="arrow left" onClick={prevSlideObra}>
                            ❮
                        </button>

                        <div className="slides-row">
                            {getVisibleSlidesObras().map((slide) => (
                                <div
                                    className="card-obra"
                                    key={slide._i}
                                    style={{
                                        boxShadow:
                                            marcado === true
                                                ? "0px -10px 12px -4px #4cd815"
                                                : "0px -10px 12px -4px #9A15D8",
                                        border:
                                            marcado === true
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
                                                    `/sinopse-obra/${slide.idObra || slide.id}/${idUsuario}`
                                                )
                                            }
                                        >
                                            <PiFilmReel className="icon" />
                                            <p style={{ marginLeft: "10px" }}>Sinopse</p>
                                        </button>

                                        <div style={{ display: marcado === true ? "none" : "" }}>
                                            <button
                                                className="icon-btn marcar-btn"
                                                style={{ boxShadow: "1px 1px 10px 1px #4cd815" }}
                                            >
                                                <RiFilmAiLine className="icon" />
                                                <p style={{ marginLeft: "10px" }}>Marcar</p>
                                            </button>
                                        </div>

                                        <div style={{ display: marcado !== true ? "none" : "" }}>
                                            <button
                                                className="icon-btn desmarcar-btn"
                                                style={{ boxShadow: "1px 1px 10px 1px #9A15D8" }}
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
                    </div>
                </div>
            </div>
            <div><h1>-</h1></div>
        </div >
    );
}
export default DetalheCeleDireREVISU