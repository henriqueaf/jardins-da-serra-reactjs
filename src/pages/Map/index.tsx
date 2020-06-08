import React, { useState, useEffect, useCallback } from 'react';
import { Map as MapLeaflet, TileLayer, Marker } from 'react-leaflet';
// import { LeafletMouseEvent } from 'leaflet';
import { findNearest } from 'geolib';

import './styles.css';
import quatrains from '../../database/quatrain_allotments.json';

interface Allotment {
  name: string;
  latitude: number;
  longitude: number;
}

interface Quatrain {
  name: string;
  allotments: Allotment[];
}

const allotments = quatrains.map((quatrain) => quatrain.allotments).flat();

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
      setCurrentPosition([latitude, longitude]);

      const allotment = findNearest(
        { latitude, longitude },
        allotments
      ) as Allotment;

      const quatrain = quatrains.find((quatrain) => {
        return quatrain.allotments.includes(allotment);
      });

      setCurrentQuatrain(quatrain);
      setCurrentAllotment(allotment);
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
