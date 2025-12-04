import Toolbar from "./toolbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Layout() {
    const { usuario } = useContext(AuthContext);

    const logado = !!usuario; // se existe usuário, está logado

    return (
        <>
            <Toolbar logado={logado} />
            <Outlet />
            <Footer logado={logado} />
        </>
    );
}

export default Layout;
