import { Routes, Route, Navigate  } from "react-router-dom";
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
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
// importe outras páginas aqui quando existir

function App() {
    return (
        <AuthProvider>
            <Routes>

                <Route path="" element={<Navigate to="/home" replace />} />

                <Route element={<Layout />}>

                    <Route path="/home" element={<HomeREVISU />} />
                    <Route path="/login" element={<EntrarREVISU />} />                
                    <Route path="/cadastro" element={<CadastroREVISU />} />
                    <Route path="/sobre-nos" element={<SobreNosREVISU />} />


                    <Route path="/start-quiz" element={ <ProtectedRoute><StartquizREVISU /> </ProtectedRoute>} />
                    <Route path="/quiz" element={ <ProtectedRoute> <QuizREVISU /> </ProtectedRoute>} />
                    <Route path="/editar" element={<ProtectedRoute><EditarREVISU /></ProtectedRoute>} />
                    
                    <Route path="/biblioteca" element={ <ProtectedRoute><BibliotecaREVISU /></ProtectedRoute>} />
                    <Route path="/para-voce" element={<ProtectedRoute><ParaVoceREVISU /></ProtectedRoute>} />
                    <Route path="/sinopse-obra/:idObra/:idUsuario" element={<ProtectedRoute><SinopseObraREVISU /></ProtectedRoute>} />
                    <Route path="/detalhe-cele-dire/:idElenco/:idUsuario" element={<ProtectedRoute><DetalheCeleDireREVISU /></ProtectedRoute>} />
                </Route>

                <Route path="*" element={<h1>Página não encontrada</h1>} />
            </Routes>
        </AuthProvider>
    );
}

export default App;

