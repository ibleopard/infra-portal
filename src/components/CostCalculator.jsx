import { useState } from "react";
import { damageLibrary } from "../data/damageLibrary";



function CostCalculator() {
  const [selectedAsset, setSelectedAsset] = useState("");
  const [selectedComponent, setSelectedComponent] = useState("");
  const [selectedDamage, setSelectedDamage] = useState("");
  const [quantities, setQuantities] = useState({});
  const [total, setTotal] = useState(null);

  // Derived options based on selections
  const assetOptions = damageLibrary;

  const componentOptions = selectedAsset
    ? damageLibrary.find(a => a.assetType === selectedAsset)?.components || []
    : [];

  const damageOptions = selectedComponent
    ? componentOptions.find(c => c.componentName === selectedComponent)?.damages || []
    : [];

  const workItems = selectedDamage
    ? damageOptions.find(d => d.damageType === selectedDamage)?.workItems || []
    : [];

  // Reset dependent selections when parent changes
  const handleAssetChange = (e) => {
    setSelectedAsset(e.target.value);
    setSelectedComponent("");
    setSelectedDamage("");
    setQuantities({});
    setTotal(null);
  };

  const handleComponentChange = (e) => {
    setSelectedComponent(e.target.value);
    setSelectedDamage("");
    setQuantities({});
    setTotal(null);
  };

  const handleDamageChange = (e) => {
    setSelectedDamage(e.target.value);
    setQuantities({});
    setTotal(null);
  };

  const handleQuantityChange = (itemId, value) => {
    setQuantities(prev => ({ ...prev, [itemId]: Number(value) || 0 }));
  };

  const calculateCost = () => {
    const sum = workItems.reduce((acc, item) => {
      const qty = quantities[item.id] || 0;
      return acc + qty * item.rate;
    }, 0);
    setTotal(sum);
  };

  return (
    <div className="calculator">
      <h2>Infrastructure Damage Cost Calculator</h2>

      {/* Cascading Dropdowns */}
      <div className="dropdown-section">
        <label htmlFor="asset-select">Asset Type:</label>
        <select
          id="asset-select"
          value={selectedAsset}
          onChange={handleAssetChange}
        >
          <option value="">-- Select Asset Type --</option>
          {assetOptions.map(asset => (
            <option key={asset.assetType} value={asset.assetType}>
              {asset.assetType}
            </option>
          ))}
        </select>

        <label htmlFor="component-select">Component:</label>
        <select
          id="component-select"
          value={selectedComponent}
          onChange={handleComponentChange}
          disabled={!selectedAsset}
        >
          <option value="">-- Select Component --</option>
          {componentOptions.map(component => (
            <option key={component.componentName} value={component.componentName}>
              {component.componentName}
            </option>
          ))}
        </select>

        <label htmlFor="damage-select">Damage Type:</label>
        <select
          id="damage-select"
          value={selectedDamage}
          onChange={handleDamageChange}
          disabled={!selectedComponent}
        >
          <option value="">-- Select Damage Type --</option>
          {damageOptions.map(damage => (
            <option key={damage.damageType} value={damage.damageType}>
              {damage.damageType}
            </option>
          ))}
        </select>
      </div>

      {/* Work Items Table */}
      {workItems.length > 0 && (
        <div className="work-items-section">
          <h3>Work Items</h3>
          <table className="work-items-table">
            <thead>
              <tr>
                <th>Work Item Description</th>
                <th>Unit</th>
                <th>Rate (₹)</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {workItems.map(item => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.unit}</td>
                  <td>{item.rate.toLocaleString()}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      value={quantities[item.id] || ""}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      placeholder="0"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Calculate Button */}
      {workItems.length > 0 && (
        <div className="button-section">
          <button onClick={calculateCost} className="calculate-btn">
            Calculate Total
          </button>
        </div>
      )}

      {/* Total Cost Display */}
      {total !== null && (
        <div className="total-section">
          <h3>Estimated Cost: ₹ {total.toLocaleString()}</h3>
        </div>
      )}
    </div>
  );
}

export default CostCalculator;
