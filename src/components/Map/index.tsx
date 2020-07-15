import React, { ReactNode } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

interface Props {
  center: google.maps.LatLngLiteral;
  children?: ReactNode;
}

const Map: React.FC<Props> = ({ center, children }) => {
  return (
    <GoogleMap center={center} defaultZoom={4}>
      {children}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default (props: Props) => (
  <WrappedMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDD1Jrs3XLl3-E7c1Wx4IcplDyTF3PPFgM"
    loadingElement={<div style={{ height: '100%' }} />}
    mapElement={<div style={{ height: '100%' }} />}
    containerElement={<div style={{ height: '100%' }} />}
    center={props.center}
    children={props.children}
  />
);
