import React from 'react';
import { Flex } from '@actovos-consulting-group/ui-core';
import styled, { keyframes } from 'styled-components';
import ShipIcon from './svg/ship';

const pulse = () => keyframes`
    0% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
      box-shadow: 0 0 0 50px rgba(#5a99d4, 0);
    }
    100% {
      transform: scale(0.9);
      box-shadow: 0 0 0 0 rgba(#5a99d4, 0);
    }
`;

const MarkerContainer = styled(Flex)`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  background-color: #0080ff;
  box-shadow: 0px 0px 16px #217594;
  animation: ${pulse()} 1.5s infinite;
  transition: all ease 0.5s;
  transform-origin: center center;
  cursor: pointer;

  &:hover {
    height: 100px;
    width: 100px;
  }
`;

const ShipMarker = () => {
  return (
    <MarkerContainer alignItems="center" justifyContent="center">
      <ShipIcon width={60} color="white" />
    </MarkerContainer>
  );
};

export default ShipMarker;
