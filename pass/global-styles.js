import { createGlobalStyle } from 'styled-components';

/* eslint no-unused-expressions: 0 */
createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fff;
  }
  #app {
    min-height: 100%;
    min-width: 100%;
  }
`;
export const primaryColor = 'rgba(159,179,188, 1)';
export const primaryColorBg = 'rgba(159,179,188, 0.3)';
