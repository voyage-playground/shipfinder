import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import { Flex, Provider } from '@actovos-consulting-group/ui-core';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle, css } from 'styled-components';
import Map from './components/map';
import Sidebar from './components/sidebar';
import axios from './utils/axios';
import theme from './theme';

const GlobalStyle = createGlobalStyle(
  () => css`
    ${styledNormalize}

    div#root {
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    html,
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
        'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      height: 100%;
    }
    * {
      box-sizing: border-box;
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

const App = () => {
  const [allShips, setShips] = useState([]);

  const fetchShipData = async () => {
    const { data } = await axios.get('/ships');
    setShips(data);
  };

  const updateShipData = async ship => {
    setShips(
      allShips.map(shi => (shi.id === ship.id ? { ...shi, ...ship } : shi)),
    );
    await axios.put(`/ships/${ship.id}`, ship);
  };

  const removeShip = async shipID => {
    setShips(allShips.filter(shi => shi.id !== shipID));
    await axios.delete(`/ships/${shipID}`);
  };

  useEffectOnce(() => {
    fetchShipData();
  });

  return (
    <Provider theme={theme}>
      <GlobalStyle />
      <Flex height="100%" flex={1}>
        <Sidebar ships={allShips} removeShip={removeShip} />
        <Map updateShipData={updateShipData} ships={allShips} />
      </Flex>
    </Provider>
  );
};

export default App;
