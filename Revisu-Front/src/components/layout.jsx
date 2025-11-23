import Toolbar from "./toolbar"; // sua toolbar (pode ser o HomeREVISU separado)
import { Outlet } from "react-router-dom";

export default function Layout({ logado }) {
    return (
        <>
            <Toolbar logado={logado} />
            <Outlet />
        </>
    );
}
