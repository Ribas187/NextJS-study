import GlobalStyle from '../styles/GlobalStyle';

// The main component of the application
export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}
