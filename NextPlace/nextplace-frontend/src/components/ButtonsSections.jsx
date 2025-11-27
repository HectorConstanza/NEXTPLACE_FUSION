// src/components/ButtonsSections.jsx
import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "./ButtonsSections.css";

export default function ButtonsSection({ onCategorySelect, activeCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/events/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error cargando categorías", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="buttons-container">

      {/* 💗 BOTÓN TODOS */}
      <button
        className={`custom-button ${activeCategory === "Todos" ? "active" : ""}`}
        onClick={() => onCategorySelect("Todos")}
      >
        Todos
      </button>

      {/* 💗 CATEGORÍAS DINÁMICAS */}
      {categories.map((cat, idx) => (
        <button
          key={idx}
          className={`custom-button ${activeCategory === cat ? "active" : ""}`}
          onClick={() => onCategorySelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

