import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import shipImage from '../ship.svg';
import styled, { keyframes } from 'styled-components';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiamFkZW5sZW1tb24iLCJhIjoiY2swaHF6OGhhMDVoczNtcXJ1eWJhNzljMCJ9.rh0Da7Ct2szjyDfqW5MyTg',
});

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

const MarkerContainer = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 50%;
  background: white url(${shipImage}) no-repeat center/80%;
  box-shadow: 0px 0px 16px #217594;
  animation: ${pulse()} 1.5s infinite;
`;

const ShipMap = ({ ships }) => (
  <Map
    zoom={[3]}
    center={[-46.24566763831464, 34.74741002334936]}
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}
  >
    {ships.map(ship => (
      <Marker key={ship.id} coordinates={[ship.lng, ship.lat]} anchor="bottom">
        <MarkerContainer />
      </Marker>
    ))}
  </Map>
);

export default ShipMap;
