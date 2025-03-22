import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../CampaignCard/CampaignDashboard.css';
import AddCampaignIcon from "../../assets/Icons/BillboardBlack.png";

import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

// Define marker type
interface MarkerData {
  id: number;
  lat: number;
  lng: number;
  title: string;
}

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: AddCampaignIcon,
  shadowUrl: markerShadowPng,
  iconSize: [20, 20], 
  iconAnchor: [10, 20], 
  popupAnchor: [0, -20],
});

// Marker data
const markers: MarkerData[] = [
  { id: 1, lat: 49.2827, lng: -123.1207, title: "Vancouver - Location 1" },
  { id: 2, lat: 49.225361152915646, lng: -123.10775180778471, title: "Vancouver - Location 2" },
];


const MyMap: React.FC = () => {
  return (
    <div>
      <p className="heading-3">Billboard Map</p>
      <MapContainer
        center={[49.225361152915646, -123.10775180778471]} 
        zoom={10}
        style={{ height: "500px", width: "100%", borderRadius:"20px", marginTop:"15px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker) => (
          <Marker key={marker.id} position={[marker.lat, marker.lng]} icon={customIcon}>
            <Popup>{marker.title}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
