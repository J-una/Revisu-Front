import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./style.css";

function cadastroREVISU() {

    const [showSenha, setShowSenha] = useState(false);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [loading, setLoading] = useState(false);

    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); // "success" | "error"
    const [showModal, setShowModal] = useState(false);

    const [erros, setErros] = useState({
        nome: false,
        email: false,
        senha: false,
        nascimento: false
    });

    async function cadastrarUsuario() {

        let camposInvalidos = {
            nome: !nome.trim(),
            email: !email.trim(),
            senha: !senha.trim(),
            nascimento: !nascimento.trim()
        };

        // Atualiza visuais
        setErros(camposInvalidos);

        // Se qualquer campo estiver vazio → erro
        if (Object.values(camposInvalidos).some(v => v)) {
            setModalMessage("Por favor, preencha todos os campos.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErros(prev => ({ ...prev, email: true }));
            setModalMessage("Digite um e-mail válido.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Validação de senha
        if (senha.length < 6) {
            setErros(prev => ({ ...prev, senha: true }));
            setModalMessage("A senha deve conter pelo menos 6 caracteres.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Validação de data
        const data = new Date(nascimento);
        if (isNaN(data.getTime())) {
            setErros(prev => ({ ...prev, nascimento: true }));
            setModalMessage("Digite uma data de nascimento válida.");
            setModalType("error");
            setShowModal(true);
            return;
        }

        // Se tudo ok → API
        try {
            setLoading(true);

            const response = await fetch("https://localhost:44348/api/usuarios/cadastrar-usuario", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nome,
                    email,
                    senha,
                    dataNascimento: nascimento
                })
            });

            if (!response.ok) {
                setModalMessage("Erro ao cadastrar usuário.");
                setModalType("error");
                setShowModal(true);
                return;
            }

            const data = await response.json();
            console.log("Usuário cadastrado:", data);

            setModalMessage("Conta criada com sucesso!");
            setModalType("success");
            setShowModal(true);
        }
        catch (err) {
            console.error(err);
            setModalMessage("Erro inesperado ao cadastrar.");
            setModalType("error");
            setShowModal(true);
        }
        finally {
            setLoading(false);
        }
    }

    async function verificarEmail(emailDigitado) {
        if (!emailDigitado || emailDigitado.trim() === "") return;

        try {
            const response = await fetch(`https://localhost:44348/api/usuarios/verificar-email?email=${emailDigitado}`);

            const data = await response.json();

            if (data.emailExiste) {
                setErros(prev => ({ ...prev, email: true }));
                setModalMessage("Este e-mail já está cadastrado.");
                setModalType("error");
                setShowModal(true);
            }
        }
        catch (error) {
            console.error("Erro ao verificar email:", error);
        }
    }



    function closeModal() {
        setShowModal(false);

        if (modalType === "success") {
            window.location.href = "/login";
        }
    }

    return (

        <div className="cadastro-container">
            {showModal && (
                <div className="modal-overlay">
                    <div className={`modal-box ${modalType}`}>
                        <h2>{modalType === "success" ? "Sucesso" : "Erro"}</h2>
                        <p>{modalMessage}</p>

                        <button onClick={closeModal} className="modal-btn">
                            OK
                        </button>
                    </div>
                </div>
            )}

            <div className="cadastro-image"></div>

            <div className="cadastro-content">
                <div className="cadastro-card" style={{ marginTop: '6%', marginBottom: '6%' }}>

                    <div className="cadastro-left">
                        <div className='imagem-left' style={{ marginTop: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src="src/IMAGES/RevisuLOGOfundoPRETO.png"
                                style={{ width: "50%", height: "90%", borderRadius: "8px" }}
                            />
                        </div>
                    </div>

                    <div className="cadastro-right">
                        <h1 className="cadastro-title">CRIE SUA CONTA</h1>
                        <p className="cadastro-sub">Preencha seus dados</p>

                        <label className="cadastro-label">Usuário</label>
                        <div className="input-wrapper">
                            <input
                                className={`cadastro-input ${erros.nome ? "input-error" : ""}`}
                                type="text"
                                value={nome}
                                onChange={(e) => {
                                    setNome(e.target.value);
                                    setErros(prev => ({ ...prev, nome: false }));
                                }}
                            />
                        </div>

                        <label className="cadastro-label">E-mail</label>
                        <div className="input-wrapper">
                            <input
                                className={`cadastro-input ${erros.email ? "input-error" : ""}`}
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    const novoEmail = e.target.value;

                                    setEmail(novoEmail);
                                    setErros(prev => ({ ...prev, email: false }));

                                    // Valida antes de chamar o backend
                                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                    if (emailRegex.test(novoEmail)) {
                                        verificarEmail(novoEmail);
                                    }
                                }}
                            />
                        </div>

                        <label className="cadastro-label">Senha</label>
                        <div className="input-wrapper">
                            <input
                                className={`cadastro-input ${erros.senha ? "input-error" : ""}`}
                                type={showSenha ? "text" : "password"}
                                value={senha}
                                onChange={(e) => {
                                    setSenha(e.target.value);
                                    setErros(prev => ({ ...prev, senha: false }));
                                }}
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
                            <input
                                className={`cadastro-input small ${erros.nascimento ? "input-error" : ""}`}
                                type="date"
                                value={nascimento}
                                onChange={(e) => {
                                    setNascimento(e.target.value);
                                    setErros(prev => ({ ...prev, nascimento: false }));
                                }}
                            />
                        </div>

                        <button
                            className="cadastro-btn"
                            onClick={cadastrarUsuario}
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Criar conta"}
                        </button>

                        <p className="cadastro-footer">
                            Já possui conta?{" "}
                            <a href="/login">Entrar</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default cadastroREVISU;
