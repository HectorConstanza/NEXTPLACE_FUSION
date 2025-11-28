// src/pages/user/TicketsPage/TicketsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/api.js";
import "./css/GetTickets.css";

function TicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);
  const [cantidad, setCantidad] = useState(0);

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

      if (cantidad <= 0) {
        alert("Debes seleccionar al menos un ticket");
        return;
      }

      if (cantidad > event.cuposDispo) {
        alert("No hay suficientes tickets disponibles");
        return;
      }

      const res = await API.post(
        "/reservas",
        {
          usuario_id: user.id,
          evento_id: eventId,
          cantidad
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/pago/${eventId}`, {
        state: {
          cantidad,
          event,
          reserva: res.data.reserva,
          total: event.costo * cantidad
        }
      });

    } catch (err) {
      console.error("Error al crear reserva", err);
      alert(err.response?.data?.message || "Error al crear reserva");
    }
  };

  if (!event) return <p>Cargando evento...</p>;

  const fullImageUrl = event.imagen
    ? `http://localhost:4000/${event.imagen}`
    : "/src/assets/images/ejemplo.jpg";

  return (
    <div className="get-tickets">
      <div className="gt-container">

        {/* HEADER */}
        <header className="event-header">
          <img src={fullImageUrl} alt={event.titulo} className="event-image" />
          <div className="event-info">
            <h2>{event.titulo}</h2>
            <p>{event.descripcion}</p>

            <div className="event-details">
              <p>📅 {new Date(event.fecha).toLocaleDateString()}</p>
              <p>🕘 {new Date(event.fecha).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              <p>📍 {event.lugar}</p>
            </div>
          </div>
        </header>

        {/* TICKETS */}
        <section className="tickets-section">
          <div className="tickets-left">

            <h3>Seleccione sus tickets</h3>

            <div className="ticket-card">
              <div>
                <h4>Entrada General</h4>
                <p>Entrada estándar</p>
                <span className="available">{event.cuposDispo} disponibles</span>
              </div>

              <div className="ticket-actions">
                <span className="price">${event.costo}</span>

                <div className="quantity-control">
                  <button onClick={() => setCantidad(Math.max(0, cantidad - 1))}>-</button>
                  <span>{cantidad}</span>
                  <button
                    onClick={() =>
                      setCantidad(Math.min(cantidad + 1, event.cuposDispo))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* RESUMEN */}
          <aside className="order-summary">
            <h3>Resumen del pedido</h3>

            <div className="total-section">
              <span>Total</span>
              <span>${event.costo * cantidad}</span>
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
