import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ chatMessages }) {
  const bottomRef = useRef(null);

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]); // auto scroll when message adds

  return (
    <div
  style={{
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "10px",
    background: "#111827",
    borderRadius: "10px",
  }}
>
      {chatMessages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg.message}
          sender={msg.sender}
        />
      ))}

      {/* invisible scroll target */}
      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatMessages;