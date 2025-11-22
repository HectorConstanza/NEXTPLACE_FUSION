import { Link, useNavigate } from "react-router-dom";
import "./SideBar.css";

export default function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirigir al home
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo-section">
        <span className="material-symbols-rounded logo-icon">event</span>
        <span className="logo-text">NextPlace</span>
        <p className="logo-sub">Organizer Dashboard</p>
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

        <Link to="/organizer/analytics" className="nav-item">
          <span className="material-symbols-rounded nav-icon">insights</span>
          <span>Analytics</span>
        </Link>

        <Link to="/organizer/asistentes" className="nav-item">
          <span className="material-symbols-rounded nav-icon">groups</span>
          <span>Asistentes</span>
        </Link>

        <Link to="/organizer/settings" className="nav-item">
          <span className="material-symbols-rounded nav-icon">settings</span>
          <span>Settings</span>
        </Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        <span className="material-symbols-rounded nav-icon">logout</span>
        <span>Log Out</span>
      </button>
    </div>
  );
}
