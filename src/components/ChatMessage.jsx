function ChatMessage({ message, sender }) {
  const isUser = sender === "user";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        maxWidth: "75%",
        background: isUser ? "#2563eb" : "#1f2937",
        color: "white",
        padding: "12px 14px",
        borderRadius: "14px",
        lineHeight: "1.5",
        wordBreak: "break-word",
        border: isUser ? "1px solid #3b82f6" : "1px solid #374151",
      }}
    >
      <div
        style={{
          fontSize: "12px",
          marginBottom: "6px",
          color: isUser ? "#dbeafe" : "#9ca3af",
          fontWeight: "bold",
        }}
      >
        {isUser ? "You" : "Assistant"}
      </div>

      <div>{message}</div>
    </div>
  );
}

export default ChatMessage;