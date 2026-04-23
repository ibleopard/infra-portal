import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Charts() {
  // Sample data for damage by province
  const damageData = [
    { province: "Ontario", damage: 45 },
    { province: "Quebec", damage: 38 },
    { province: "British Columbia", damage: 32 },
    { province: "Alberta", damage: 28 },
    { province: "Manitoba", damage: 22 },
    { province: "Saskatchewan", damage: 18 },
  ];

  // Sample data for status distribution
  const statusData = [
    { name: "Pending", value: 18, fill: "#fbbf24" },
    { name: "Approved", value: 189, fill: "#10b981" },
    { name: "Critical", value: 12, fill: "#ef4444" },
  ];

  return (
    <div
      style={{
        marginTop: "30px",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "20px",
      }}
    >
      {/* Bar Chart */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0", color: "#1f2937", fontSize: "18px" }}>
          Damage by Province
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={damageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="province" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="damage" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          border: "1px solid #e5e7eb",
        }}
      >
        <h3 style={{ margin: "0 0 20px 0", color: "#1f2937", fontSize: "18px" }}>
          Submission Status
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={(entry) => `${entry.name}: ${entry.value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
