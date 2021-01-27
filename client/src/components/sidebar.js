import React from 'react';
import { useToggle } from 'react-use';
import { AiFillDelete } from 'react-icons/ai';
import {
  Block,
  Card,
  Text,
  Button,
  Flex,
  Clickable,
  Modal,
  ModalContent,
  ModalHeader,
} from '@actovos-consulting-group/ui-core';
import styled from 'styled-components';
import Avatar from './avatar';

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
  width: 300px;
  box-shadow: 0px 0px 76px #217594;
`;

const ItemContainer = styled(Card)`
  box-shadow: 0px 0px 7px #a7c2cc;
  position: relative;
`;

const Logo = styled.img`
  margin: 0 auto;
  display: block;
`;

const DeleteIcon = styled(Clickable)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

const urlPrefix = process.env.REACT_APP_API_URL || window.location.origin;

const ShipItem = ({ id, name, captain, avatar, removeShip }) => {
  const [isModalOpen, toggleModal] = useToggle(false);

  return (
    <ItemContainer mb={20}>
      <Flex>
        <Avatar src={`${urlPrefix}/avatars/${avatar}.svg`} />
        <Block p={2}>
          <div>
            <Text fontSize="1.2rem" fontWeight="bold">
              {name}
            </Text>
          </div>
          <div>
            <Text>Captain: {captain}</Text>
          </div>
        </Block>
      </Flex>
      <DeleteIcon onClick={toggleModal}>
        <AiFillDelete color="#ccc" />
      </DeleteIcon>
      <Modal show={isModalOpen}>
        <ModalHeader>Remove Ship?</ModalHeader>
        <ModalContent>
          <Button.Group>
            <Button
              variant="success"
              onClick={() => {
                removeShip(id);
              }}
            >
              Yes
            </Button>
            <Button variant="danger" onClick={toggleModal}>
              No
            </Button>
          </Button.Group>
        </ModalContent>
      </Modal>
    </ItemContainer>
  );
};

const Sidebar = ({ ships, removeShip }) => {
  return (
    <Container>
      <Logo src="/logo.png" />
      <Button fullWidth onClick={() => null}>
        New Ship Route
      </Button>
      <p>Ships en route</p>
      {ships.map(ship => (
        <ShipItem removeShip={removeShip} key={ship.id} {...ship} />
      ))}
    </Container>
  );
};

export default Sidebar;
