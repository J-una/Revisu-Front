// src/homeREVISU/index.jsx
import { useState, useEffect } from "react";
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel, PiFilmSlateBold } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import {
  BsFillPersonCheckFill,
  BsFillPersonDashFill,
  BsPersonBoundingBox,
} from "react-icons/bs";
import "./style.css";
import { generoColors } from "../../dados/generoColors.js";
import { useNavigate } from "react-router-dom";

function HomeREVISU() {
  const [indexCarroselHome, setIndexCarroselHome] = useState(0);
  const [indexCarroselObra, setIndexCarroselObra] = useState(0);
  const [indexCarroselCele, setIndexCarroselCele] = useState(0);
  const [indexCarroselDire, setIndexCarroselDire] = useState(0);

  const [populares, setPopulares] = useState({
    obras: [],
    atores: [],
    diretores: [],
  });

  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(() => {
    const usuarioSession = sessionStorage.getItem("usuario");
    if (usuarioSession) {
      const data = JSON.parse(usuarioSession);
      return data.idUsuario; // pega somente o GUID do usuário
    }
    return ""; // valor padrão se não houver ninguém logado
  });
  const navigate = useNavigate();

  function arredondarNota(nota) {
    if (nota == null) return "-";
    const primeiraCasa = Math.floor(nota * 10) / 10;
    const segundaCasa = Math.floor((nota * 100) % 10);

    if (segundaCasa >= 6) {
      return (primeiraCasa + 0.1).toFixed(1);
    }

    return primeiraCasa.toFixed(1);
  }

  const slidesHome = [
    {
      title: "REVISU",
      text: `Descubra filmes, séries e especiais feitos para o seu gosto.
Com o REVISU, você encontra desde grandes sucessos até produções menos conhecidas,
sempre com recomendações pensadas no que você realmente gosta de assistir.`,
      image: "src/IMAGES/filmeCarrosel_cinema.jpg",
    },
    {
      title: "Recomendações inteligentes para você",
      text: `Cansado de perder tempo procurando o que ver?
O REVISU analisa suas preferências, nota média das obras e destaque do público
para sugerir opções que têm tudo a ver com o seu momento.`,
      image: "src/IMAGES/filmeCarrosel_suspense.jpg",
    },
    {
      title: "Encontre sua próxima maratona",
      text: `Filtre por gênero, tipo de obra, atores, diretores e muito mais.
Transforme suas noites de filme em experiências melhores com indicações certeiras
e um catálogo organizado do seu jeito.`,
      image: "src/IMAGES/filmeCarrosel_varios.jpg",
    },
  ];

  const visibleCount4 = 4;
  const visibleCount2 = 2;
  const stepCele = 2;

  // ====== BUSCAR POPULARES NO BACK ==========
  useEffect(() => {
    async function carregarPopulares() {
      try {
        setLoading(true); // começa carregando

        const resp = await fetch(
          "https://localhost:44348/api/Recomendacao/listar-populares"
        );

        const data = await resp.json();

        // se vier array, pega o primeiro; se vier objeto direto, usa ele
        const payload = Array.isArray(data) ? data[0] ?? {} : data ?? {};

        setPopulares({
          obras: payload.obras ?? [],
          atores: payload.atores ?? [],
          diretores: payload.diretores ?? [],
        });
      } catch (e) {
        console.error("Erro ao buscar populares:", e);
      } finally {
        setLoading(false); // termina carregamento
      }
    }

    carregarPopulares();
  }, []);

  const obras = populares.obras || [];
  const atores = populares.atores || [];
  const diretores = populares.diretores || [];

  // ====== CARROSSEL HOME (texto + imagem) ==========
  function nextSlideHome() {
    setIndexCarroselHome((prev) => (prev + 1) % slidesHome.length);
  }

  function prevSlideHome() {
    setIndexCarroselHome((prev) => (prev - 1 + slidesHome.length) % slidesHome.length);
  }

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

  // ====== AUTO PLAY DO CARROSSEL PRINCIPAL ==========
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlideHome();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div>
        <h1>-</h1>
      </div>

      {/* OVERLAY DE CARREGAMENTO */}
      {loading && (
        <div className="home-loading-overlay">
          <div className="home-loading-inner">
            <PiFilmSlateBold className="home-loading-icon" />
            <p className="home-loading-text">Carregando Recomendações...</p>
          </div>
        </div>
      )}

      <div className="home-content">
        {/* CARROSSEL PRINCIPAL */}
        <div className="carrousel-container">
          <button className="arrow left" onClick={prevSlideHome}>
            ❮
          </button>

          <div className="slide">
            <div className="text-block">
              <h2>{slidesHome[indexCarroselHome].title}</h2>
              <p>{slidesHome[indexCarroselHome].text}</p>
            </div>

            <img
              className="slide-image"
              src={slidesHome[indexCarroselHome].image}
              alt="slide"
              style={{ borderRadius: "60px" }}
            />
          </div>

          <button className="arrow right" onClick={nextSlideHome}>
            ❯
          </button>
        </div>

        {/* ===== OBRAS EM DESTAQUE ===== */}
        <div className="carrousel-obrasDesta">
          <div className="titulo">
            <p style={{ color: "#9A15D8", marginLeft: "10px" }}>OBRAS</p>
            <p style={{ marginLeft: "10px" }}>EM DESTAQUE</p>
          </div>

          <div style={{ marginTop: "10px", marginLeft: "5%" }}>
            <p>Principais obras de acordo com telespectadores.</p>
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
                      >
                        <RiFilmAiLine className="icon" />
                        <p style={{ marginLeft: "10px" }}>Marcar</p>
                      </button>
                    </div>

                    <div style={{ display: slide.marcado === false ? "none" : "" }}>
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

        {/* ===== CELEBRIDADES (ATORES) ===== */}
        <div className="carrousel-celeDesta">
          <div className="titulo">
            <p style={{ color: "#9A15D8", marginLeft: "10px" }}>CELEBRIDADES</p>
            <p style={{ marginLeft: "10px" }}>EM DESTAQUE</p>
          </div>

          <div style={{ marginTop: "10px", marginLeft: "5%" }}>
            <p>Principais Atores e Atrizes de acordo com telespectadores.</p>
          </div>

          <div className="container-carrousel-celeDesta">
            <button className="arrow left" onClick={prevSlideCele}>
              ❮
            </button>

            <div className="slides-grid-celeDesta">
              {getVisibleSlidesCelebridades().map((cele) => (
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
                        <button className="icon-btn">
                          <BsFillPersonCheckFill
                            className="icon"
                            style={{ color: "#4cd815" }}
                          />
                        </button>
                      </div>
                      <div style={{ display: cele.marcado === false ? "none" : "" }}>
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

            <button className="arrow right" onClick={nextSlideCele}>
              ❯
            </button>
          </div>
        </div>

        {/* ===== DIRETORES ===== */}
        <div className="carrousel-diretDesta">
          <div className="titulo">
            <p style={{ color: "#9A15D8", marginLeft: "10px" }}>DIRETORES</p>
            <p style={{ marginLeft: "10px" }}>EM DESTAQUE</p>
          </div>

          <div style={{ marginTop: "10px", marginLeft: "5%" }}>
            <p>Principais Diretores de acordo com telespectadores.</p>
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
                        <button className="icon-btn">
                          <BsFillPersonCheckFill
                            className="icon"
                            style={{ color: "#4cd815" }}
                          />
                        </button>
                      </div>
                      <div style={{ display: dire.marcado === false ? "none" : "" }}>
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
      </div>
      <div>
        <h1>-</h1>
      </div>
    </div>
  );
}
export default HomeREVISU;
