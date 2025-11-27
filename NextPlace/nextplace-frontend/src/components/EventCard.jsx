// src/components/EventCard/EventCard.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./EventCard.css";

export default function EventCard({
  id,
  image,
  titulo,
  fecha,
  hora,
  categoria,
  cuposDispo,
  estado,
  onDelete,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Saber si estamos en dashboard de organizador
  const mode = pathname.startsWith("/organizer") ? "my-events" : "public";

  // Formato fecha
  const formattedDate = fecha
    ? new Date(fecha).toLocaleDateString("es-ES")
    : "";

  // Formato categoría (capitalización bonita)
  const formattedCategory =
    categoria?.charAt(0).toUpperCase() + categoria?.slice(1).toLowerCase();

  const TAG_STYLES = {
    próximamente: "tag tag-próximamente",
    "en curso": "tag tag-en curso",
    finalizado: "tag tag-finalizado",
    disponible: "tag tag-disponible",
    agotado: "tag tag-agotado",
  };

  // ❗Eliminar con SweetAlert
  const confirmDelete = () => {
    Swal.fire({
      title: "¿Eliminar este evento?",
      text: "Esta acción no es reversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: "#1c1c1c",
      color: "#fff",
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete && onDelete(id);

        Swal.fire({
          title: "Evento eliminado",
          text: "El evento fue eliminado correctamente.",
          icon: "success",
          timer: 1700,
          showConfirmButton: false,
          background: "#1c1c1c",
          color: "#fff",
        });
      }
    });
  };

  return (
    <div className="card">
      {/* 🔥 Categoría (bien formateada siempre) */}
      <div className="category-badge">{formattedCategory}</div>

      {/* 🔥 Estado siempre visible */}
      <div className={TAG_STYLES[estado] || "tag"}>{estado}</div>

      <img
        src={image || "/src/assets/images/ejemplo.jpg"}
        alt={titulo}
        className="card-image"
      />

      <div className="card-content">
        <p className="title">{titulo}</p>

        {/* Fecha */}
        <div className="info-line">
          <span className="material-symbols-rounded info-icon">
            calendar_month
          </span>
          <span>{formattedDate}</span>
        </div>

        {/* Hora */}
        <div className="info-line">
          <span className="material-symbols-rounded info-icon">schedule</span>
          <span>{hora}</span>
        </div>

        {/* Cupos */}
        <div className="info-line">
          <span className="material-symbols-rounded info-icon">groups</span>
          <span>{cuposDispo} disponibles</span>
        </div>

        {/* PUBLIC MODE → RESERVAR */}
        {mode === "public" && (
          <button
            className="reserve-btn event-card-btn"
            onClick={() => navigate(`/tickets/${id}`)}
          >
            RESERVAR YA
          </button>
        )}

        {/* ORGANIZER MODE → Ver / Editar / Eliminar */}
        {mode === "my-events" && (
          <>
            <button
              className="event-card-btn"
              onClick={() => navigate(`/tickets/${id}`)}
            >
              Ver
            </button>

            <div className="admin-buttons">
              <button
                className="event-card-btn"
                onClick={() => navigate(`/organizer/editar-evento/${id}`)}
              >
                Editar
              </button>

              <button className="event-card-btn" onClick={confirmDelete}>
                Eliminar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
