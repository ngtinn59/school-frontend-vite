import Title from "../../../components/Title";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { CompanyDetailType } from "../../../utils/type";

interface MapInfoProps {
  data: CompanyDetailType;
}

const MapInfo: React.FC<MapInfoProps> = ({ data }) => {
  const lat = Number(data.latitude);
  const lng = Number(data.longitude);
  return (
    <>
      <Title type="h4" className="mt-4 text-blue-900">
        Bản đồ
      </Title>
      <LoadScript googleMapsApiKey="AIzaSyC52sX6DS9XwK8fRjgiyJIFB8KXEMHmPIA">
        <GoogleMap
          mapContainerStyle={{
            height: "300px",
            width: "100%",
          }}
          center={{
            lat,
            lng,
          }}
          zoom={15}
        >
          <Marker
            position={{
              lat,
              lng,
            }}
          />
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default MapInfo;

import React from "react";
