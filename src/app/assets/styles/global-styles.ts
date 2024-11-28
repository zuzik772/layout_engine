import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15;
    text-size-adjust: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    color: #141414;
    word-wrap: break-word;
    font-weight: normal;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    overflow: hidden;
    height: 100vh;
    width: 100vw;
  }

  h1, h2, h3, h4, h5, h6, p, strong {
    font-weight: normal;
    margin: 0;
  }

  a {
    text-decoration: none;    
  }

  strong {
    font-family: ${(p) => p.theme.font.primaryFontFamily};
  }

  input, textarea, select{
    &:focus {
      color: ${(p) => p.theme.colors.gray900} !important;
      box-shadow: none !important;
    }

    &::placeholder {
      color: ${(p) => p.theme.colors.gray900} !important;
    }
  }

  button,
  [type='button'],
  [type='reset'],
  [type='submit'] {
    cursor: pointer;
    appearance: button;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }


  /* Ant-Design component style override */
  .ant-message{
    top: ${(p) => p.theme.sizes.spacing8};
  }

`;
