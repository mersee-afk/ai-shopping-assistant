const USD_TO_INR = 83;

function ProductCard({ product }) {
  const priceInRupees = Math.round(product.price * USD_TO_INR);

  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        padding: "15px",
        borderRadius: "12px",
        background: "#1f2937",
        marginBottom: "12px",
        alignItems: "center",
        border: "1px solid #374151",
      }}
    >
      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "90px",
          height: "70px",
          objectFit: "cover",
          borderRadius: "8px",
          background: "#e5e7eb",
        }}
      />

      <div style={{ flex: 1 }}>
        <h3 style={{ margin: "0 0 6px 0", fontSize: "16px" }}>
          {product.title}
        </h3>

        <p style={{ margin: "0 0 6px 0", color: "#9ca3af", fontSize: "14px" }}>
          Brand: {product.brand || "N/A"}
        </p>

        <p style={{ margin: "0 0 6px 0", color: "#9ca3af", fontSize: "14px" }}>
          Category: {product.category}
        </p>

        <p style={{ margin: 0, color: "#86efac", fontWeight: "bold" }}>
          ₹{priceInRupees.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;