import React from 'react';
import { Block, Flex, Text } from '@actovos-consulting-group/ui-core';
import styled from 'styled-components';
import { useGlobalState } from '../state';
import Avatar from './avatar';

const Container = styled(Block)`
  background-color: white;
  padding: 20px;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 10px;
  height: 200px;
  z-index: 1;
  width: 260px;
  box-shadow: 0px 0px 76px #217594;
`;

const SelectedShip = () => {
  const [{ selectedShip }] = useGlobalState();
  return (
    <Container>
      <Flex>
        <Avatar size={60} src={selectedShip.avatar} />
        <Block ml={3}>
          <Text fontSize="1.2rem" fontWeight="bold" display="block">
            {selectedShip.name}
          </Text>
          <Text display="block">Captain: {selectedShip.captain}</Text>
        </Block>
      </Flex>
      <Block mt={20}>
        <Text fontSize="1.2rem" fontWeight="bold" display="block">
          Current Position
        </Text>
        <Text display="block">Lat: {selectedShip.lat.toFixed(6)}</Text>
        <Text display="block">Lng: {selectedShip.lng.toFixed(6)}</Text>
      </Block>
    </Container>
  );
};

export default SelectedShip;
