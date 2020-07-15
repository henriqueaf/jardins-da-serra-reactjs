import React, { useState, useEffect, useCallback } from 'react';
import { Marker } from 'react-google-maps';

import './styles.css';
import { Allotment, Quatrain } from './types';
import {
  getNearestAllotment,
  getQuatrainByAllotment,
  isPointInsideCondominium,
} from './geoFunctions';
import MapComponent from '../../components/Map';

const Map: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState<
    google.maps.LatLngLiteral
  >({
    lat: 0,
    lng: 0,
  });
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
        setCurrentPosition({ lat: latitude, lng: longitude });

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

  return (
    <div className="map">
      <div className="mapFooter">
        <div className="currentPositionInfo">{`Você está: ${currentQuatrain?.name} / ${currentAllotment.name}`}</div>
      </div>

      <MapComponent center={currentPosition}>
        <Marker position={currentPosition} />
      </MapComponent>
    </div>
  );
};

export default Map;
