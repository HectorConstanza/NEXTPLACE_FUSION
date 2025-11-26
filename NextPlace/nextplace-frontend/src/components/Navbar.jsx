
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js"; // helper axios con baseURL
import "./Navbar.css";
import { useSearch } from "../context/SearchContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // si no hay token, no hay sesión

      try {
        const res = await API.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error al obtener usuario", err);
        // si el token es inválido, limpiar sesión
        localStorage.removeItem("token");
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav id="navbar">
      <div className="navbar-content">
        {/* Logo */}
        <a href="#" className="navbar-logo">
          NextPlace
        </a>

        {/* Links */}
        <div className="navbar-links flex">
          <a href="#">Eventos</a>
          <a href="#">Organizadores</a>
          <a href="#">Reservas</a>
        </div>

        {/* Acciones (incluye búsqueda) */}
        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div className="navbar-search" style={{ display: "flex", alignItems: "center" }}>
            <input
              type="search"
              placeholder="Buscar eventos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="nav-search-input"
              aria-label="Buscar eventos"
              style={{ padding: "0.4rem 0.5rem", borderRadius: 6, border: "1px solid #ddd" }}
            />
          </div>
          
          
          
        
        
          {user ? (
            <>
              <span className="navbar-user"> {user.nombre}</span>
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
};

export default Navbar;
