function SummaryCards() {
  const cards = [
    { title: "Total Submissions", value: "234" },
    { title: "Pending", value: "18" },
    { title: "Approved", value: "189" },
    { title: "Critical Cases", value: "12" },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginTop: "20px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "20px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ fontSize: "14px", color: "#555" }}>{card.title}</div>
          <div style={{ fontSize: "28px", fontWeight: "700", marginTop: "8px" }}>
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SummaryCards;
