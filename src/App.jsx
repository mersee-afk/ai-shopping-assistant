import { useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import ProductList from "./components/ProductList";
import productsData from "./data/products";

function App() {
  const [chatMessages, setChatMessages] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "#0f172a",
      display: "flex",
      justifyContent: "center",  
      alignItems: "center",      
    }}
  >
    {/* center column */}
    <div
      style={{
        width: "700px",         
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "10px" }}>
  AI Shopping Assistant
</h1>

      <div style={{ flex: 1, overflow: "hidden" }}>
        <ChatMessages chatMessages={chatMessages} />
      </div>

      <ProductList products={filteredProducts} />

      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        setFilteredProducts={setFilteredProducts}
        productsData={productsData}
      />
    </div>
  </div>
);
}

export default App;