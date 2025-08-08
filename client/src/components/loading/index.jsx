import React from "react";
import "./style.scss";

function Loading({ size = "medium", text = "Đang tải..." }) {
  return (
    <div className={`loading-container ${size}`}>
      <div className="loading-spinner"></div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  );
}

export default Loading;
