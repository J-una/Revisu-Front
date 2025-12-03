import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout.jsx";
import StartquizREVISU from "./paginas/startquizREVISU/index.jsx";
import QuizREVISU from "./paginas/quizREVISU/index.jsx";
import HomeREVISU from "./paginas/homeREVISU/index.jsx";
import BibliotecaREVISU from "./paginas/bibliotecaREVISU/index.jsx";
import EntrarREVISU from "./paginas/entrarREVISU/index.jsx"
import CadastroREVISU from "./paginas/cadastroREVISU/index.jsx"
import EditarREVISU from "./paginas/editarREVISU/index.jsx"
import ParaVoceREVISU from "./paginas/paravoceREVISU/index.jsx"
import SobreNosREVISU from "./paginas/sobrenosREVISU/index.jsx"
import SinopseObraREVISU from "./paginas/sinopseObraREVISU/index.jsx"
import DetalheCeleDireREVISU from "./paginas/detalheCeleDireREVISU/index.jsx"
// importe outras páginas aqui quando existir

function App() {
    const logado = true; // logado na toolbar

    return (
        <Routes>
            {/* Rota PAI com o Layout */}
            <Route element={<Layout logado={logado} />}>
                {/* Rotas FILHAS (todas terão toolbar) */}
                <Route path="/start-quiz" element={<StartquizREVISU />} />
                <Route path="/quiz" element={<QuizREVISU />} />
                <Route path="/home" element={<HomeREVISU />} />
                <Route path="/biblioteca" element={<BibliotecaREVISU />} />
                <Route path="/login" element={<EntrarREVISU />} />
                <Route path="/cadastro" element={<CadastroREVISU />} />
                <Route path="/editar" element={<EditarREVISU />} />
                <Route path="/para-voce" element={<ParaVoceREVISU />} />
                <Route path="/sobre-nos" element={<SobreNosREVISU />} />
                <Route path="/sinopse-obra/:idObra/:idUsuario" element={<SinopseObraREVISU />} />
                <Route path="/detalhe-cele-dire/:idElenco/:idUsuario" element={<DetalheCeleDireREVISU />} />
            </Route>

            <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
    );
}

export default App;
