import { useEffect, useMemo, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GEOJSON_SOURCES = [
  "/data/pakistan-districts.geojson",
  "https://raw.githubusercontent.com/codeforpakistan/data/master/geo/pakistan_districts.geojson",
];

const pickLabel = (feature, keys, fallback = "Unknown") => {
  for (const key of keys) {
    const value = feature?.properties?.[key];
    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }
  return fallback;
};

function FitToGeoJson({ data }) {
  const map = useMap();

  useEffect(() => {
    if (!data?.features?.length) return;

    const layer = L.geoJSON(data);
    const bounds = layer.getBounds();

    if (bounds.isValid()) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [data, map]);

  return null;
}

function Map() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadGeoJson = async () => {
      setIsLoading(true);
      setError("");

      for (const source of GEOJSON_SOURCES) {
        try {
          const response = await fetch(source);
          if (!response.ok) {
            continue;
          }

          const data = await response.json();
          if (!ignore && data?.features?.length) {
            setGeoJsonData(data);
            setIsLoading(false);
            return;
          }
        } catch {
          // Try next source
        }
      }

      if (!ignore) {
        setError(
          "Could not load Pakistan boundaries. Add public/data/pakistan-districts.geojson in your project to render divisions reliably."
        );
        setIsLoading(false);
      }
    };

    loadGeoJson();

    return () => {
      ignore = true;
    };
  }, []);

  const divisionColors = useMemo(
    () => ["#93c5fd", "#60a5fa", "#fbbf24", "#ef4444", "#bae6fd", "#1d4ed8"],
    []
  );

  const styleFeature = (feature) => {
    const key = pickLabel(
      feature,
      ["division", "division_name", "district", "district_name", "adm2_en", "name"],
      "unknown"
    );

    let hash = 0;
    for (let i = 0; i < key.length; i += 1) {
      hash = key.charCodeAt(i) + ((hash << 5) - hash);
    }

    return {
      fillColor: divisionColors[Math.abs(hash) % divisionColors.length],
      fillOpacity: 0.8,
      color: "#111827",
      weight: 1.6,
      opacity: 1,
    };
  };

  const onEachFeature = (feature, layer) => {
    const district = pickLabel(feature, ["district", "district_name", "adm2_en", "name"]);
    const division = pickLabel(feature, ["division", "division_name"], "N/A");

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({ weight: 2.2, fillOpacity: 0.95 });
      },
      mouseout: (event) => {
        event.target.setStyle(styleFeature(feature));
      },
    });

    layer.bindPopup(`<b>${district}</b><br/>Division: ${division}`);
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
        Provincial & Divisional Map (Pakistan)
      </h3>

      {isLoading && <p style={{ margin: "0 0 12px", color: "#6b7280" }}>Loading boundaries…</p>}
      {error && <p style={{ margin: "0 0 12px", color: "#b91c1c" }}>{error}</p>}

      <div style={{ borderRadius: "8px", overflow: "hidden" }}>
        <MapContainer center={[30.5, 69.2]} zoom={5} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
          />

          {geoJsonData && (
            <>
              <FitToGeoJson data={geoJsonData} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
