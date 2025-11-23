import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";

function cadastroREVISU() {
    const [showSenha, setShowSenha] = useState(false);

    return (
        <div className="cadastro-container">

            <div className="cadastro-image"></div>

            <div className="cadastro-content">
                <div className="cadastro-card" style={{ marginTop: '5%' }}>

                    {/* LADO ESQUERDO (placeholder branco com logo) */}
                    <div className="cadastro-left">

                        <div className='imagem-left' style={{ marginTop: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                                style={{ width: "50%", height: "90%", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    {/* LADO DIREITO (formulário) */}
                    <div className="cadastro-right">
                        <h1 className="cadastro-title">CRIE SUA CONTA</h1>
                        <p className="cadastro-sub">Preencha seus dados</p>

                        <label className="cadastro-label">Usuário</label>
                        <div className="input-wrapper">
                            <input className="cadastro-input" type="text" />
                        </div>

                        <label className="cadastro-label">E-mail</label>
                        <div className="input-wrapper">
                            <input className="cadastro-input" type="email" />
                        </div>

                        <label className="cadastro-label">Senha</label>
                        <div className="input-wrapper">
                            <input
                                className="cadastro-input"
                                type={showSenha ? "text" : "password"}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowSenha(p => !p)}
                            >
                                {showSenha ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <label className="cadastro-label nascimento-label">
                            Data de nascimento
                        </label>
                        <div className="input-wrapper small">
                            <input className="cadastro-input small" type="date" />
                        </div>

                        <button className="cadastro-btn">Criar conta</button>

                        <p className="cadastro-footer">
                            Já possui conta? <Link to="/login">Entrar</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default cadastroREVISU