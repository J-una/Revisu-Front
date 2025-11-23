import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";

function editarREVISU() {
    const [showSenhaAtual, setShowSenhaAtual] = useState(false);
    const [showSenhaNova, setShowSenhaNova] = useState(false);

    return (
        <div className="editar-container">

            <div className="editar-image"></div>

            <div className="editar-contentTudo">
                <div className="editar-content">
                    <h1 className="editar-title">EDITAR PERFIL</h1>
                    <p className="editar-sub">Atualize seus dados</p>


                    <div className="editar-card">
                        <h2 className="editar-card-title">NOVO</h2>

                        <label className="editar-label">Usuário</label>
                        <div className="input-wrapper">
                            <input className="editar-input" type="text" />
                        </div>

                        <label className="editar-label">E-mail</label>
                        <div className="input-wrapper">
                            <input className="editar-input" type="email" />
                        </div>

                        <label className="editar-label">Nova Senha</label>
                        <div className="input-wrapper">
                            <input
                                className="editar-input"
                                type={showSenhaNova ? "text" : "password"}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowSenhaNova(p => !p)}
                            >
                                {showSenhaNova ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <label className="editar-label nascimento-label">Data de nascimento</label>
                        <div className="input-wrapper small center-small">
                            <input className="editar-input small" type="date" />
                        </div>
                    </div>


                    <button className="editar-btn">Atualizar</button>
                </div>
            </div>
        </div>
    );
}
export default editarREVISU