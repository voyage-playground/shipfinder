import { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import ShipMarker from './ship-marker';

const ShipMap = ({ ships, updateShipData }) => {
  const [viewport, setViewport] = useState({
    latitude: 34.74741002334936,
    longitude: -46.24566763831464,
    zoom: 3,
  });

  const onDragEnd = (event, ship) => {
    updateShipData({
      ...ship,
      lng: event.lngLat[0],
      lat: event.lngLat[1],
    });
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoiamFkZW5sZW1tb24iLCJhIjoiY2swaHF6OGhhMDVoczNtcXJ1eWJhNzljMCJ9.rh0Da7Ct2szjyDfqW5MyTg"
      zoom={3}
      mapStyle="mapbox://styles/jadenlemmon/ckkemiib9132217p6jt5j5x1c"
      width="100vw"
      height="100vh"
      onViewportChange={viewport => setViewport(viewport)}
      {...viewport}
    >
      {ships.map(ship => (
        <Marker
          draggable
          key={ship.id}
          latitude={ship.lat}
          longitude={ship.lng}
          anchor="center"
          onDragEnd={event => {
            onDragEnd(event, ship);
          }}
        >
          <ShipMarker />
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default ShipMap;
