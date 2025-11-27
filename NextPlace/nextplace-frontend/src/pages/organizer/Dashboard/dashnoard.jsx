import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebar-title">Panel</h2>
                <nav className="sidebar-nav">
                    <Link to="/organizer/eventos">📅 Eventos</Link>
                    <Link to="/organizer/create-event">➕ Crear Evento</Link>
                    <Link to="/organizer/configuracion">⚙️ Configuración</Link>
                </nav>

            </aside>

            {/* Main content */}
            <main className="dashboard-main">
                <header className="dashboard-header">
                    <h1>Bienvenido al Dashboard</h1>
                    <p>Selecciona una sección en el menú lateral</p>
                </header>

                {/* Aquí se renderizan las rutas hijas */}
                <div className="dashboard-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
