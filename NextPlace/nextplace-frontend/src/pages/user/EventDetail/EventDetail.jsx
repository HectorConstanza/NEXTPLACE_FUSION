
// src/pages/user/EventDetail/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../../utils/api";
import "./EventDetail.css";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // RUTA CORRECTA DEL BACKEND
        const res = await API.get(`/api/events/${id}`);

        console.log("EVENT DETAIL DATA:", res.data); // debug
        setEvent(res.data);
      } catch (err) {
        console.error("Error cargando evento", err);
      }
    };

    fetchEvent();

  }, [id]);



  if (!event) {
    return <p style={{ color: "white", textAlign: "center" }}>Cargando evento...</p>;
  }

  //  MISMA LÓGICA DE EventCard y Home
  const fullImageUrl = event.imagen
    ? `http://localhost:4000/${event.imagen}`
    : "/src/assets/images/ejemplo.jpg";

  return (
    <div className="event-detail-container">
      {/* Imagen */}
      <div className="event-detail-left">
<img 
  src={fullImageUrl} 
  alt={event.titulo} 
  style={{
    width: "500px",
    height: "500px",
    border: "5px solid magenta",
    position: "relative",
    zIndex: 99999
  }} 
/>



        <p className="small-text">
          Organizado por <strong>{event.organizador_id || "Anónimo"}</strong>
        </p>
      </div>

      {/* Información */}
      <div className="event-detail-right">
        <h1 className="event-title-detail">{event.titulo}</h1>

        {/* Fecha */}
        <p className="event-date">
          <span className="material-icons" style={{ fontSize: "20px", marginRight: "6px" }}>
            calendar_today
          </span>
          {new Date(event.fecha).toLocaleDateString()}
        </p>

        {/* Hora */}
        <p className="event-date">
          <span className="material-icons" style={{ fontSize: "20px", marginRight: "6px" }}>
            schedule
          </span>
          {event.fecha.split("T")[1]?.slice(0, 5)} hrs
        </p>

        {/* Ubicación */}
        <p className="event-date">
          <span className="material-icons" style={{ fontSize: "20px", marginRight: "6px" }}>
            place
          </span>
          {event.lugar || "Ubicación no especificada"}
        </p>

        {/* Descripción */}
        <p className="event-description">{event.descripcion}</p>

        {/* Botón */}
        <button className="buy-btn">Reservar ahora</button>

        <p className="disclaimers">Compra protegida • Cancelación flexible • Pago seguro</p>
      </div>
    </div>
  );
}
