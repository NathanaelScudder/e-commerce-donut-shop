import styles from '@/styles/Home.module.css'
import Link from "next/link";

import { Page } from '../utils/typedefs'

// Provides a consistent navbar and header to use across the website
// The provided active page will be set as active in the navbar
export default function Navbar({ activePage }: {activePage: Page}) {
    return (
        <>
            <header className="p-1 text-bg-dark border-light border-bottom">
                <h1 className={styles.titleText}>
                    Nat Donuts
                </h1>
            </header>
            <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark">
                <div className="container-fluid">
                <div className="navbar-nav">
                    <Link className={(activePage == Page.HOME) ? "nav-link active" : "nav-link"} href="/">Home</Link>
                    <Link className={(activePage == Page.CATALOG) ? "nav-link active" : "nav-link"} href="/catalog">Catalog</Link>
                    <Link className={(activePage == Page.CART) ? "nav-link active" : "nav-link"} href="/shopping-cart">Cart</Link>
                    <Link className={(activePage == Page.PAST_ITEMS) ? "nav-link active" : "nav-link"} href="/past-items">Past Items</Link>
                </div>
                </div>
            </nav>
        </>
    );
}