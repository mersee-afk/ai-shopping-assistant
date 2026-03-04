import { useState } from "react";

function ChatInput({
  chatMessages,
  setChatMessages,
  setFilteredProducts,
  productsData
}) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    setInputText(event.target.value);
  }

function sendMessage() {
  if (!inputText.trim()) return;

  const userMessage = {
    message: inputText,
    sender: "user",
    id: crypto.randomUUID(),
  };

  const updatedMessages = [...chatMessages, userMessage];
  setChatMessages(updatedMessages);

  const text = inputText.toLowerCase();

  let botReply = "Sorry, I didn't understand. Try laptop, phone or budget.";

  let matchedProducts = [];

  // Greeting
  if (text.includes("hello") || text.includes("hi")) {
    botReply = "Hello! I can help you find laptops, phones, or accessories.";
  }

  // Category search
  else if (text.includes("laptop")) {
    matchedProducts = productsData.filter(
      (p) => p.category === "laptop"
    );
    botReply = "Here are some laptops you may like.";
  }

  else if (text.includes("phone")) {
    matchedProducts = productsData.filter(
      (p) => p.category === "phone"
    );
    botReply = "Here are some phones for you.";
  }

  // Brand search
  else if (text.includes("hp") || text.includes("dell") || text.includes("lenovo")) {
    matchedProducts = productsData.filter((p) =>
      text.includes(p.brand)
    );
    botReply = "Showing products by your selected brand.";
  }

  // Budget search
  else if (text.includes("under")) {
    const priceMatch = text.match(/\d+/);
    if (priceMatch) {
      const budget = Number(priceMatch[0]);

      matchedProducts = productsData.filter(
        (p) => p.price <= budget
      );

      botReply = `Here are products under ₹${budget}.`;
    }
  }

  setFilteredProducts(matchedProducts);

  const robotMessage = {
    message: botReply,
    sender: "robot",
    id: crypto.randomUUID(),
  };

  setTimeout(() => {
    setChatMessages([...updatedMessages, robotMessage]);
  }, 500);

  setInputText("");
}

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        marginTop: "10px", //spacing fix
      }}
    >
      <input
        placeholder="Send message..."
        value={inputText}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        style={{
          flex: 1,
          padding: "12px",
          background: "#111827",
          border: "1px solid #374151",
          color: "white",
          borderRadius: "8px",
          outline: "none",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "12px 18px",
          background: "#22c55e",
          border: "none",
          color: "white",
          borderRadius: "8px",
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