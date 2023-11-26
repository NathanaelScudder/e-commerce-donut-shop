import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head';

// The root of this website (which is where the head is defined)
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Nat Donut Shop</title>
        <meta name="author" content="Nathanael Scudder"/>
        <meta name="description" content="Online e-commerce website for INF 124" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
