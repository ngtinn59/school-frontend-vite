import { Map, Marker } from "@vis.gl/react-google-maps";
import Title from "../../../components/Title";
import { CompanyDetailType } from "../../../utils/type";
import { useState } from "react";

interface MapInfoProps {
  data: CompanyDetailType;
}

const MapInfo: React.FC<MapInfoProps> = ({ data }) => {
  // const lat = Number(data.latitude);
  // const lng = Number(data.longitude);

  const markerLocation = {
    lat: Number(data.latitude),
    lng: Number(data.longitude),
  };

  return (
    <>
      <Title type="h4" className="mt-4 text-[var(--text-color-bold)]">
        Address
      </Title>

      {/* <div className="w-fll"> */}
      <Map
        // style={{ borderRadius: "200px", height: "300px" }}
        className="h-[300px] overflow-hidden rounded-md"
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
      {/* </div> */}

      {/* <LoadScript googleMapsApiKey="AIzaSyC52sX6DS9XwK8fRjgiyJIFB8KXEMHmPIA">
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
      </LoadScript> */}
    </>
  );
};

export default MapInfo;
