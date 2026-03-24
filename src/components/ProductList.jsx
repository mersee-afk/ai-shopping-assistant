import ProductCard from "./ProductCard";

function ProductList({ products, loading, error }) {
  if (loading) {
    return (
      <div style={{ marginTop: "18px" }}>
        <h3 style={{ marginBottom: "10px" }}>Products</h3>
        <div
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#0b1220",
            border: "1px solid #1e293b",
            color: "#cbd5e1",
          }}
        >
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ marginTop: "18px" }}>
        <h3 style={{ marginBottom: "10px" }}>Products</h3>
        <div
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#2a0f0f",
            border: "1px solid #7f1d1d",
            color: "#fecaca",
          }}
        >
          {error}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ marginTop: "18px" }}>
        <h3 style={{ marginBottom: "10px" }}>Products</h3>
        <div
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "#0b1220",
            border: "1px solid #1e293b",
            color: "#94a3b8",
          }}
        >
          No matching products yet. Search by category, brand, product name, or budget.
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "18px" }}>
      <h3 style={{ marginBottom: "10px" }}>Products</h3>

      <div
        style={{
          maxHeight: "240px",
          overflowY: "auto",
          paddingRight: "4px",
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;