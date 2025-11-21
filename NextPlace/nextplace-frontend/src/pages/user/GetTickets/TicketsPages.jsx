import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/api.js"; // helper axios con baseURL
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
      const user = JSON.parse(localStorage.getItem("user")); // guardado en login
      if (!user) {
        alert("Debes iniciar sesión para reservar");
        navigate("/login");
        return;
      }

      // Crear reserva en backend
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

      console.log("Reserva creada:", res.data);

      // Navegar a detalles con info seleccionada
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

  return (
    <div className="get-tickets">
      <div className="gt-container">
        {/* Header del evento */}
        <header className="event-header">
          <img
            src={event.image || "../../../assets/images/Captura2.JPG"}
            alt={event.titulo}
            className="event-image"
          />
          <div className="event-info">
            <h2>{event.titulo}</h2>
            <p>{event.descripcion}</p>
            <div className="event-details">
              <p>📅 {new Date(event.fecha).toLocaleDateString()}</p>
              <p>🕘  {new Date(event.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>📍 {event.lugar}</p>
            </div>
          </div>
        </header>

        {/* Sección de tickets */}
        <section className="tickets-section">
          <div className="tickets-left">
            {/* Steps responsivos */}
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
                <span className="available">
                  {event.cuposDispo || event.cupos} disponibles
                </span>
              </div>
              <div className="ticket-actions">
                <span className="price">$45</span>
                <div className="quantity-control">
                  <button onClick={() => setGeneral(Math.max(0, general - 1))}>
                    -
                  </button>
                  <span>{general}</span>
                  <button onClick={() => setGeneral(general + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Ticket VIP */}
            <div className="ticket-card">
              <div>
                <h4>Experiencia VIP</h4>
                <p>Acceso premium con beneficios exclusivos</p>
                <span className="available">50 disponibles</span>
              </div>
              <div className="ticket-actions">
                <span className="price">$120</span>
                <div className="quantity-control">
                  <button onClick={() => setVip(Math.max(0, vip - 1))}>-</button>
                  <span>{vip}</span>
                  <button onClick={() => setVip(vip + 1)}>+</button>
                </div>
              </div>
            </div>

            {/* Apartado nuevo cuando se selecciona "Detalles" */}
            {showDetails && (
              <div className="event-extra-details">
                <h3>Detalles del evento</h3>
                <p>{event.categoria || "Información adicional del evento"}</p>
                <p>{event.cupos}</p>
              </div>
            )}
          </div>

          {/* Resumen del pedido */}
          <aside className="order-summary">
            <h3>Resumen del pedido</h3>
            <div className="total-section">
              <span>Total</span>
              <span>${45 * general + 120 * vip}</span>
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
