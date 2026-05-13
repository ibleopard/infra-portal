import { useEffect, useState } from "react";
import { GeoJSON, MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GEOJSON_SOURCES = [
  "/data/pakistan-districts.geojson",
  //"https://raw.githubusercontent.com/codeforpakistan/data/master/geo/pakistan_districts.geojson",
];
const JAMMU_DIVISION = {
  type: "Feature",
  properties: {
    NAME_0: "Pakistan",
    NAME_1: "Jammu and Kashmir",
    NAME_2: "Jammu Division",
    NAME_3: "Jammu Division",
    TYPE_3: "Division",
    ENGTYPE_3: "Division",
    SOURCE: "manual-approximate",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [74.25, 32.35],
        [75.00, 32.35],
        [75.75, 32.55],
        [76.30, 32.90],
        [76.95, 33.20],
        [76.95, 33.75],
        [76.55, 34.05],
        [75.90, 34.10],
        [75.25, 34.00],
        [74.70, 33.80],
        [74.30, 33.50],
        [73.85, 33.30],
        [73.65, 32.95],
        [74.25, 32.35],
      ],
    ],
  },
};

const KASHMIR_DIVISION = {
  type: "Feature",
  properties: {
    NAME_0: "Pakistan",
    NAME_1: "Jammu and Kashmir",
    NAME_2: "Kashmir Division",
    NAME_3: "Kashmir Division",
    TYPE_3: "Division",
    ENGTYPE_3: "Division",
    SOURCE: "manual-approximate",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [73.75, 33.65],
        [74.35, 33.75],
        [75.10, 33.90],
        [75.65, 34.10],
        [75.95, 34.45],
        [75.80, 34.95],
        [75.20, 35.25],
        [74.50, 35.20],
        [73.95, 34.95],
        [73.60, 34.55],
        [73.50, 34.10],
        [73.75, 33.65],
      ],
    ],
  },
};

const LADAKH_DIVISION = {
  type: "Feature",
  properties: {
    NAME_0: "Pakistan",
    NAME_1: "Ladakh",
    NAME_2: "Ladakh Division",
    NAME_3: "Ladakh Division",
    TYPE_3: "Division",
    ENGTYPE_3: "Division",
    SOURCE: "manual-approximate",
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [75.60, 32.95],
        [76.30, 33.20],
        [77.10, 33.45],
        [78.00, 33.75],
        [78.95, 34.05],
        [79.60, 34.55],
        [79.70, 35.25],
        [78.90, 35.75],
        [77.95, 35.90],
        [77.10, 35.65],
        [76.35, 35.20],
        [75.80, 34.65],
        [75.55, 34.00],
        [75.60, 32.95],
      ],
    ],
  },
};
const MANUAL_DISTRICT_FEATURES = [
  JAMMU_DIVISION,
  KASHMIR_DIVISION,
  LADAKH_DIVISION,
];

const DISTRICT_BOUNDARY_REPLACEMENTS = {
  "Jammu Division": JAMMU_DIVISION.geometry,
  "Kashmir Division": KASHMIR_DIVISION.geometry,
  "Ladakh Division": LADAKH_DIVISION.geometry,
};

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

