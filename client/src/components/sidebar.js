import React from 'react';
import { useToggle, useAsyncFn } from 'react-use';
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
import { useGlobalState } from '../state';
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
  padding: 8px;
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

const ShipItem = ({ id, name, captain, avatar }) => {
  const [isModalOpen, toggleModal] = useToggle(false);
  const [, { removeShip }] = useGlobalState();

  return (
    <ItemContainer mb={20}>
      <Flex>
        <Avatar src={avatar} />
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

const Sidebar = () => {
  const [state, { createShip }] = useGlobalState();
  const [{ loading }, makeReq] = useAsyncFn(createShip);
  return (
    <Container>
      <Logo src="/logo.png" />
      <Button
        fullWidth
        loading={loading}
        onClick={() => {
          makeReq();
        }}
      >
        New Ship Route
      </Button>
      <p>Ships en route</p>
      <Block style={{ overflow: 'scroll' }} height="calc(90vh - 306px)">
        {state.activeShips.map(ship => (
          <ShipItem key={ship.id} {...ship} />
        ))}
      </Block>
    </Container>
  );
};

export default Sidebar;
