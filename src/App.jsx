import { useState } from "react";
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import Charts from "./components/Charts";
import Map from "./components/Map";
import CostCalculator from "./components/CostCalculator";
import DamageLibrary from "./components/DamageLibrary";
import DataForm from "./components/DataForm";
import FileUpload from "./components/FileUpload";
import Reports from "./components/Reports";
import { groupRecordsByDistrict, calculateDistrictSummary } from "./utils/fileUploadHandler";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadedRecords, setUploadedRecords] = useState([]);
  const [allAssessments, setAllAssessments] = useState([]);
  const [districtSummaries, setDistrictSummaries] = useState({});

  // Fetch assessments from API on mount
  React.useEffect(() => {
    fetchAssessments();
  }, []);

  // Update district summaries when records change
  React.useEffect(() => {
    const allRecords = [...uploadedRecords, ...allAssessments];
    const grouped = groupRecordsByDistrict(allRecords);
    const summaries = {};

    Object.keys(grouped).forEach((district) => {
      summaries[district] = calculateDistrictSummary(grouped[district]);
    });

    setDistrictSummaries(summaries);
  }, [uploadedRecords, allAssessments]);

  const fetchAssessments = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_BASE_URL}/api/assessments`);
      if (response.ok) {
        const data = await response.json();
        setAllAssessments(data);
      }
    } catch (err) {
      console.error('Error fetching assessments:', err);
    }
  };

  const handleFilesParsed = async (records) => {
    setUploadedRecords(records);
    
    // Automatically save all records to the database
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    for (const record of records) {
      try {
        await fetch(`${API_BASE_URL}/api/assessments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(record),
        });
      } catch (err) {
        console.error('Error saving record:', err);
      }
    }

    // Refresh assessments list
    fetchAssessments();
  };

  return (
    <div style={{ background: "#f3f4f6", minHeight: "100vh" }}>
      <Header 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        onOpenUpload={() => setShowUploadModal(true)}
      />
      
      {currentPage === "dashboard" ? (
        <div style={{ padding: "20px" }}>
          <h2>Dashboard</h2>
          <SummaryCards />
          <Charts />
          <Map districtSummaries={districtSummaries} />
          <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
            <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <CostCalculator />
            </div>
            <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px", padding: "20px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
              <DamageLibrary />
            </div>
          </div>
        </div>
      ) : currentPage === "reports" ? (
        <div style={{ padding: "20px" }}>
          <Reports uploadedRecords={uploadedRecords} allAssessments={allAssessments} />
        </div>
      ) : (
        <DataForm onRecordSaved={fetchAssessments} />
      )}

      {showUploadModal && (
        <FileUpload 
          onFilesParsed={handleFilesParsed}
          onClose={() => setShowUploadModal(false)}
        />
      )}
    </div>
  );
}

export default App;
