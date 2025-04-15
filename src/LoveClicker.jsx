import React, { useState, useEffect } from "react";

const LoveClicker = () => {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    const savedClicks = localStorage.getItem("missedClicks");
    if (savedClicks) setClicks(parseInt(savedClicks, 10));
  }, []);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    localStorage.setItem("missedClicks", newClicks);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>💖 Thinking of You 💖</h1>
      <h2 style={{ fontSize: "20px", marginTop: "10px", color: "#D946EF" }}>
        From Kyaw Ko Ko to Yeik Lay 💌
      </h2>
      <button
        onClick={handleClick}
        style={{
          fontSize: "20px",
          padding: "10px 20px",
          marginTop: "20px",
          backgroundColor: "#EC4899",
          color: "white",
          border: "none",
          borderRadius: "25px",
        }}
      >
        Click when you miss your partner 💗
      </button>
      <p style={{ fontSize: "18px", marginTop: "15px" }}>
        Missed Clicks: {clicks}
      </p>
    </div>
  );
};

export default LoveClicker;
