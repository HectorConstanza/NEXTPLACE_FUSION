import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SideBar.css";

export default function SideBar() {
  const navigate = useNavigate();
  const [organizerName, setOrganizerName] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      setOrganizerName(user.nombre || "Organizer");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  // 🔥 Cerrar sesión cuando tocan NEXTPLACE
  const handleGoHomeAndLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo-section">

        {/* 🔥 NEXTPLACE clickeable → home + logout */}
        <span
          className="logo-text"
          style={{ cursor: "pointer" }}
          onClick={handleGoHomeAndLogout}
        >
          NextPlace
        </span>

        {/* 🔥 Nombre del organizador */}
        <span className="organizer-name-badge">
          {organizerName}
        </span>

        <p className="logo-sub">Dashboard Organizador</p>
      </div>

      <nav className="nav-menu">
        <Link to="/organizer" className="nav-item">
          <span className="material-symbols-rounded nav-icon">folder</span>
          <span>Mis Eventos</span>
        </Link>

        <Link to="/organizer/crear-evento" className="nav-item">
          <span className="material-symbols-rounded nav-icon">add_circle</span>
          <span>Crear Evento</span>
        </Link>
      </nav>

      {/* Botón de logout normal */}
      <button className="logout-btn" onClick={handleLogout}>
        <span className="material-symbols-rounded nav-icon">logout</span>
        <span>Log Out</span>
      </button>
    </div>
  );
}
