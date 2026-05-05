import { useState } from "react";

const USD_TO_INR = 83;

// 💰 Convert USD to INR
function formatPriceInRupees(priceInUsd) {
  return Math.round(priceInUsd * USD_TO_INR);
}

// 💰 Budget parser
function getBudgetRange(text) {
  const betweenMatch = text.match(/between\s+(\d+)\s+and\s+(\d+)/i);
  if (betweenMatch) {
    return {
      min: Number(betweenMatch[1]),
      max: Number(betweenMatch[2]),
    };
  }

  const underMatch = text.match(/under\s+(\d+)/i);
  if (underMatch) {
    return {
      min: 0,
      max: Number(underMatch[1]),
    };
  }

  const aboveMatch = text.match(/above\s+(\d+)/i);
  if (aboveMatch) {
    return {
      min: Number(aboveMatch[1]),
      max: Infinity,
    };
  }

  return null;
}

// 🔍 MAIN SEARCH FUNCTION
function getMatchedProducts(text, allProducts) {
  const normalizedText = text.toLowerCase().trim();

  if (!normalizedText) {
    return {
      reply: "Please type something so I can help you.",
      products: [],
    };
  }

  // 👋 Greeting
  if (
    normalizedText.includes("hello") ||
    normalizedText.includes("hi") ||
    normalizedText.includes("hey")
  ) {
    return {
      reply:
        "Hello! Try searches like 'laptop', 'phone', 'electronics', 'men', or 'under 50000'.",
      products: [],
    };
  }

  // 📦 Show all
  if (normalizedText.includes("show all")) {
    return {
      reply: "Showing all available products.",
      products: allProducts,
    };
  }

  // 💰 Budget filtering
  const budgetRange = getBudgetRange(normalizedText);

  if (budgetRange) {
    const matchedByBudget = allProducts.filter((product) => {
      const rupeePrice = formatPriceInRupees(product.price);
      return (
        rupeePrice >= budgetRange.min &&
        rupeePrice <= budgetRange.max
      );
    });

    if (matchedByBudget.length === 0) {
      return {
        reply: "No products found for that budget range.",
        products: [],
      };
    }

    return {
      reply: `Found ${matchedByBudget.length} product(s) in your budget.`,
      products: matchedByBudget,
    };
  }

  // 🔥 SMART CATEGORY MAPPING (IMPORTANT)
  const synonyms = {
    laptop: "electronics",
    phone: "electronics",
    mobile: "electronics",
  };

  const searchText = synonyms[normalizedText] || normalizedText;

  // 🔍 FILTER LOGIC
  const matchedProducts = allProducts.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";

    return (
      title.includes(searchText) ||
      category.includes(searchText)
    );
  });

  if (matchedProducts.length > 0) {
    return {
      reply: `I found ${matchedProducts.length} matching product(s) for "${text}".`,
      products: matchedProducts,
    };
  }

  return {
    reply:
      "Sorry, I couldn't find matching products. Try 'electronics', 'men', 'jewelery', or 'under 50000'.",
    products: [],
  };
}

// 🧩 COMPONENT
function ChatInput({
  allProducts,
  loading,
  error,
  setChatMessages,
  setFilteredProducts,
}) {
  const [inputText, setInputText] = useState("");

  function sendMessage() {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    // 👤 User message
    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      message: trimmedText,
    };

    setChatMessages((prev) => [...prev, userMessage]);

    // ⏳ Loading check
    if (loading) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "robot",
          message: "Products are loading...",
        },
      ]);
      setInputText("");
      return;
    }

    // ❌ Error check
    if (error) {
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "robot",
          message: "Unable to fetch products right now.",
        },
      ]);
      setInputText("");
      return;
    }

    // 🔍 Get results
    const result = getMatchedProducts(trimmedText, allProducts);

    setFilteredProducts(result.products);

    // 🤖 Bot reply
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "robot",
          message: result.reply,
        },
      ]);
    }, 400);

    setInputText("");
  }

  return (
    <div style={{ display: "flex", gap: "10px", marginTop: "14px" }}>
      <input
        placeholder="Try: laptop, phone, electronics, men, under 50000"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        style={{
          flex: 1,
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "12px 18px",
          background: "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;