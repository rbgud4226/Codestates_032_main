import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    appearance: none;
    -webkit-appearence: none;
    border-collapse: collapse;
    font-feature-settings: 'pnum' on, 'lnum' on, 'calt' off, 'cv13' on !important;
  }

  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
    
  }

  *{
    box-sizing: border-box;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  ol,
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote::before,
  blockquote::after,
  q::before,
  q::after {
    content: none;
  }

  /* remember to define visible focus styles!
  :focus{outline:?????;}
   */

  /* remember to highlight inserts somehow! */
  ins {
    text-decoration: none;
  }

  del {
    text-decoration: line-through;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: normal;
  }

  a {
    display: inline-block;
    text-decoration: none;
  }

  a:link,
  a:visited,
  a:active {
    text-decoration: none;
  }

  caption,
  legend {
    display: none;
  }

  button {
    margin: 0;
    padding: 0;
    background: none;
    border: 0;
    box-sizing: inherit;
    cursor: pointer;
  }

  em {
    font-style: normal;
  }

  /* input disabled ios 기본 css reset */
  input[type='checkbox'],
  input[type='radio'] {
    &:disabled {
      & + label {
        cursor: default;
      }
    }
  }

  input[type='text'],
  input[type='number'],
  input[type='password'],
  input[type='email'],
  textarea {
    appearance: none;

    &:disabled {
      opacity: 1;
      -webkit-text-fill-color: inherit;
    }

    &::-ms-clear,
    &::-ms-reveal {
      display: none;
      width: 0;
      height: 0;
    }
  }

  select {
    position: relative;
    appearance: none;

    /* 사파리, 크롬 하위버전용 */

    /* 사파리, 크롬 하위버전용 */
    &::-ms-expand {
      display: none;
    }
  }

  input[type='text']::-ms-clear {
    display: none;
    width: 0;
    height: 0;
  }

  // input number 버튼 삭제
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    margin: 0;
    appearance: none;
  }

  img {
    display: block;
    image-rendering: crisp-edges;
    image-rendering: optimize-contrast;
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -ms-interpolation-mode: nearest-neighbor;
  }

  div,
  button,
  span,
  a {
    image-rendering: crisp-edges;
    image-rendering: optimize-contrast;
  } // 백그라운드 이미지 랜더링 css

  // ios video border
  video {
    /* stylelint-disable-next-line property-no-vendor-prefix */
    -webkit-mask-image: radial-gradient(white, black);
    mask-image: radial-gradient(white, black);
  }

`;
