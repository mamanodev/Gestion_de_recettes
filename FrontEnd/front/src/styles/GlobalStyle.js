import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans";
    background-color: #F5F7F8;
    color: #272829;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
    color: #2c2c2c;
    margin-bottom: 0.5rem;
  }

  p { line-height: 1.6; color: #555; }

  a { color: #1f51ff; text-decoration: none; }
  a:hover { text-decoration: underline; }
`;

export default GlobalStyle;

