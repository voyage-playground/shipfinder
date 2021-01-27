import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import { Flex } from '@actovos-consulting-group/ui-core';
import styled, { keyframes } from 'styled-components';
import ShipIcon from './svg/ship';
import { useGlobalState } from '../state';

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
  height: 60px;
  width: 60px;
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

const ShipMarker = ({ id, lat, lng }) => {
  const [coords, setCoords] = useState({ lat, lng });
  const [, { updateShip }] = useGlobalState();

  const onDragEnd = (event, shipID) => {
    const newCoords = { lng: event.lngLat[0], lat: event.lngLat[1] };
    setCoords(newCoords);
    updateShip({
      id: shipID,
      ...newCoords,
    });
  };

  return (
    <Marker
      draggable
      latitude={coords.lat}
      longitude={coords.lng}
      anchor="center"
      onDragEnd={event => {
        onDragEnd(event, id);
      }}
    >
      <MarkerContainer alignItems="center" justifyContent="center">
        <ShipIcon width={40} color="white" />
      </MarkerContainer>
    </Marker>
  );
};

export default ShipMarker;
