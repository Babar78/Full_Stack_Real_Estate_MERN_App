import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import GeoCoderMarker from "../GeoCoderMarker/GeoCoderMarker";

const Map = (props) => {
  return (
    <MapContainer
      center={[53.35, 18.8]}
      zoom={1}
      scrollWheelZoom={false}
      style={{
        height: "40vh",
        width: "100%",
        // marginTop: "20px",
        zIndex: "0",
        borderRadius:"6px"
      }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <GeoCoderMarker
        address={`${props.address} ${props.city} ${props.country}`}
      />
    </MapContainer>
  );
};

export default Map;
