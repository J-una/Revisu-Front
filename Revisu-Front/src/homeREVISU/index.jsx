import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'
import { slideObra } from "../dados/slideObra.js";
import { slideCelebridade } from "../dados/slideCelebridades.js";
import { slideDiretore } from "../dados/slideDiretor.js";
import { generoColors } from "../dados/generoColors.js";
import { Link } from "react-router-dom";

function HomeREVISU() {
  const [indexCarroselHome, setIndexCarroselHome] = useState(0);
  const [indexCarroselObra, setIndexCarroselObra] = useState(0);
  const [indexCarroselCele, setIndexCarroselCele] = useState(0);
  const [indexCarroselDire, setIndexCarroselDire] = useState(0);
  const [slidesObra, setSlideObra] = useState(slideObra)
  const [slidesCelebridades, setSlidesCelebridades] = useState(slideCelebridade)
  const [slidesDiretores, setSlidesDiretores] = useState(slideDiretore)
  const [marcado, setMarcado] = useState(true);
  const generosColors = generoColors;

  function arredondarNota(nota) {
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
      text: `Bem-vindo ao REVISU! Aqui, você encontra sugestões personalizadas para todos os gostos, desde os grandes sucessos do cinema 
      até as séries mais aclamadas do momento.  Ajudamos você a descobrir novas histórias envolventes, explorar diferentes gêneros e aproveitar ao 
      máximo seu tempo de entretenimento.`,
      image: "src/IMAGES/filmeCarrosel_cinema.jpg"
    },
    {
      title: "Recomendações Inteligentes",
      text: `Filmes e séries são uma das formas mais populares e envolventes de entretenimento. Eles nos permitem escapar da rotina, explorar novos mundos, 
      viver diferentes emoções e refletir sobre temas importantes — tudo isso sem sair do lugar. Além de divertirem, também têm o poder de conectar pessoas, 
      inspirar ideias e proporcionar momentos de lazer.`,
      image: "src/IMAGES/filmeCarrosel_suspense.jpg"
    },
    {
      title: "Filmes e Séries",
      text: `Basta informar suas preferências — como gêneros favoritos, atores, diretores ou até o idioma que mais te agrada — e o nosso sistema irá recomendar opções personalizadas 
      para você. Com filtros inteligentes e sugestões baseadas no seu perfil, fica fácil descobrir novos títulos que têm tudo a ver com o que você gosta de assistir.`,
      image: "src/IMAGES/filmeCarrosel_varios.jpg"
    }
  ];

  const visibleCount4 = 4;
  const visibleCount2 = 2;
  const stepCele = 2;

  function nextSlideHome() {
    setIndexCarroselHome((prev) => (prev + 1) % slidesHome.length);
  }

  function prevSlideHome() {
    setIndexCarroselHome((prev) => (prev - 1 + slidesHome.length) % slidesHome.length);
  }

  function nextSlideObra() {
    setIndexCarroselObra((prev) => (prev + 1) % slidesObra.length);
  }

  function prevSlideObra() {
    setIndexCarroselObra((prev) => (prev - 1 + slidesObra.length) % slidesObra.length);
  }

  function nextSlideCele() {
    setIndexCarroselCele((prev) => (prev + stepCele) % slidesCelebridades.length);
  }

  function prevSlideCele() {
    setIndexCarroselCele((prev) => (prev - stepCele + slidesCelebridades.length) % slidesCelebridades.length);
  }

  function nextSlideDire() {
    setIndexCarroselDire((prev) => (prev + 1) % slidesDiretores.length);
  }

  function prevSlideDire() {
    setIndexCarroselDire((prev) => (prev - 1 + slidesDiretores.length) % slidesDiretores.length);
  }

  function getVisibleSlidesObras() {
    return Array.from({ length: visibleCount4 }, (_, i) => {
      const slideIndex = (indexCarroselObra + i) % slidesObra.length;
      return { ...slidesObra[slideIndex], _i: slideIndex };
    });
  }

  function getVisibleSlidesCelebridades() {
    return Array.from({ length: visibleCount4 }, (_, i) => {
      const slideIndex = (indexCarroselCele + i) % slidesCelebridades.length;
      return { ...slidesCelebridades[slideIndex], _i: slideIndex };
    });
  }

  function getVisibleSlidesDiretores() {
    return Array.from({ length: visibleCount2 }, (_, i) => {
      const slideIndex = (indexCarroselDire + i) % slidesDiretores.length;
      return { ...slidesDiretores[slideIndex], _i: slideIndex };
    });
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlideHome();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">

      <div className="home-image"></div>

      <div className="home-content">
        <div className="carrousel-container">
          <button className="arrow left" onClick={prevSlideHome}>❮</button>

          <div className="slide">
            <div className="text-block">
              <h2>{slidesHome[indexCarroselHome].title}</h2>
              <p>{slidesHome[indexCarroselHome].text}</p>
            </div>

            <img className="slide-image" src={slidesHome[indexCarroselHome].image} alt="slide" style={{ borderRadius: '60px' }} />
          </div>

          <button className="arrow right" onClick={nextSlideHome}>❯</button>
        </div>

        <div className="carrousel-obrasDesta">
          <div className="titulo">
            <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
            <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
          </div>

          <div style={{ marginTop: '10px', marginLeft: '5%' }}>
            <p>Principais obras de acordo com telespectadores.</p>
          </div>

          <div className="container-carrousel-obrasDesta">
            <button className="arrow left" onClick={prevSlideObra}>❮</button>

            <div className="slides-row">
              {getVisibleSlidesObras().map((slide) => (
                <div className="card-obra" key={slide._i} style={{ boxShadow: marcado != true ? '0px -10px 12px -4px #4cd815' : '0px -10px 12px -4px #9A15D8' }}>

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
                    <Link to="/sinopse-obra"> <button className="icon-btn sinopse-btn">
                      <PiFilmReel className='icon' />
                      <p style={{ marginLeft: '10px' }}>Sinopse</p>
                    </button></Link>

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

        <div className="carrousel-celeDesta">

          <div className="titulo">
            <p style={{ color: '#9A15D8', marginLeft: '10px' }}>CELEBRIDADES</p>
            <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
          </div>

          <div style={{ marginTop: '10px', marginLeft: '5%' }}>
            <p>Principais Atores e Atrizes de acordo com telespectadores.</p>
          </div>

          <div className="container-carrousel-celeDesta">
            <button className="arrow left" onClick={prevSlideCele}>❮</button>

            <div className="slides-grid-celeDesta">
              {getVisibleSlidesCelebridades().map((cele) => (
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
                            borderColor: generosColors[g] || "#9A15D8",  // fallback caso não exista
                          }}
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ width: '8%' }}>
                    <button className="icon-btn">
                      <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                    </button>

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
              ))}
            </div>

            <button className="arrow right" onClick={nextSlideCele}>❯</button>
          </div>
        </div>

        <div className="carrousel-diretDesta">
          <div className="titulo">
            <p style={{ color: '#9A15D8', marginLeft: '10px' }}>DIRETORES</p>
            <p style={{ marginLeft: '10px' }}>EM DESTAQUE:</p>
          </div>

          <div style={{ marginTop: '10px', marginLeft: '5%' }}>
            <p>Principais Diretores de acordo com telespectadores.</p>
          </div>

          <div className="container-carrousel-diretDesta">
            <button className="arrow left" onClick={prevSlideDire}>❮</button>

            <div className="slides-grid-diretDesta">
              {getVisibleSlidesDiretores().map((dire) => (
                <div className="card-diretDesta" key={dire._i} style={{ boxShadow: marcado != true ? '-8px 0 12px -2px #4cd815' : '-8px 0 12px -2px #9A15D8' }}>

                  <div className="foto-wrapper" style={{ width: '15%' }}>
                    {dire.foto ? (
                      <img
                        className="slide-imageceleDesta"
                        src={`https://image.tmdb.org/t/p/w500/${dire.foto}`}
                        alt={dire.nome}
                      />
                    ) : (
                      <div className="foto-fallback">
                        <CiImageOff className="fallback-icon" />
                        <p className="fallback-text">Sem foto</p>
                      </div>
                    )}
                  </div>

                  <div className="info-diretDesta" style={{ width: '77%' }}>
                    <p className="title-diretDesta">{dire.nome}</p>

                    <div className="generos-celeDesta">
                      {dire.obras.map((g, idx) => (
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

                  <div style={{ width: '8%' }}>
                    <button className="icon-btn">
                      <BsPersonBoundingBox className="icon" style={{ color: '#d8c415ff' }} />
                    </button>

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
              ))}
            </div>

            <button className="arrow right" onClick={nextSlideDire}>❯</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default HomeREVISU