function Map({ districtSummaries = {} }) {
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
          const correctedData = {
            ...data,
            features: data.features.map((feature) => {
              const currentDistrict = feature?.properties?.NAME_3;
              const boundaryFix = DISTRICT_BOUNDARY_REPLACEMENTS[currentDistrict];

              if (!boundaryFix) return feature;

              return {
                ...feature,
                properties: {
                  ...feature.properties,
                  SOURCE: "boundary-corrected-in-code",
                },
                geometry: boundaryFix,
              };
            }),
          };

          setGeoJsonData(correctedData);
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

  const styleFeature = (feature) => {
    // Check if this is Jammu & Kashmir or Gilgit-Baltistan
    const isJK = 
      feature?.properties?.NAME_1?.includes("Gilgit") || 
      feature?.properties?.NAME_1?.includes("Baltistan") ||
      feature?.properties?.NAME_0?.includes("Kashmir");
    
    if (isJK) {
      return {
        fillColor: "transparent",
        fillOpacity: 0,
        color: "#dc2626",
        weight: 2.5,
        opacity: 1,
        dashArray: "5, 5",
      };
    }

    // Get district summary if available
    const district = pickLabel(feature, ["NAME_3", "district", "name"], "Unknown");
    const summary = districtSummaries[district];
    
    // Apply color based on assessment count
    let fillColor = "transparent";
    let fillOpacity = 0;
    
    if (summary) {
      const recordCount = summary.count || 0;
      if (recordCount > 10) {
        fillColor = "#dc2626";
        fillOpacity = 0.3;
      } else if (recordCount > 5) {
        fillColor = "#f59e0b";
        fillOpacity = 0.3;
      } else if (recordCount > 0) {
        fillColor = "#10b981";
        fillOpacity = 0.3;
      }
    }

    return {
      fillColor,
      fillOpacity,
      color: "#1f2937",
      weight: 1.5,
      opacity: 0.8,
    };
  };

  const onEachFeature = (feature, layer) => {
    const district = pickLabel(feature, ["NAME_3", "district", "name"], "Unknown");
    const province = pickLabel(feature, ["NAME_1", "division", "province"], "N/A");
    const summary = districtSummaries[district];

    let popupContent = `<b>${district}</b><br/>Province: ${province}`;

    if (summary) {
      popupContent += `<br/><hr style="margin: 6px 0;"/>`;
      popupContent += `<strong>Assessment Summary:</strong><br/>`;
      popupContent += `Records: <strong>${summary.count}</strong><br/>`;
      popupContent += `Total Cost: <strong>${summary.totalCost}</strong><br/>`;
      popupContent += `Avg Cost: <strong>${summary.averageCost}</strong>`;

      if (Object.keys(summary.damageBreakdown || {}).length > 0) {
        popupContent += `<br/><strong>Damage Types:</strong><br/>`;
        Object.entries(summary.damageBreakdown).forEach(([type, count]) => {
          popupContent += `${type}: ${count}<br/>`;
        });
      }
    }

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({ 
          weight: 2.5, 
          color: "#ef4444",
          fillOpacity: (districtSummaries[district]?.count || 0) > 0 ? 0.5 : 0
        });
      },
      mouseout: (event) => {
        event.target.setStyle(styleFeature(feature));
      },
      click: (event) => {
        event.target.openPopup();
      }
    });

    layer.bindPopup(popupContent, {
      maxWidth: 300,
      className: 'district-summary-popup'
    });
  };
const mergedGeoJsonData = geoJsonData
  ? {
      ...geoJsonData,
      features: [
        ...(geoJsonData.features || []),
        ...MANUAL_DISTRICT_FEATURES,
      ],
    }
  : null;

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

      <div
        style={{
          margin: "0 0 15px",
          display: "flex",
          gap: "20px",
          fontSize: "12px",
          color: "#374151",
          flexWrap: "wrap"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "20px",
              height: "2px",
              background: "#1f2937",
              borderRadius: "1px",
            }}
          />
          Districts
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <svg width="20" height="2" style={{ display: "block" }}>
            <line x1="0" y1="1" x2="20" y2="1" stroke="#dc2626" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
          Jammu & Kashmir (Gilgit-Baltistan)
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", background: "#dc2626", opacity: 0.3, borderRadius: "2px" }} />
          10+ Assessments
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", background: "#f59e0b", opacity: 0.3, borderRadius: "2px" }} />
          5-10 Assessments
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "16px", background: "#10b981", opacity: 0.3, borderRadius: "2px" }} />
          1-4 Assessments
        </div>
      </div>

      <div style={{ borderRadius: "8px", overflow: "hidden" }}>
        <MapContainer center={[30.5, 69.2]} zoom={5} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; CARTO'
          />

          {mergedGeoJsonData && (
          <>
            <GeoJSON
              key={mergedGeoJsonData.features.length}
              data={mergedGeoJsonData}
              style={styleFeature}
              onEachFeature={onEachFeature}
            />
            <FitToGeoJson data={mergedGeoJsonData} />
          </>
           )}
        </MapContainer>
      </div>
    </div>
  );
}

export default Map;
