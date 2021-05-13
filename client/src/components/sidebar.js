import React from 'react';
import { useToggle, useAsyncFn } from 'react-use';
import { AiFillDelete } from 'react-icons/ai';
import { GoPlus } from 'react-icons/go';
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
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 1;
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
  width: 100%;
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
      <Flex justifyContent={{ _: 'center', xs: 'inherit' }}>
        <Avatar src={avatar} />
        <Block p={2} display={{ _: 'none', xs: 'block' }}>
          <div>
            <Text fontSize={{ _: '0.9rem', md: '1.2rem' }} fontWeight="bold">
              {name}
            </Text>
          </div>
          <div>
            <Text fontSize={{ _: '0.7rem', md: '1rem' }}>
              Captain: {captain}
            </Text>
          </div>
        </Block>
      </Flex>
      <Block display={{ _: 'none', xs: 'block' }}>
        <DeleteIcon onClick={toggleModal}>
          <AiFillDelete color="#ccc" />
        </DeleteIcon>
      </Block>
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
    <Container
      padding={{ _: 10, xs: 20 }}
      position={{ _: 'relative', xs: 'fixed' }}
      width={{ _: 100, xs: 300 }}
      left={{ _: 0, md: 50 }}
      height={{ _: '100vh', md: '90vh' }}
      borderRadius={{ _: 0, md: 10 }}
    >
      <Logo src="/logo.png" />
      <Button
        fullWidth
        loading={loading}
        onClick={() => {
          makeReq();
        }}
      >
        <Block display={{ _: 'none', xs: 'block' }}>New Ship Route</Block>
        <Block display={{ _: 'block', xs: 'none' }}>
          <GoPlus color="white" size={20} />
        </Block>
      </Button>
      <Text
        textAlign={{ _: 'center', xs: 'left' }}
        mt={3}
        mb={2}
        fontSize={{ _: '0.9rem', xs: '1rem' }}
      >
        Active Ships
      </Text>
      <Block
        overflow="auto"
        height={{
          _: 'calc(100vh - 200px)',
          xs: 'calc(100vh - 400px)',
          md: 'calc(90vh - 380px)',
        }}
      >
        {state.activeShips.map(ship => (
          <ShipItem key={ship.id} {...ship} />
        ))}
      </Block>
    </Container>
  );
};

export default Sidebar;
