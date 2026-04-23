import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Map from "./components/Map";

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
    </div>
  );
}

export default App;
