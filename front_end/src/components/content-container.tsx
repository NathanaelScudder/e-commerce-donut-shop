import Footer from "./footer";
import Navbar from "./navbar";

import { Page } from '../utils/typedefs'
import Script from "next/script";

// Wrapper component for this website's pages. Provides a consistent header, navbar, and footer across the pages.
export default function ContentContainer({ children, activePage }: {
    children: React.ReactNode, activePage: Page
}) 
{
    return (
        <>
            <Script src='https://kit.fontawesome.com/1c791bc53b.js' crossOrigin='anonymous'></Script>
            <Navbar activePage={activePage}></Navbar>
            {children}
            <Footer></Footer>
        </>
    );
}