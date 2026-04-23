import { MapContainer, TileLayer, GeoJSON as GeoJSONLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  // GeoJSON data for Pakistan's administrative districts
  const pakistanDistrictsGeoJSON = {
    type: "FeatureCollection",
    features: [
      // Punjab districts
      {
        type: "Feature",
        properties: { name: "Lahore", province: "Punjab" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [74.2, 31.5],
              [74.4, 31.5],
              [74.4, 31.7],
              [74.2, 31.7],
              [74.2, 31.5],
            ],
          ],
        },
      },
      {
        type: "Feature",
        properties: { name: "Faisalabad", province: "Punjab" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [72.9, 31.3],
              [73.2, 31.3],
              [73.2, 31.6],
              [72.9, 31.6],
              [72.9, 31.3],
            ],
          ],
        },
      },
      // Sindh districts
      {
        type: "Feature",
        properties: { name: "Karachi", province: "Sindh" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [67.0, 24.8],
              [67.3, 24.8],
              [67.3, 25.0],
              [67.0, 25.0],
              [67.0, 24.8],
            ],
          ],
        },
      },
      // KP districts
      {
        type: "Feature",
        properties: { name: "Peshawar", province: "KP" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [71.5, 34.0],
              [71.7, 34.0],
              [71.7, 34.2],
              [71.5, 34.2],
              [71.5, 34.0],
            ],
          ],
        },
      },
      // Balochistan districts
      {
        type: "Feature",
        properties: { name: "Quetta", province: "Balochistan" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [66.9, 30.2],
              [67.1, 30.2],
              [67.1, 30.4],
              [66.9, 30.4],
              [66.9, 30.2],
            ],
          ],
        },
      },
    ],
  };

  // Style function for districts - black borders, no fill
  const geoJSONStyle = () => {
    return {
      fillColor: "transparent",
      weight: 2,
      opacity: 1,
      color: "#000",
      fillOpacity: 0,
    };
  };

  // Handle feature interactions
  const onEachFeature = (feature, layer) => {
    layer.on("mouseover", function () {
      this.setStyle({
        weight: 3,
      });
    });
    layer.on("mouseout", function () {
      this.setStyle({
        weight: 2,
      });
    });
  };

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
          <GeoJSONLayer
            data={pakistanDistrictsGeoJSON}
            style={geoJSONStyle}
            onEachFeature={onEachFeature}
          />
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
