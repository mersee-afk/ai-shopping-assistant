import ProductCard from "./ProductCard.jsx";

function ProductList({ products }) {
  if (products.length === 0) return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Products</h3>

      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;