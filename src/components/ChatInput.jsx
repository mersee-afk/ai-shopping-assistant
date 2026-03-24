import { useState } from "react";

const USD_TO_INR = 83;

function formatPriceInRupees(priceInUsd) {
  return Math.round(priceInUsd * USD_TO_INR);
}

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

function getMatchedProducts(text, allProducts) {
  const normalizedText = text.toLowerCase().trim();

  if (!normalizedText) {
    return {
      reply: "Please type something so I can help you.",
      products: [],
    };
  }

  if (
    normalizedText.includes("hello") ||
    normalizedText.includes("hi") ||
    normalizedText.includes("hey")
  ) {
    return {
      reply:
        "Hello! Try searches like 'laptop', 'phone', 'beauty', 'Apple', 'under 50000', or 'between 20000 and 60000'.",
      products: [],
    };
  }

  if (normalizedText.includes("show all")) {
    return {
      reply: `Showing all available products.`,
      products: allProducts,
    };
  }

  const budgetRange = getBudgetRange(normalizedText);

  if (budgetRange) {
    const matchedByBudget = allProducts.filter((product) => {
      const rupeePrice = formatPriceInRupees(product.price);
      return rupeePrice >= budgetRange.min && rupeePrice <= budgetRange.max;
    });

    if (matchedByBudget.length === 0) {
      return {
        reply: "No products found for that budget range.",
        products: [],
      };
    }

    if (budgetRange.max === Infinity) {
      return {
        reply: `Here are products above ₹${budgetRange.min}.`,
        products: matchedByBudget,
      };
    }

    if (budgetRange.min > 0) {
      return {
        reply: `Here are products between ₹${budgetRange.min} and ₹${budgetRange.max}.`,
        products: matchedByBudget,
      };
    }

    return {
      reply: `Here are products under ₹${budgetRange.max}.`,
      products: matchedByBudget,
    };
  }

  const matchedProducts = allProducts.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const category = product.category?.toLowerCase() || "";
    const brand = product.brand?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";

    return (
      title.includes(normalizedText) ||
      category.includes(normalizedText) ||
      brand.includes(normalizedText) ||
      description.includes(normalizedText)
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
      "Sorry, I couldn't find matching products. Try category, brand, product name, or budget like 'under 50000'.",
    products: [],
  };
}

function ChatInput({
  allProducts,
  loading,
  error,
  setChatMessages,
  setFilteredProducts,
}) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    const trimmedText = inputText.trim();

    if (!trimmedText) return;

    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      message: trimmedText,
    };

    setChatMessages((prev) => [...prev, userMessage]);

    if (loading) {
      const loadingMessage = {
        id: crypto.randomUUID(),
        sender: "robot",
        message: "Products are still loading. Please wait a moment.",
      };

      setTimeout(() => {
        setChatMessages((prev) => [...prev, loadingMessage]);
      }, 500);

      setInputText("");
      return;
    }

    if (error) {
      const errorMessage = {
        id: crypto.randomUUID(),
        sender: "robot",
        message: "I cannot search products right now because product loading failed.",
      };

      setTimeout(() => {
        setChatMessages((prev) => [...prev, errorMessage]);
      }, 500);

      setInputText("");
      return;
    }

    const result = getMatchedProducts(trimmedText, allProducts);

    setFilteredProducts(result.products);

    const robotMessage = {
      id: crypto.randomUUID(),
      sender: "robot",
      message: result.reply,
    };

    setTimeout(() => {
      setChatMessages((prev) => [...prev, robotMessage]);
    }, 500);

    setInputText("");
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "14px",
        flexWrap: "wrap",
      }}
    >
      <input
        placeholder="Try: laptop, phone, Apple, under 50000, between 20000 and 60000"
        value={inputText}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        style={{
          flex: 1,
          minWidth: "240px",
          padding: "14px",
          background: "#0f172a",
          border: "1px solid #334155",
          color: "white",
          borderRadius: "10px",
          outline: "none",
          fontSize: "14px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "14px 20px",
          background: "#22c55e",
          border: "none",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Send
      </button>
    </div>
  );
}

export default ChatInput;