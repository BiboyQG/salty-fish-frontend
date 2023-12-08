import React, { useState, useEffect, useRef } from "react";
import "./Chatbox.css"; // Ensure you have the corresponding CSS file

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // New state to track if chatbox is minimized
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      const newMessage = { author: "user", text: input };
      setMessages([...messages, newMessage]);
      setIsTyping(true); // Set bot as typing
      const response = await fetch("https://salty-fish-api.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setIsTyping(false); // Reset bot typing status
      setMessages([
        ...messages,
        newMessage,
        { author: "bot", text: data.reply },
      ]);
      setInput("");
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chatbox ${isMinimized ? "minimized" : ""}`}>
      <button onClick={toggleMinimize}>
        {isMinimized ? "Maximize" : "Minimize"}
      </button>
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.author}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-status">The Salty Fish Bot is typing...</div>
        )}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling reference */}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatbox;
