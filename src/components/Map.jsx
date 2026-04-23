import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {

  return (
    <div
      style={{
        marginTop: "30px",
        background: "white",
        borderRadius: "12px",
        padding: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      <h3 style={{ margin: "0 0 20px 0", color: "#1f2937", fontSize: "18px" }}>
        Provincial & Divisional Map
      </h3>
      <div style={{ borderRadius: "8px", overflow: "hidden" }}>
        <MapContainer
          center={[30.5, 69.2]}
          zoom={5}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
