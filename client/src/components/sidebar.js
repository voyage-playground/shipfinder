import React from 'react';
import { Block, Card, Text } from '@actovos-consulting-group/ui-core';
import styled from 'styled-components';

const Container = styled(Block)`
  background-color: white;
  padding: 20px;
  position: fixed;
  left: 50px;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
  height: 90vh;
  z-index: 1;
  width: 400px;
  box-shadow: 0px 0px 76px #217594;
`;

const Logo = styled.img`
  margin: 0 auto;
  display: block;
`;

const ShipItem = ({ name, captain }) => {
  return (
    <Card mb={20}>
      <div>
        <Text fontSize="1.2rem">{name}</Text>
      </div>
      <div>
        <Text>Captain: {captain}</Text>
      </div>
    </Card>
  );
};

const Sidebar = ({ ships }) => {
  return (
    <Container>
      <Logo src="/logo.png" />
      <p>Ships en route</p>
      {ships.map(ship => (
        <ShipItem key={ship.id} {...ship} />
      ))}
    </Container>
  );
};

export default Sidebar;
