import { AppProps } from 'next/app';
import React from 'react';
import '../styles/globals.css';
import NavBar from '../components/NavBar';
import Script from 'next/script'

const kakaoKey = "6528e7f75d2844bbd51073a4861745ad";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services,clusterer,drawing`}
        strategy='beforeInteractive'
      />
      <NavBar />
      <Component {...pageProps} />
    </React.Fragment>
  );
}
