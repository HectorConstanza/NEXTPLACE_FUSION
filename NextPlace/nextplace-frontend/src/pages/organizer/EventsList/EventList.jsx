// src/pages/organizer/EventsList/EventList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api.js";
import EventCard from "../../../components/EventCard";
import "./EventList.css";

export default function EventList() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Obtener el ID del organizador del localStorage
        const userStr = localStorage.getItem("user");
        if (!userStr) {
          setError("No hay sesión de organizador activa");
          setLoading(false);
          return;
        }

        const user = JSON.parse(userStr);
        const organizador_id = user.id;

        // Llamar a la API para obtener eventos del organizador
        const endpoint = `/events/organizer/${organizador_id}`;
        const fullUrl = `${API.defaults.baseURL}${endpoint}`;
        console.log("Fetching events from:", fullUrl);

        const response = await API.get(endpoint);
        console.log("Eventos recibidos:", response.data);
        setEvents(response.data || []);
        setError(null);
      } catch (err) {
        // Log completo para diagnosticar (request, response, message)
        console.error("Error al cargar eventos - error object:", err);
        console.error("err.response:", err.response);
        console.error("err.request:", err.request);
        console.error("err.message:", err.message);

        // Imprimir todas las propiedades (incluye no-enumerables) para diagnosticar AxiosError
        try {
          const fullErr = {};
          Object.getOwnPropertyNames(err).forEach((k) => {
            try { fullErr[k] = err[k]; } catch (e) { fullErr[k] = String(e); }
          });
          console.log("Axios full error properties:", fullErr);
        } catch (e) {
          console.warn("No se pudo serializar el error completo:", e);
        }

        const status = err.response?.status;
        const serverMessage = err.response?.data?.message || err.response?.data || null;
        const userMessage = serverMessage || err.message || "Error al cargar los eventos";

        setError(status ? `Error ${status}: ${userMessage}` : userMessage);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (eventId) => {
    // TODO: Implementar navegación a editar evento
    console.log("Editar evento:", eventId);
  };

  const handleView = (eventId) => {
    // TODO: Implementar vista de detalles del evento
    console.log("Ver evento:", eventId);
  };

  const handleDelete = async (eventId) => {
    // TODO: Implementar eliminación de evento
    console.log("Eliminar evento:", eventId);
  };

  return (
    <div className="event-list-wrapper">
      <div className="event-list-header">
        <div>
          <h1 className="event-title">Mis Eventos</h1>
          <p className="event-subtitle">
            Administra y visualiza todos tus eventos creados
          </p>
        </div>

        <button 
          className="create-event-btn"
          onClick={() => navigate("/organizer/crear-evento")}
        >
          + Crear Nuevo Evento
        </button>
      </div>

      {loading && (
        <div className="loading">
          <p>Cargando eventos...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {!loading && events.length === 0 && !error && (
        <div className="no-events">
          <p>No has creado eventos aún. ¡Crea tu primer evento!</p>
        </div>
      )}

      {!loading && events.length > 0 && (
        <div className="cards-container">
          {events.map((ev) => (
            <EventCard
              key={ev.id}
              id={ev.id}
              image={"/src/assets/images/ejemplo.jpg"}
              title={ev.titulo}
              date={new Date(ev.fecha).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
              tag={ev.cuposDispo > 0 ? "Disponible" : "Agotado"}
              onEdit={() => handleEdit(ev.id)}
              onView={() => handleView(ev.id)}
              onDelete={() => handleDelete(ev.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
