import { damageLibrary } from "../data/damageLibrary";
import { useState } from "react";

function DamageLibrary() {
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [expandedDamage, setExpandedDamage] = useState(null);

  return (
    <div className="damage-library">
      <h2>Damage Type Reference Library</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Complete offline reference of all damage types, work items, and unit rates.
      </p>

      {damageLibrary.map((asset, i) => (
        <div key={asset.assetType} className="asset-section">
          <h3
            onClick={() => setExpandedAsset(expandedAsset === i ? null : i)}
            style={{
              cursor: "pointer",
              color: "blue",
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#e3f2fd",
              borderRadius: "4px",
              fontWeight: "bold"
            }}
          >
            {expandedAsset === i ? "▼" : "▶"} {asset.assetType}
          </h3>

          {expandedAsset === i &&
            asset.components.map((comp, j) => (
              <div key={comp.componentName} style={{ marginLeft: 20, marginBottom: "15px" }}>
                <h4
                  onClick={() =>
                    setExpandedComponent(
                      expandedComponent === `${i}-${j}` ? null : `${i}-${j}`
                    )
                  }
                  style={{
                    cursor: "pointer",
                    color: "darkgreen",
                    marginBottom: "8px",
                    padding: "8px",
                    backgroundColor: "#f1f8e9",
                    borderRadius: "4px",
                    fontWeight: "bold"
                  }}
                >
                  {expandedComponent === `${i}-${j}` ? "▼" : "▶"} {comp.componentName}
                </h4>

                {expandedComponent === `${i}-${j}` &&
                  comp.damages.map((damage, k) => (
                    <div key={damage.damageType} style={{ marginLeft: 20, marginBottom: "10px" }}>
                      <h5
                        onClick={() =>
                          setExpandedDamage(
                            expandedDamage === `${i}-${j}-${k}` ? null : `${i}-${j}-${k}`
                          )
                        }
                        style={{
                          cursor: "pointer",
                          color: "maroon",
                          marginBottom: "8px",
                          padding: "6px",
                          backgroundColor: "#fce4ec",
                          borderRadius: "4px",
                          fontWeight: "bold"
                        }}
                      >
                        {expandedDamage === `${i}-${j}-${k}` ? "▼" : "▶"} {damage.damageType}
                      </h5>

                      {expandedDamage === `${i}-${j}-${k}` && (
                        <table
                          style={{
                            borderCollapse: "collapse",
                            width: "100%",
                            marginTop: "8px",
                            backgroundColor: "#fff"
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#f5f5f5" }}>
                              <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>
                                Work Item Description
                              </th>
                              <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "left" }}>
                                Unit
                              </th>
                              <th style={{ border: "1px solid #ddd", padding: "10px", textAlign: "right" }}>
                                Rate (₹)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {damage.workItems.map((item) => (
                              <tr key={item.id} style={{ borderBottom: "1px solid #ddd" }}>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                  {item.description}
                                </td>
                                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                                  {item.unit}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #ddd",
                                    padding: "8px",
                                    textAlign: "right",
                                    fontWeight: "bold"
                                  }}
                                >
                                  {item.rate.toLocaleString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                  ))}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default DamageLibrary;
