import React from "react";
import { useNavigate } from "react-router-dom";
import "./BackButton.css";

export default function BackButton({ label = "Regresar" }) {
  const navigate = useNavigate();

  return (
    <button className="back-btn" onClick={() => navigate(-1)}>
      ⬅ {label}
    </button>
  );
}
