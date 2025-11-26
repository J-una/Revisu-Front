import { useState } from "react";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function loginREVISU() {
    const [showSenha, setShowSenha] = useState(false);

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-card" style={{ marginTop: '6%', marginBottom: '6%' }}>
                    <h1 className="login-title">LOGIN</h1>

                    <label className="login-label">Usuário</label>
                    <div className="input-wrapper">
                        <input
                            className="login-input"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    <label className="login-label senha-label">Senha</label>
                    <div className="input-wrapper">
                        <input
                            className="login-input"
                            type={showSenha ? "text" : "password"}
                            placeholder=""
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowSenha((p) => !p)}
                        >
                            {showSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {/* <div className="login-row">
                        <label className="remember">
                            <input type="checkbox" />
                            <span>Lembrar-me</span>
                        </label>

                        <a className="forgot" href="#">
                            Esqueceu a senha?
                        </a>
                    </div> */}

                    <button className="login-btn">Entrar</button>

                    <p className="signup">
                        Ainda não possui uma conta? <Link to="/cadastro">Cadastrar-se</Link>
                    </p>
                </div>
            </div>
        </div >
    )
}
export default loginREVISU