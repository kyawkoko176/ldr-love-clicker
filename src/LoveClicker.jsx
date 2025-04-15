import React, { useState, useEffect } from "react";

export default function LoveClicker() {
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedClicks = localStorage.getItem("missedClicks");
    const storedMessage = localStorage.getItem("loveMessage");
    if (savedClicks) setClicks(parseInt(savedClicks, 10));
    if (storedMessage) setSavedMessage(storedMessage);
  }, []);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    localStorage.setItem("missedClicks", newClicks);
  };

  const handleSaveMessage = () => {
    setSavedMessage(message);
    localStorage.setItem("loveMessage", message);
    setMessage("");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px", padding: "10px" }}>
      <h1>💖 Thinking of You 💖</h1>
      <h2 style={{ fontSize: "20px", color: "#D946EF" }}>
        From Kyaw Ko Ko to Yeik Lay 💌
      </h2>

      <button
        onClick={handleClick}
        style={{
          fontSize: "20px",
          padding: "12px 20px",
          marginTop: "20px",
          backgroundColor: "#EC4899",
          color: "white",
          border: "none",
          borderRadius: "30px",
          cursor: "pointer"
        }}
      >
        Click when you miss your partner 💗
      </button>

      <p style={{ fontSize: "18px", marginTop: "15px" }}>
        Missed Clicks: {clicks}
      </p>

      <textarea
        placeholder="Write a sweet message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="4"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "10px",
          marginTop: "20px",
          borderRadius: "10px",
          border: "1px solid #F9A8D4"
        }}
      />

      <div>
        <button
          onClick={handleSaveMessage}
          style={{
            marginTop: "10px",
            backgroundColor: "#F472B6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "20px",
            cursor: "pointer"
          }}
        >
          💌 Save Message
        </button>
      </div>

      {savedMessage && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            border: "1px solid #FBCFE8",
            borderRadius: "12px",
            backgroundColor: "#FDF2F8",
            maxWidth: "400px",
            margin: "20px auto"
          }}
        >
          <p style={{ color: "#DB2777", fontStyle: "italic" }}>{savedMessage}</p>
        </div>
      )}
    </div>
  );
}