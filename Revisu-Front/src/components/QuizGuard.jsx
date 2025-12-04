import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function QuizGuard({ children }) {
    const { usuario } = useContext(AuthContext);

    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    if (!usuario.quiz) {
        return <Navigate to="/start-quiz" replace />;
    }

    return children;
}
