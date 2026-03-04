function ProductCard({ product }) {
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
        border: "1px solid #374151"
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "90px",
          height: "70px",
          objectFit: "cover",
          borderRadius: "8px"
        }}
      />

      <div>
        <h3 style={{ margin: 0 }}>{product.name}</h3>
        <p style={{ margin: "5px 0", color: "#9ca3af" }}>
          {product.price}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;