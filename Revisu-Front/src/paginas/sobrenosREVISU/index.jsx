import "./style.css";
import { MdMovie, MdOutlineRecommend } from "react-icons/md";
import { PiFilmSlateBold } from "react-icons/pi";
import { FaDatabase, FaUserFriends } from "react-icons/fa";

function SobrenosREVISU() {
    return (
        <div className="sobrenos-container">
            <div><h1>-</h1></div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className='tituloSobreNos'>
                    <h1>Sobre Nós</h1>
                </div>
            </div>

            <div className="sobrenos-content">
                {/* HERO / CABEÇALHO */}
                <section className="sobrenos-hero">
                    <div className="sobrenos-hero-text">
                        <p className="sobrenos-tag">REVISU</p>
                        <h1 className="sobrenos-title">
                            Um guia personalizado pelo universo
                            <span> cinematográfico.</span>
                        </h1>
                        <p className="sobrenos-subtitle">
                            O REVISU foi criado para te ajudar a decidir o que assistir,
                            usando um sistema de recomendação que aprende com o seu gosto
                            e sugere filmes e séries que realmente combinam com você.
                        </p>
                    </div>

                    <div className="sobrenos-highlight-card">
                        <div className="sobrenos-highlight-icon">
                            <MdMovie />
                        </div>
                        <p className="sobrenos-highlight-title">
                            Recomendações inteligentes,
                            <br />
                            experiência simples.
                        </p>
                        <p className="sobrenos-highlight-text">
                            Você marca o que gosta, o sistema analisa seus hábitos
                            e monta listas personalizadas como{" "}
                            <strong>“Para você”</strong> e sugestões parecidas com as
                            obras que já curtiu.
                        </p>
                    </div>
                </section>

                {/* BLOCO – COMO FUNCIONA */}
                <section className="sobrenos-section">
                    <h2 className="sobrenos-section-title">
                        <MdOutlineRecommend className="sobrenos-section-icon" />
                        Como o sistema de recomendação funciona?
                    </h2>

                    <div className="sobrenos-grid">
                        <div className="sobrenos-card">
                            <PiFilmSlateBold className="sobrenos-card-icon" />
                            <h3>1. Seu gosto vira dado</h3>
                            <p>
                                Tudo começa pela sua <strong>Biblioteca</strong>. Cada obra que
                                você adiciona é entendida como um sinal de interesse. A partir
                                disso, o REVISU identifica:
                            </p>
                            <ul>
                                <li>gêneros que você mais consome;</li>
                                <li>atores, atrizes e diretores recorrentes;</li>
                                <li>palavras‑chave importantes das sinopses.</li>
                            </ul>
                        </div>

                        <div className="sobrenos-card">
                            <FaUserFriends className="sobrenos-card-icon" />
                            <h3>2. Análise híbrida</h3>
                            <p>
                                O sistema combina <strong>duas formas de recomendação</strong>:
                            </p>
                            <ul>
                                <li>
                                    <strong>Baseado em conteúdo:</strong> compara gêneros,
                                    sinopses e elenco das obras da sua Biblioteca com o restante
                                    do catálogo.
                                </li>
                                <li>
                                    <strong>Colaborativo:</strong> usa padrões de consumo de
                                    vários usuários para sugerir obras que pessoas parecidas
                                    com você também gostaram.
                                </li>
                            </ul>
                        </div>

                        <div className="sobrenos-card">
                            <FaDatabase className="sobrenos-card-icon" />
                            <h3>3. Combinação e ranking</h3>
                            <p>
                                Cada obra recebe uma pontuação que leva em conta:
                            </p>
                            <ul>
                                <li>similaridade com o seu perfil;</li>
                                <li>nota média e popularidade;</li>
                                <li>
                                    equilíbrio entre análise de conteúdo e filtragem colaborativa.
                                </li>
                            </ul>
                            <p>
                                Para perfis novos, o sistema foca mais nas características das
                                obras; para perfis com histórico maior, usa mais os padrões da
                                comunidade.
                            </p>
                        </div>
                    </div>
                </section>

                {/* FLUXO EM ETAPAS */}
                <section className="sobrenos-flow">
                    <h2 className="sobrenos-section-title">
                        <MdMovie className="sobrenos-section-icon" />
                        Da Biblioteca até a tela “Para você”
                    </h2>

                    <div className="sobrenos-steps">
                        <div className="sobrenos-step">
                            <span className="sobrenos-step-number">1</span>
                            <p className="sobrenos-step-title">Você marca obras</p>
                            <p className="sobrenos-step-text">
                                Adiciona filmes e séries à sua Biblioteca – isso é o seu sinal
                                de que gosta daquele conteúdo.
                            </p>
                        </div>

                        <div className="sobrenos-step">
                            <span className="sobrenos-step-number">2</span>
                            <p className="sobrenos-step-title">O sistema aprende</p>
                            <p className="sobrenos-step-text">
                                O algoritmo atualiza o seu perfil com os gêneros, elenco e
                                termos mais presentes nas obras que você escolhe.
                            </p>
                        </div>

                        <div className="sobrenos-step">
                            <span className="sobrenos-step-number">3</span>
                            <p className="sobrenos-step-title">As recomendações surgem</p>
                            <p className="sobrenos-step-text">
                                As obras são ordenadas pela pontuação final e aparecem na
                                seção <strong>“Para você”</strong> e em listas relacionadas.
                            </p>
                        </div>

                        <div className="sobrenos-step">
                            <span className="sobrenos-step-number">4</span>
                            <p className="sobrenos-step-title">Ciclo contínuo</p>
                            <p className="sobrenos-step-text">
                                Cada nova obra marcada refina ainda mais o modelo, sem exigir
                                que você dê nota manualmente.
                            </p>
                        </div>
                    </div>
                </section>

                {/* TECNOLOGIAS */}
                <section className="sobrenos-tech-section">
                    <h2 className="sobrenos-section-title">
                        Tecnologias por trás do projeto
                    </h2>

                    <p className="sobrenos-tech-text">
                        O REVISU foi desenvolvido como um projeto acadêmico com foco em
                        recomendação audiovisual personalizada, utilizando:
                    </p>

                    <div className="sobrenos-tech-chips">
                        <span className="sobrenos-chip">C# / .NET</span>
                        <span className="sobrenos-chip">React + JavaScript</span>
                        <span className="sobrenos-chip">Banco de dados (DBeaver / SQL)</span>
                        <span className="sobrenos-chip">APIs de catálogo audiovisual</span>
                        <span className="sobrenos-chip">Algoritmos de recomendação híbridos</span>
                    </div>
                </section>
            </div>
            <div><h1>-</h1></div>
        </div>
    );
}
export default SobrenosREVISU;
