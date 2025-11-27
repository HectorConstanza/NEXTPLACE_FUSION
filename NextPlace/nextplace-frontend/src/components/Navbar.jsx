// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";
import "./Navbar.css";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.log("Error obteniendo usuario:", err);
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const handleSignIn = () => navigate("/login");

  return (
    <nav id="navbar">
      <div className="navbar-content">

        {/* LOGO */}
        <span
          className="navbar-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          NextPlace
        </span>

        {/* LINKS */}
        <div className="navbar-links">
          <a>Eventos</a>
          <a>Organizadores</a>
          <a>Reservas</a>
        </div>

        {/* ACTIONS */}
        <div className="navbar-actions">
          <input
            type="search"
            placeholder="Buscar eventos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="nav-search-input"
          />

          {/* USER AUTH */}
          {user ? (
            <>
              <span className="navbar-user">{user.nombre}</span>

              <button className="sign-out-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="sign-in-button" onClick={handleSignIn}>
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
