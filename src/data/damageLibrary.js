// src/data/damageLibrary.js

export const damageLibrary = [
  {
    assetType: "Roads & Pavements",
    components: [
      {
        componentName: "Bituminous Road Surface",
        damages: [
          {
            damageType: "Surface erosion / stripping",
            workItems: [
              { id: 1, description: "Traffic management & barricading", unit: "Lump Sum", rate: 5000 },
              { id: 2, description: "Cleaning of loose material", unit: "sqm", rate: 15 },
              { id: 3, description: "Tack coat application", unit: "sqm", rate: 25 },
              { id: 4, description: "Laying bituminous concrete (BC)", unit: "cum", rate: 6500 },
              { id: 5, description: "Compaction with roller", unit: "hour", rate: 3000 },
            ]
          },
          {
            damageType: "Potholes & raveling",
            workItems: [
              { id: 1, description: "Marking & cutting patch", unit: "sqm", rate: 20 },
              { id: 2, description: "Excavation to firm layer", unit: "cum", rate: 350 },
              { id: 3, description: "Tack coat on edges", unit: "sqm", rate: 25 },
              { id: 4, description: "Fill with premix BC", unit: "cum", rate: 6800 },
              { id: 5, description: "Compaction", unit: "hour", rate: 1000 },
            ]
          }
        ]
      },
      // ... other components like Road Embankment, Culvert, etc.
    ]
  },
  // ... other asset types: Bridges, Buildings, etc.
];
