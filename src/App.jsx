import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Map from "./components/Map";
import CostCalculator from "./components/CostCalculator";
import DamageLibrary from "./components/DamageLibrary";

function App() {
  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Dashboard</h2>
        <SummaryCards />
        <Charts />
        <Map />
      </div>
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <CostCalculator />
        </div>
        <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
          <DamageLibrary />
        </div>
      </div>
    </div>
  );
}

export default App;
