import { useState, useEffect } from 'react'
import { LuScissorsLineDashed } from "react-icons/lu";
import { RiFilmAiLine } from "react-icons/ri";
import { PiFilmReel } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { BsFillPersonCheckFill, BsFillPersonDashFill, BsPersonBoundingBox } from "react-icons/bs";
import './style.css'

function bibliotecaREVISU() {
    const [indexCarroselHome, setIndexCarroselHome] = useState(0);
    const [indexCarroselObra, setIndexCarroselObra] = useState(0);
    const [indexCarroselCele, setIndexCarroselCele] = useState(0);
    const [indexCarroselDire, setIndexCarroselDire] = useState(0);
    const [marcado, setMarcado] = useState(true);

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

    const slidesCelebridades = [
        {
            title: "Tom Cruise",
            image: "src/IMAGES/Celebridade_TomCruise.PNG",
            generos: [
                "História", "Guerra", "Crime"
            ],
        },
        {
            title: "Jennifer lawrence",
            image: "src/IMAGES/Celebridade_JenniferLaw.PNG",
            generos: [
                "Drama", "Guerra", "Mistério"
            ],
        },
        {
            title: "Leonardo DiCaprio",
            image: "src/IMAGES/Celebridade_DiCaprio.PNG",
            generos: [
                "Faroeste", "Guerra e Política", "Crime"
            ],
        },
        {
            title: "Scarlett Johansson",
            image: "src/IMAGES/Celebridade_ScarletJoha.PNG",
            generos: [
                "Ficção científica", "Thriller", "Infantil"
            ],
        },
        {
            title: "Dwayne Johnson",
            image: "src/IMAGES/Celebridade_DwayneJohnson.PNG",
            generos: [
                "Reality", "Mistério", "Notícias"
            ],
        },
        {
            title: "Robert Downey Jr",
            image: "src/IMAGES/Celebridade_RobertDowney.PNG",
            generos: [
                "História", "Terror", "Música", "Romance", "Ficção científica",
                "Cinema TV", "Thriller", "Guerra", "Faroeste",
            ],
        }
    ]

    const slidesDiretores = [
        {
            title: "David Fincher",
            image: "src/IMAGES/Diretor_DavidFincher.PNG",
            text: `Alien 3 (1992) | Seven - Os Sete Crimes Capitais (1995) | Vidas em Jogo (1997) | Clube da Luta (1999) | 
      O Quarto do Pânico (2002) | Zodíaco (2007) | O Curiosa Caso de Benjamin Button (2008) | A Rede Social (2010) | 
      Os Homens Que Odeiam as Mulheres (2011) | Garota Exemplar (2014) | Mank (2022) | The Killer (2023).`,
        },
        {
            title: "Steven Spielberg",
            image: "src/IMAGES/Diretor_StevenSpielberg.PNG",
            text: `Alien 3 (1992) | Seven - Os Sete Crimes Capitais (1995) | Vidas em Jogo (1997) | Clube da Luta (1999) | 
      O Quarto do Pânico (2002) | Zodíaco (2007) | O Curiosa Caso de Benjamin Button (2008) | A Rede Social (2010) | 
      Os Homens Que Odeiam as Mulheres (2011) | Garota Exemplar (2014) | Mank (2022) | The Killer (2023).`,
        },
        {
            title: "Quentin Tarantino",
            image: "src/IMAGES/Diretor_QuentinTarantino.PNG",
            text: `Alien 3 (1992) | Seven - Os Sete Crimes Capitais (1995) | Vidas em Jogo (1997) | Clube da Luta (1999) | 
      O Quarto do Pânico (2002) | Zodíaco (2007) | O Curiosa Caso de Benjamin Button (2008) | A Rede Social (2010) | 
      Os Homens Que Odeiam as Mulheres (2011) | Garota Exemplar (2014) | Mank (2022) | The Killer (2023).`,
        }
    ]

    const generoColors = {
        "História": "#E67E22",
        "Terror": "#A568C8",
        "Música": "#59b680ff",
        "Mistério": "#C014B5",
        "Romance": "#B92F2F",
        "Ficção científica": "#00BCD4",
        "Cinema TV": "#3498DB",
        "Thriller": "#17f5e2ff",
        "Guerra": "#26a93cff",
        "Faroeste": "#D35400",
        "Ação e Aventura": "#688EC8",
        "Crime": "#2740aeff",
        "Documentário": "#ce17b5ff",
        "Drama": "#5D6D7E",
        "Família": "#7e5d7eff",
        "Infantil": "#F1C40F",
        "Notícias": "#95A5A6",
        "Reality": "#FFFFFF",
        "Ficção Científica e Fantasia": "#68C879",
        "Novela": "#E69A9A",
        "Talk Show": "#EEFF00",
        "Guerra e Política": "#566573"
    };

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

    const generoColorsBiblioteca = [
        { genero: "História", cor: "#E67E22", },
        { genero: "Terror", cor: "#A568C8", },
        { genero: "Música", cor: "#59b680ff", },
        { genero: "Mistério", cor: "#C014B5", },
        { genero: "Romance", cor: "#B92F2F", },
        { genero: "Ficção científica", cor: "#00BCD4", },
        { genero: "Cinema TV", cor: "#3498DB", },
        { genero: "Thriller", cor: "#17f5e2ff", },
        { genero: "Guerra", cor: "#26a93cff", },
        { genero: "Faroeste", cor: "#D35400", },
        { genero: "Ação e Aventura", cor: "#688EC8", },
        { genero: "Crime", cor: "#2740aeff", },
        { genero: "Documentário", cor: "#ce17b5ff", },
        { genero: "Drama", cor: "#5D6D7E", },
        { genero: "Família", cor: "#7e5d7eff", },
        { genero: "Infantil", cor: "#F1C40F", },
        { genero: "Notícias", cor: "#95A5A6", },
        { genero: "Reality", cor: "#FFFFFF", },
        { genero: "Ficção Científica e Fantasia", cor: "#68C879", },
        { genero: "Novela", cor: "#E69A9A", },
        { genero: "Talk Show", cor: "#EEFF00", },
        { genero: "Guerra e Política", cor: "#566573" },
    ];

    const generoQtd = [
        { genero: ["História", "Guerra", "Música"] },
        { genero: ["Terror", "Música", "Romance"] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Música", "Romance"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
        { genero: ["Ficção científica",] },
        { genero: ["Cinema TV", "Notícias", "Guerra", "Música"] },
        { genero: ["Thriller", "Romance"] },
        { genero: ["Guerra", "Thriller", "Romance"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Faroeste", "Música", "Terror"] },
        { genero: ["Ação e Aventura", "Família"] },
        { genero: ["Crime", "Família", "Ação e Aventura"] },
        { genero: ["Documentário", "Guerra e Política", "Ação e Aventura"] },
        { genero: ["Drama", "Guerra e Política"] },
        { genero: ["Infantil", "Notícias"] },
        { genero: ["Ficção Científica e Fantasia", "Novela"] },
        { genero: ["Mistério", "Novela", "Guerra"] },
        { genero: ["Romance", "Guerra",] },
    ];

    const generoCountMap = generoQtd.reduce((acc, item) => {
        item.genero.forEach((g) => {
            acc[g] = (acc[g] || 0) + 1;
        });
        return acc;
    }, {});

    const generoColorsSorted = [...generoColorsBiblioteca].sort((a, b) => {
        return (generoCountMap[b.genero] || 0) - (generoCountMap[a.genero] || 0);
    });

    return (
        <div className="biblioteca-container">

            <div className="biblioteca-image"></div>

            <div className="biblioteca-content">
                <div className='tituloBiblioteca'>
                    <h1 style={{ marginLeft: '15px' }}>MINHA BIBLIOTECA</h1>
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
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>OBRAS</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
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

                <div className="carrousel-celeDesta">

                    <div className="titulo">
                        <p style={{ color: '#9A15D8', marginLeft: '10px' }}>CELEBRIDADES</p>
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Atores e Atrizes de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-celeDesta">
                        <button className="arrow left" onClick={prevSlideCele}>❮</button>

                        <div className="slides-grid-celeDesta">
                            {getVisibleSlidesCelebridades().map((cele) => (
                                <div className="card-celeDesta" key={cele._i} style={{ boxShadow: marcado != true ? '-8px 0 12px -2px #4cd815' : '-8px 0 12px -2px #9A15D8' }}>

                                    <img
                                        className="slide-imageceleDesta"
                                        src={cele.image}
                                        alt={cele.title}
                                        style={{ width: '15%' }}
                                    />

                                    <div className="info-celeDesta" style={{ width: '77%' }}>
                                        <p className="title-celeDesta">{cele.title}</p>

                                        <div className="generos-celeDesta">
                                            {cele.generos.map((g, idx) => (
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
                        <p style={{ marginLeft: '10px' }}>PREFERIDOS:</p>
                    </div>

                    <div style={{ marginTop: '10px', marginLeft: '5%' }}>
                        <p>Diretores de acordo com suas preferências.</p>
                    </div>

                    <div className="container-carrousel-diretDesta">
                        <button className="arrow left" onClick={prevSlideDire}>❮</button>

                        <div className="slides-grid-diretDesta">
                            {getVisibleSlidesDiretores().map((dire) => (
                                <div className="card-diretDesta" key={dire._i} style={{ boxShadow: marcado != true ? '-8px 0 12px -2px #4cd815' : '-8px 0 12px -2px #9A15D8' }}>

                                    <img
                                        className="slide-imagediretDesta"
                                        src={dire.image}
                                        alt={dire.title}
                                        style={{ width: '15%' }}
                                    />

                                    <div className="info-diretDesta" style={{ width: '77%' }}>
                                        <p className="title-diretDesta">{dire.title}</p>

                                        <div className="generos-diretDesta">
                                            <p className="title-diretDesta">{dire.text}</p>
                                        </div>
                                    </div>

                                    <div style={{ width: '8%' }}>
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
export default bibliotecaREVISU