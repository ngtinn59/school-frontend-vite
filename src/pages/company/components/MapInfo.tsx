import { Map, Marker } from "@vis.gl/react-google-maps";

interface MapInfoProps {
  latitute: string;
  longitude: string;
}

const MapInfo: React.FC<MapInfoProps> = ({ latitute, longitude }) => {
  const markerLocation = {
    lat: Number(latitute),
    lng: Number(longitude),
  };

  return (
    <>
      <Map
        className="h-[300px] overflow-hidden rounded-md"
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={"greedy"}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </>
  );
};

export default MapInfo;
