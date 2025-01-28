import { AppProps } from 'next/app';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import '../styles/Styles.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Roboto', sans-serif;
    background-color: #e9ebee;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;


const theme = {
  colors: {
    primary: '#0070f3',
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
