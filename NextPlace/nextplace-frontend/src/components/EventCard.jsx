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
  onViewAttendees = null,
}) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const mode = pathname.startsWith("/organizer") ? "my-events" : "public";

  const formattedDate = fecha
    ? new Date(fecha).toLocaleDateString("es-ES")
    : "";

  const formattedCategory =
    categoria?.charAt(0).toUpperCase() + categoria?.slice(1).toLowerCase();

  const TAG_STYLES = {
    próximamente: "tag tag-próximamente",
    "en curso": "tag tag-en curso",
    finalizado: "tag tag-finalizado",
    disponible: "tag tag-disponible",
    agotado: "tag tag-agotado",
  };

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
      <div className="category-badge">{formattedCategory}</div>
      <div className={TAG_STYLES[estado] || "tag"}>{estado}</div>

      {/* Solo mostramos la imagen si existe */}
      {image && (
        <div className="image-container">
          <img
            src={image}
            alt={titulo}
            className="card-image"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
      )}

      <div className="card-content">
        <p className="title">{titulo}</p>

        <div className="info-line">
          <span className="material-symbols-rounded info-icon">
            calendar_month
          </span>
          <span>{formattedDate}</span>
        </div>

        <div className="info-line">
          <span className="material-symbols-rounded info-icon">schedule</span>
          <span>{hora}</span>
        </div>

        <div className="info-line">
          <span className="material-symbols-rounded info-icon">groups</span>
          <span>{cuposDispo} disponibles</span>
        </div>

        {mode === "public" && (
          <button
            className="reserve-btn event-card-btn"
            onClick={() => navigate(`/tickets/${id}`)}
          >
            RESERVAR YA
          </button>
        )}

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
            {onViewAttendees && (
              <button
                className="attendees-btn"
                onClick={() => onViewAttendees(id)}
              >
                Ver asistentes
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
