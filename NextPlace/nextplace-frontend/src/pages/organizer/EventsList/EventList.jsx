// src/pages/organizer/EventsList/EventList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api.js";
import EventCard from "../../../components/EventCard.jsx";
import "./EventList.css";

export default function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  // Ocultos en front
  const getHiddenEvents = () => {
    const h = localStorage.getItem("eventosOcultos");
    return h ? JSON.parse(h) : [];
  };

  const hideEvent = (id) => {
    const updated = [...getHiddenEvents(), id];
    localStorage.setItem("eventosOcultos", JSON.stringify(updated));
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return;

        const { id } = JSON.parse(userStr);
        const res = await API.get(`/events/organizer/${id}`);

        const hidden = getHiddenEvents();

        const cleanEvents = res.data
          .filter((ev) => !hidden.includes(ev.id))
          .map((ev) => {
            const eventDate = new Date(ev.fecha);
            const today = new Date();

            let estado = "disponible";
            if (eventDate > today) estado = "próximamente";
            if (eventDate.toDateString() === today.toDateString())
              estado = "en curso";
            if (eventDate < today) estado = "finalizado";
            if (ev.cuposDispo <= 0) estado = "agotado";

            return {
              ...ev,
              hora: ev.fecha?.split("T")[1]?.slice(0, 5) || "00:00",
              estado,
            };
          });

        setEvents(cleanEvents);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = (id) => {
    hideEvent(id);
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
  };

  return (
    <div className="event-list-wrapper">
      <div className="event-list-header">
        <h1 className="event-title">Mis Eventos</h1>

        <button
          className="create-event-btn"
          onClick={() => navigate("/organizer/crear-evento")}
        >
          + Crear Evento
        </button>
      </div>

      {/* 🌸 Franja bonita cuando no hay eventos */}
      {events.length === 0 && (
        <div className="empty-banner">
          <p className="empty-banner-text">
            Aún no has creado eventos ✨
          </p>
        </div>
      )}

      <div className="cards-container">
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            id={ev.id}
            image="/src/assets/images/ejemplo.jpg"
            titulo={ev.titulo}
            categoria={ev.categoria}
            fecha={ev.fecha}
            hora={ev.hora}
            cuposDispo={ev.cuposDispo}
            estado={ev.estado}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
