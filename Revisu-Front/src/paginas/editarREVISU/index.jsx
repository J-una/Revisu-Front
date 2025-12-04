import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./style.css";
import api from "../../services/api";

function EditarREVISU() {
    const navigate = useNavigate();

    const [showSenhaNova, setShowSenhaNova] = useState(false);

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        dataNascimento: ""
    });

    const [emailErro, setEmailErro] = useState("");

    // MODAIS (mesma estrutura do cadastro)
    const [modalMessage, setModalMessage] = useState("");
    const [modalType, setModalType] = useState(""); 
    const [showModal, setShowModal] = useState(false);

    function openModal(msg, type) {
        setModalMessage(msg);
        setModalType(type);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
        if (modalType === "success") {
            navigate("/home");
            window.location.reload();
        }
    }

    // Carrega dados do usuário
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("usuario"));
        if (user) {
            setForm({
                nome: user.nome || "",
                email: user.email || "",
                senha: "",
                dataNascimento: user.dataNascimento?.split("T")[0] || ""
            });
        }
    }, []);

    // Atualiza estado dos inputs
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ===== VALIDAR EMAIL =====
    const validarEmail = async (email) => {
        const user = JSON.parse(sessionStorage.getItem("usuario"));

        const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Se e-mail inválido → erro visual imediato
        if (!emailValido.test(email)) {
            setEmailErro("Digite um e-mail válido.");
            return;
        }

        try {
            const resp = await api.get("https://localhost:7290/api/usuarios/verificar-email", {
                params: { email: email, ignoreId: user.idUsuario }
            });

            if (resp.data.emailExiste) {
                setEmailErro("Este e-mail já está em uso.");
            } else {
                setEmailErro("");
            }
        } catch (err) {
            console.error("Erro ao validar email", err);
            setEmailErro("Erro ao verificar email.");
        }
    };

    // ===== SUBMIT =====
    const handleSubmit = async () => {
        const user = JSON.parse(sessionStorage.getItem("usuario"));

        // BLOQUEAR atualização se o e-mail estiver duplicado
        if (emailErro) {
            openModal(emailErro, "error");
            return;
        }

        try {
            const resposta = await api.put(
                `https://localhost:7290/api/usuarios/editar-usuario/${user.idUsuario}`,
                {
                    nome: form.nome,
                    email: form.email,
                    senha: form.senha,
                    dataNascimento: form.dataNascimento
                }
            );

            // Atualiza sessionStorage
            sessionStorage.setItem("usuario", JSON.stringify(resposta.data));

            openModal("Dados atualizados com sucesso!", "success");

        } catch (error) {
            console.error(error);
            openModal("Erro ao atualizar usuário.", "error");
        }
    };

    return (
        <div className="editar-container">

            {/* MODAL */}
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

            <div className="editar-image"></div>

            <div className="editar-contentTudo">
                <div className="editar-content" style={{ marginTop: "1%", marginBottom: "1%" }}>
                    <h1 className="editar-title">EDITAR PERFIL</h1>
                    <p className="editar-sub">Atualize seus dados</p>

                    <div className="editar-card">
                        <h2 className="editar-card-title">NOVO</h2>

                        <label className="editar-label">Usuário</label>
                        <div className="input-wrapper">
                            <input
                                className="editar-input"
                                type="text"
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                            />
                        </div>

                        <label className="editar-label">E-mail</label>
                        <div className="input-wrapper">
                            <input
                                className="editar-input"
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={(e) => {
                                    handleChange(e);
                                    validarEmail(e.target.value);
                                }}
                            />
                        </div>

                       

                        <label className="editar-label">Nova Senha</label>
                        <div className="input-wrapper">
                            <input
                                className="editar-input"
                                type={showSenhaNova ? "text" : "password"}
                                name="senha"
                                value={form.senha}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="eye-btn"
                                onClick={() => setShowSenhaNova((p) => !p)}
                            >
                                {showSenhaNova ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>

                        <label className="editar-label nascimento-label">Data de nascimento</label>
                        <div className="input-wrapper small center-small">
                            <input
                                className="editar-input small"
                                type="date"
                                name="dataNascimento"
                                value={form.dataNascimento}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button className="editar-btn" onClick={handleSubmit}>
                        Atualizar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditarREVISU;
