import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import HomeREVISU from "./homeREVISU/index.jsx";
import BibliotecaREVISU from "./bibliotecaREVISU/index.jsx";
// importe outras páginas aqui quando existir

function App() {
    const logado = true; // depois coloca seu estado real

    return (
        <Routes>
            {/* Rota PAI com o Layout */}
            <Route element={<Layout logado={logado} />}>
                {/* Rotas FILHAS (todas terão toolbar) */}
                <Route path="/home" element={<HomeREVISU />} />
                <Route path="/biblioteca" element={<BibliotecaREVISU />} />
            </Route>

            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    );
}

export default App;
