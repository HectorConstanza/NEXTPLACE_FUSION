import React from "react";
import "./ButtonsSections.css";

const ButtonsSection = () => {
  return (
    <div className="buttons-container">
      {["Lorem", "Lorem", "Lorem", "Lorem", "Lorem"].map((btn, idx) => (
        <button key={idx} className="custom-button">{btn}</button>
      ))}
    </div>
  );
};

export default ButtonsSection;
