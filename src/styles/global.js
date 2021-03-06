import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
  }

  input, textarea, button {
    font-size: 16px;
  }

  button {
    cursor: pointer;
  }
`;
