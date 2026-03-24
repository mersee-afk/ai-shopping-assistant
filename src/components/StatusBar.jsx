function StatusBar({ loading, error, totalProducts, filteredCount }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        marginTop: "4px",
      }}
    >
      <div
        style={{
          padding: "8px 12px",
          borderRadius: "999px",
          background: "#1e293b",
          fontSize: "13px",
          color: "#cbd5e1",
        }}
      >
        {loading ? "Status: Loading..." : "Status: Ready"}
      </div>

      <div
        style={{
          padding: "8px 12px",
          borderRadius: "999px",
          background: "#1e293b",
          fontSize: "13px",
          color: "#cbd5e1",
        }}
      >
        Total Products: {totalProducts}
      </div>

      <div
        style={{
          padding: "8px 12px",
          borderRadius: "999px",
          background: "#1e293b",
          fontSize: "13px",
          color: "#cbd5e1",
        }}
      >
        Matched Results: {filteredCount}
      </div>

      {error && (
        <div
          style={{
            padding: "8px 12px",
            borderRadius: "999px",
            background: "#7f1d1d",
            fontSize: "13px",
            color: "#fecaca",
          }}
        >
          API Error
        </div>
      )}
    </div>
  );
}

export default StatusBar;