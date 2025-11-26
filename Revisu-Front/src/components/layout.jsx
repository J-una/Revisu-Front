import Toolbar from "./toolbar";
import Footer from "./footer";
import { Outlet } from "react-router-dom";

export default function Layout({ logado }) {
    return (
        <>
            <Toolbar logado={logado} />
            <Outlet />
            <Footer logado={logado} />
        </>
    );
}
