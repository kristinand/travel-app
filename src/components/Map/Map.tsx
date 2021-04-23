import React from 'react';
import { MapContainer, TileLayer, Marker, Polygon } from 'react-leaflet';
import polygon from '../../utils/polygons';
import 'leaflet-fullscreen/dist/Leaflet.fullscreen';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import classes from './Map.module.scss';

type Props = {
  coords: any;
  code: string;
  title: StringConstructor;
};

const Map = ({ coords, code, title }: Props) => {
  const multiPolygon: any = polygon(code);

  return (
    <div id="map" className={classes.map}>
      <a href="#map" className={classes.title}>{title}</a>
      <MapContainer
        className={classes.mapContainer}
        fullscreenControl
        scrollWheelZoom={false}
        center={coords}
        zoom={5}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={coords} />
        <Polygon pathOptions={{ color: '#bc875c' }} positions={multiPolygon} />
      </MapContainer>
    </div>
  );
};

export default Map;
