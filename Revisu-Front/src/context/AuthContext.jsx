import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const saved = sessionStorage.getItem("usuario");
        if (saved) {
            setUsuario(JSON.parse(saved));
        }
    }, []);

    const login = (dadosUsuario) => {
        sessionStorage.setItem("usuario", JSON.stringify(dadosUsuario));
        setUsuario(dadosUsuario);
    };

    const logout = () => {
        sessionStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
