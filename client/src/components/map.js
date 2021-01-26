import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import ShipMarker from './ship-marker';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiamFkZW5sZW1tb24iLCJhIjoiY2swaHF6OGhhMDVoczNtcXJ1eWJhNzljMCJ9.rh0Da7Ct2szjyDfqW5MyTg',
});

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
        <ShipMarker />
      </Marker>
    ))}
  </Map>
);

export default ShipMap;
