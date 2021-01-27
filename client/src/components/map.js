import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import ShipMarker from './ship-marker';
import { useGlobalState } from '../state';

const ShipMap = () => {
  const [state] = useGlobalState();

  const [viewport, setViewport] = useState({
    latitude: 34.74741002334936,
    longitude: -46.24566763831464,
    zoom: 2,
  });

  return (
    <ReactMapGL
      mapboxApiAccessToken="pk.eyJ1IjoiamFkZW5sZW1tb24iLCJhIjoiY2swaHF6OGhhMDVoczNtcXJ1eWJhNzljMCJ9.rh0Da7Ct2szjyDfqW5MyTg"
      mapStyle="mapbox://styles/jadenlemmon/ckkemiib9132217p6jt5j5x1c"
      width="100vw"
      height="100vh"
      onViewportChange={viewport => setViewport(viewport)}
      {...viewport}
    >
      {state.activeShips.map(ship => (
        <ShipMarker key={ship.id} {...ship} />
      ))}
    </ReactMapGL>
  );
};

export default ShipMap;
