import { createGlobalStyle } from "styled-components";

import "font-awesome/css/font-awesome.css";
const globalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body {
    background: #9b65E6;
    text-rendering: optimizeLegibility !important;
    --webkit-font-smoothing: atialiased !important;

    font-family: sans-serif;
  }
`;

export default globalStyle;
