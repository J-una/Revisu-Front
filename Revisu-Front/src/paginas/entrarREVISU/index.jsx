import { useState } from "react";
import "./style.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function LoginREVISU() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [erro, setErro] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {
        setErro("");

        try {
            const response = await fetch("https://localhost:7290/api/usuarios/login", { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (!response.ok) {
                setErro(data.mensagem || "Erro ao fazer login");
                return;
            }

            // Atualiza o contexto e o sessionStorage
            login(data);

            if (data.quiz === false)
                navigate("/start-quiz");
            else
                navigate("/home");

        } catch (error) {
            setErro("Não foi possível conectar ao servidor.");
        }
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <div className="login-card" style={{ marginTop: '6%', marginBottom: '6%' }}>
                    <h1 className="login-title">LOGIN</h1>

                    <label className="login-label">Usuário (Email)</label>
                    <div className="input-wrapper">
                        <input
                            className="login-input"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <label className="login-label senha-label">Senha</label>
                    <div className="input-wrapper">
                        <input
                            className="login-input"
                            type={showSenha ? "text" : "password"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button
                            type="button"
                            className="eye-btn"
                            onClick={() => setShowSenha(p => !p)}
                        >
                            {showSenha ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>

                    {erro && (
                        <p style={{ color: "red", marginTop: "10px" }}>{erro}</p>
                    )}

                    <button className="login-btn" onClick={handleLogin}>
                        Entrar
                    </button>

                    <p className="signup">
                        Ainda não possui uma conta? <Link to="/cadastro">Cadastrar-se</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginREVISU;
