import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ chatMessages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        padding: "14px",
        background: "#0b1220",
        borderRadius: "12px",
        border: "1px solid #1e293b",
      }}
    >
      {chatMessages.map((msg) => (
        <ChatMessage key={msg.id} message={msg.message} sender={msg.sender} />
      ))}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatMessages;