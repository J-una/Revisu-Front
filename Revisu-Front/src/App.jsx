import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import HomeREVISU from "./homeREVISU/index.jsx";
import BibliotecaREVISU from "./bibliotecaREVISU/index.jsx";
import EntrarREVISU from "./entrarREVISU/index.jsx"
import CadastroREVISU from "./cadastroREVISU/index.jsx"
import EditarREVISU from "./editarREVISU/index.jsx"
import ParaVoceREVISU from "./paravoceREVISU/index.jsx"
//import PesquisarREVISU from "./pesquisarREVISU/index.jsx"
import sobrenosREVISU from "./sobrenosREVISU/index.jsx"
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
                <Route path="/login" element={<EntrarREVISU />} />
                <Route path="/cadastro" element={<CadastroREVISU />} />
                <Route path="/editar" element={<EditarREVISU />} />
                <Route path="/para-voce" element={<ParaVoceREVISU />} />
                <Route path="/sobre-nos" element={<sobrenosREVISU />} />
            </Route>

            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    );
}

export default App;
