function Header({ currentPage, onPageChange, onOpenUpload }) {
  return (
    <div
      style={{
        background: "#0b3c5d",
        color: "white",
        padding: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ padding: "16px 20px", fontSize: "22px", fontWeight: "600" }}>
        NDMA Infrastructure Damage Portal
      </div>
      <div style={{ display: "flex", gap: "0", alignItems: "center" }}>
        <button
          onClick={() => onPageChange("dashboard")}
          style={{
            background: currentPage === "dashboard" ? "#1e40af" : "transparent",
            color: "white",
            border: "none",
            padding: "16px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background 0.2s",
            borderBottom: currentPage === "dashboard" ? "3px solid #3b82f6" : "none",
          }}
        >
          Dashboard
        </button>
        <button
          onClick={() => onPageChange("reports")}
          style={{
            background: currentPage === "reports" ? "#1e40af" : "transparent",
            color: "white",
            border: "none",
            padding: "16px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background 0.2s",
            borderBottom: currentPage === "reports" ? "3px solid #3b82f6" : "none",
          }}
        >
          Reports
        </button>
        <button
          onClick={() => onPageChange("data-form")}
          style={{
            background: currentPage === "data-form" ? "#1e40af" : "transparent",
            color: "white",
            border: "none",
            padding: "16px 20px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "background 0.2s",
            borderBottom: currentPage === "data-form" ? "3px solid #3b82f6" : "none",
          }}
        >
          Add Assessment
        </button>
        <button
          onClick={onOpenUpload}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "12px 20px",
            margin: "8px 16px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            borderRadius: "6px",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#059669")}
          onMouseLeave={(e) => (e.target.style.background = "#10b981")}
        >
          📁 Upload Report
        </button>
      </div>
    </div>
  );
}

export default Header;
