import { useEffect, useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import ProductList from "./components/ProductList";
import StatusBar from "./components/StatusBar";

function App() {
  const [chatMessages, setChatMessages] = useState([
    {
      id: crypto.randomUUID(),
      sender: "robot",
      message:
        "Hello! I can help you find laptops, phones, skincare, groceries, or products by brand and budget.",
    },
  ]);

  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://dummyjson.com/products?limit=50");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setAllProducts(data.products || []);
      } catch (err) {
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "92vh",
          display: "flex",
          flexDirection: "column",
          color: "white",
          background: "#111827",
          borderRadius: "18px",
          padding: "20px",
          boxSizing: "border-box",
          border: "1px solid #1f2937",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        }}
      >
        <h1 style={{ textAlign: "center", margin: "0 0 14px 0" }}>
          AI Shopping Assistant
        </h1>

        <p
          style={{
            textAlign: "center",
            marginTop: 0,
            color: "#94a3b8",
            fontSize: "14px",
          }}
        >
          Chat-based shopping assistant with real API data, filtering, and smart replies
        </p>

        <StatusBar
          loading={loading}
          error={error}
          totalProducts={allProducts.length}
          filteredCount={filteredProducts.length}
        />

        <div style={{ flex: 1, overflow: "hidden", marginTop: "12px" }}>
          <ChatMessages chatMessages={chatMessages} />
        </div>

        <ProductList
          products={filteredProducts}
          loading={loading}
          error={error}
        />

        <ChatInput
          allProducts={allProducts}
          loading={loading}
          error={error}
          setChatMessages={setChatMessages}
          setFilteredProducts={setFilteredProducts}
        />
      </div>
    </div>
  );
}

export default App;