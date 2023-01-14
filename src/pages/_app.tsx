import Footer from '@/components/Footer';
import Header from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <head>
        <title>Web Course</title>
      </head>
      <Header />
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}
