// src/pages/user/TicketsPage/TicketsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/api.js";
import "./css/GetTickets.css";

function TicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [general, setGeneral] = useState(0);
  const [vip, setVip] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${eventId}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error al cargar evento", err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleContinue = async () => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Debes iniciar sesión para reservar");
        navigate("/login");
        return;
      }

      // ⭐ AQUI SE CORRIGIÓ (ANTES: "/api/reservas")
      const res = await API.post(
        "/reservas",
        {
          usuario_id: user.id,
          evento_id: eventId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/detalles/${eventId}`, {
        state: { general, vip, event, reserva: res.data.reserva },
      });
    } catch (err) {
      console.error("Error al crear reserva", err);
      alert(err.response?.data?.message || "Error al crear reserva");
    }
  };

  if (!event) {
    return <p>Cargando evento...</p>;
  }

  // ⭐ MISMA LÓGICA DE HOME Y EVENTCARD
  const fullImageUrl = event.imagen
    ? `http://localhost:4000/${event.imagen}`
    : "/src/assets/images/ejemplo.jpg";

  return (
    <div className="get-tickets">
      <div className="gt-container">

        {/* HEADER */}
        <header className="event-header">
          <img
            src={fullImageUrl}
            alt={event.titulo}
            className="event-image"
          />

          <div className="event-info">
            <h2>{event.titulo}</h2>
            <p>{event.descripcion}</p>

            <div className="event-details">
              <p>📅 {new Date(event.fecha).toLocaleDateString()}</p>
              <p>
                🕘{" "}
                {new Date(event.fecha).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>📍 {event.lugar}</p>
            </div>
          </div>
        </header>

        {/* TICKETS */}
        <section className="tickets-section">
          <div className="tickets-left">

            <div className="steps">
              <span className="active-step">Tickets</span>
              <span
                className={showDetails ? "active-step" : ""}
                onClick={() => setShowDetails(!showDetails)}
              >
                Detalles
              </span>
            </div>

            <h3>Seleccione sus tickets</h3>

            {/* Ticket General */}
            <div className="ticket-card">
              <div>
                <h4>Admisión General</h4>
                <p>Entrada estándar</p>

                {/* Cupos reales */}
                <span className="available">
                  {event.cuposDispo || event.cupos} disponibles
                </span>
              </div>

              <div className="ticket-actions">
                {/* ⭐ COSTO REAL DESDE BACKEND */}
                <span className="price">${event.costo}</span>

                <div className="quantity-control">
                  <button onClick={() => setGeneral(Math.max(0, general - 1))}>
                    -
                  </button>
                  <span>{general}</span>
                  <button onClick={() => setGeneral(general + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Detalles */}
            {showDetails && (
              <div className="event-extra-details">
                <h3>Detalles del evento</h3>
                <p>{event.categoria}</p>
                <p>{event.cupos} cupos totales</p>
              </div>
            )}
          </div>

          {/* RESUMEN */}
          <aside className="order-summary">
            <h3>Resumen del pedido</h3>

            <div className="total-section">
              <span>Total</span>

              {/* ⭐ TOTAL REAL */}
              <span>${event.costo * general}</span>
            </div>

            <button className="continue-btn" onClick={handleContinue}>
              Continuar
            </button>

            <p className="secure-info">Sección de pago</p>
          </aside>

        </section>
      </div>
    </div>
  );
}

export default TicketsPage;
