// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api.js";
import "./Navbar.css";
import { useSearch } from "../context/SearchContext";
import Swal from "sweetalert2";

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

  //  EVENTOS → Refrescar home
  const goToEvents = () => {
    navigate("/");
    window.location.reload(); // refresca la página
  };

  //  NEXTPLACE → refresca home sin navegar
  const reloadHome = () => {
    navigate("/");
    window.location.reload();
  };

  //  ORGANIZADORES → Validar rol
  const goToOrganizers = () => {
    if (!user) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes iniciar sesión para continuar.",
        icon: "warning",
        background: "#1c1c1c",
        color: "#ff9ad5",
        confirmButtonColor: "#ff9ad5",
      });
      return;
    }

    if (user.role !== "organizer") {
      Swal.fire({
        title: "Acceso restringido",
        text: "Solo los organizadores pueden entrar aquí.",
        icon: "error",
        background: "#1c1c1c",
        color: "#ff9ad5",
        confirmButtonColor: "#ff9ad5",
      });
      return;
    }

    navigate("/organizer");
  };

  return (
    <nav id="navbar">
      <div className="navbar-content">

        {/* LOGO */}
        <span
          className="navbar-logo"
          onClick={reloadHome}
          style={{ cursor: "pointer" }}
        >
          NextPlace
        </span>

        {/* LINKS */}
        <div className="navbar-links">
          <a onClick={goToEvents}>Eventos</a>
          <a onClick={goToOrganizers}>Organizadores</a>
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
                Log Out
              </button>
            </>
          ) : (
            <button className="sign-in-button" onClick={handleSignIn}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
