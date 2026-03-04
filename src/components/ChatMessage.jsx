function ChatMessage({ message, sender }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: sender === "user" ? "flex-end" : "flex-start",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          background: sender === "user" ? "#2563eb" : "#374151",
          color: "white",
          padding: "10px 14px",
          borderRadius: "12px",
          maxWidth: "70%",
        }}
      >
        {message}
      </div>
    </div>
  );
}

export default ChatMessage;