import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import NavBar from '../components/NavBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <NavBar />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
