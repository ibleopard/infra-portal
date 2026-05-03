import { damageLibrary } from "../data/damageLibrary";
import { useState } from "react";

function DamageLibrary() {
  const [expandedAsset, setExpandedAsset] = useState(null);
  const [expandedComponent, setExpandedComponent] = useState(null);
  const [expandedDamage, setExpandedDamage] = useState(null);

  return (
    <div className="damage-library">
      <h2 style={{ color: "#2e7d32" }}>Damage Type Reference Library</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Complete offline reference of all damage types, work items, and unit rates.
      </p>

      {damageLibrary.map((asset, i) => (
        <div key={asset.assetType} className="asset-section">
          <h3
            onClick={() => setExpandedAsset(expandedAsset === i ? null : i)}
            style={{
              cursor: "pointer",
              color: "#ffffff",
              marginBottom: "10px",
              padding: "12px 15px",
              backgroundColor: "#1976d2",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "16px",
              border: "2px solid #1565c0",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
              display: "inline-block",
              minWidth: "100%",
              boxSizing: "border-box"
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
                    color: "#ffffff",
                    marginBottom: "8px",
                    padding: "10px 12px",
                    backgroundColor: "#388e3c",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    border: "2px solid #2e7d32",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                    marginLeft: "15px"
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
                          color: "#ffffff",
                          marginBottom: "8px",
                          padding: "8px 10px",
                          backgroundColor: "#d32f2f",
                          borderRadius: "6px",
                          fontWeight: "bold",
                          fontSize: "14px",
                          border: "2px solid #c62828",
                          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                          transition: "all 0.2s ease",
                          marginLeft: "30px"
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
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            overflow: "hidden",
                            marginLeft: "30px",
                            marginBottom: "15px"
                          }}
                        >
                          <thead>
                            <tr style={{ backgroundColor: "#263238", color: "#ffffff" }}>
                              <th style={{ border: "1px solid #e0e0e0", padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                                Work Item Description
                              </th>
                              <th style={{ border: "1px solid #e0e0e0", padding: "12px", textAlign: "left", fontWeight: "bold" }}>
                                Unit
                              </th>
                              <th style={{ border: "1px solid #e0e0e0", padding: "12px", textAlign: "right", fontWeight: "bold" }}>
                                Rate (₹)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {damage.workItems.map((item) => (
                              <tr key={item.id} style={{ borderBottom: "1px solid #e0e0e0", backgroundColor: "#f9f9f9", transition: "background-color 0.2s" }}>
                                <td style={{ border: "1px solid #e0e0e0", padding: "10px", color: "#333" }}>
                                  {item.description}
                                </td>
                                <td style={{ border: "1px solid #e0e0e0", padding: "10px", color: "#333" }}>
                                  {item.unit}
                                </td>
                                <td
                                  style={{
                                    border: "1px solid #e0e0e0",
                                    padding: "10px",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    color: "#d32f2f",
                                    fontSize: "15px"
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
