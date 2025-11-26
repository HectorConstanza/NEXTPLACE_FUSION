// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind + CSS global
import { SearchProvider } from "./context/SearchContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </React.StrictMode>
);
