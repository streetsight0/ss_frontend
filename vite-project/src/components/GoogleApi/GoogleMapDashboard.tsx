import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import '../CampaignCard/CampaignDashboard.css';
import AddCampaignIcon from "../../assets/Icons/BillboardBlack.png";
import ActiveMapPin from "../../assets/Icons/ActiveMapPin.png";
import InactiveMapPin from "../../assets/Icons/InactivMapPin.png"
import AvailableMapPin from "../../assets/Icons/AvailableMapPin.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import { useEffect, useState } from "react";
import apiClient from "../../utils/axiosConfig";

// Function to return the appropriate custom icon based on the billboard status
const getCustomIcon = (status: string): L.Icon => {
  let iconUrl;
  switch (status.toLowerCase()) {
    case "active":
      iconUrl = ActiveMapPin; // Use active icon
      break;
    case "inactive":
      iconUrl = InactiveMapPin; // Use inactive icon
      break;
    case "available":
      iconUrl = AvailableMapPin; // Use available icon
      break;
    default:
      iconUrl = AddCampaignIcon; // Default icon for unknown status
  }

  return new L.Icon({
    iconUrl: iconUrl,
    shadowUrl: markerShadowPng,
    iconSize: [60, 60], // Adjust size as needed
    iconAnchor: [10, 20], // Adjust anchor point for proper positioning
    popupAnchor: [0, -20], // Adjust popup anchor
  });
};

interface Billboard {
  _id: string;
  billboard_series: string;
  leaseEnd: string;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  billboard_name: string;
  status: string;
}

const MyMap: React.FC = () => {
  const [billboardData, setBillboardData] = useState<Billboard[]>([]);

  useEffect(() => {
    const getBillBoards = async () => {
      try {
        const response = await apiClient.get("/api/billboard/getbillboards");
        setBillboardData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBillBoards();
  }, []);

  return (
    <div>
      <p className="heading-3">Billboard Map</p>
      <MapContainer
        center={[49.225361152915646, -123.10775180778471]} // Map center coordinates
        zoom={10}
        style={{ height: "500px", width: "100%", borderRadius: "20px", marginTop: "15px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {billboardData.map((marker) => (
          <Marker
            key={marker._id}
            position={[marker.location.latitude, marker.location.longitude]}
            icon={getCustomIcon(marker.status)} 
          >
            <Tooltip direction="top" offset={[0, -10]} opacity={1} permanent={false}>
              <div style={{ fontSize: "12px", color: "#666" }}>
                <span style={{ fontWeight: "bold" }}>Location:</span> {marker.location.name}<br />
                <span style={{ fontWeight: "bold" }}>Series:</span> {marker.billboard_series}<br />
                <span style={{ fontWeight: "bold" }}>Status:</span> {marker.status}<br />
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
