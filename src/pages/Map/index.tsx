import React, { useState, useEffect, useCallback } from 'react';
import { Map as MapLeaflet, TileLayer, Marker } from 'react-leaflet';
// import { LeafletMouseEvent } from 'leaflet';

import './styles.css';
import { Allotment, Quatrain } from './types';
import {
  getNearestAllotment,
  getQuatrainByAllotment,
  isPointInsideCondominium,
} from './geoFunctions';

const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [currentAllotment, setCurrentAllotment] = useState<Allotment>(
    {} as Allotment
  );
  const [currentQuatrain, setCurrentQuatrain] = useState<Quatrain | undefined>(
    {} as Quatrain
  );

  const handleWatchPositionSuccess: PositionCallback = useCallback(
    (position) => {
      const { latitude, longitude } = position.coords;

      if (isPointInsideCondominium({ latitude, longitude })) {
        setCurrentPosition([latitude, longitude]);

        const allotment = getNearestAllotment({ latitude, longitude });
        const quatrain = getQuatrainByAllotment(allotment);

        setCurrentQuatrain(quatrain);
        setCurrentAllotment(allotment);
      }
    },
    []
  );

  const handleWatchPositionError: PositionErrorCallback = useCallback(
    (error) => {
      console.warn('ERRO(' + error.code + '): ' + error.message);
    },
    []
  );

  useEffect(() => {
    const watchPositionOptions = {
      enableHighAccuracy: true,
      timeout: Infinity,
      maximumAge: 0,
    };

    const whatchId = navigator.geolocation.watchPosition(
      handleWatchPositionSuccess,
      handleWatchPositionError,
      watchPositionOptions
    );

    return function clearWhatchPosition() {
      navigator.geolocation.clearWatch(whatchId);
    };
  }, [handleWatchPositionError, handleWatchPositionSuccess]);

  // function handleMapClick(event: LeafletMouseEvent) {
  //   setCurrentPosition([event.latlng.lat, event.latlng.lng]);
  // }

  return (
    <div className="map">
      <div className="mapFooter">
        <div className="currentPositionInfo">{`Você está: ${currentQuatrain?.name} / ${currentAllotment.name}`}</div>
      </div>

      <MapLeaflet center={currentPosition} zoom={18} onclick={() => {}}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentPosition} />
      </MapLeaflet>
    </div>
  );
};

export default Map;
