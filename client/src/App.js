import React from 'react';
import { Flex, Provider } from '@actovos-consulting-group/ui-core';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle, css } from 'styled-components';
import Map from './components/map';
import Sidebar from './components/sidebar';

const GlobalStyle = createGlobalStyle(
  ({ theme }) => css`
    ${styledNormalize}

    div#root {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    html,
    body {
      font-family: 'Maven Pro', sans-serif !important;
      height: 100%;
      background: ${theme.colors.base};
      color: ${theme.colors.textColor} !important;
    }
    * {
      box-sizing: border-box;
    }

    a {
      color: ${theme.colors.whiteSmoke};
    }

    h1 {
      font-weight: 100;
      font-size: 30px;
    }

    pre {
      white-space: pre-wrap;
      word-wrap: break-word;
      text-align: justify;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-transition-delay: 9999s;
      -webkit-transition: color 9999s ease-out, background-color 9999s ease-out;
    }
  `,
);

function App() {
  return (
    <Provider>
      <GlobalStyle />
      <Flex height="100%" flex={1}>
        <Sidebar />
        <Map />
      </Flex>
    </Provider>
  );
}

export default App;
