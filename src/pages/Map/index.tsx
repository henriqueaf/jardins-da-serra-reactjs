import React, { useState, useEffect } from 'react';
import { Map as MapLeaflet, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import './styles.css';

// LatLng: -3.8617658287851437,-38.643180727958686

const Map: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setSelectedPosition([latitude, longitude]);
    });
  }, []);

  function handleMapClick(event: LeafletMouseEvent) {
    console.log([event.latlng.lat, event.latlng.lng]);
    setSelectedPosition([event.latlng.lat, event.latlng.lng]);
  }

  return (
    <div className="map">
      <MapLeaflet center={selectedPosition} zoom={15} onclick={handleMapClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={selectedPosition} />
      </MapLeaflet>
    </div>
  );
};

export default Map;
