// src/pages/user/TicketsPage/TicketsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../utils/api.js";
import Swal from "sweetalert2";
import "./css/GetTickets.css";
import BackButton from "../../../components/BackButton";

function TicketsPage() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [cantidad, setCantidad] = useState(0);

  // 🔹 Cargar evento normalmente
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

  // 🔹 CONTINUAR → Validar sesión + reserva
  const handleContinue = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // ❌ NO LOGEADO → SWEETALERT + REDIRECCIÓN
    if (!token || !user) {
      Swal.fire({
        title: "Inicia sesión",
        text: "Debes estar logueado para reservar este evento.",
        icon: "warning",
        confirmButtonText: "Ir al login",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    // ❌ SIN TICKETS
    if (cantidad <= 0) {
      Swal.fire({
        title: "Selecciona una cantidad",
        text: "Debes seleccionar al menos un ticket para continuar.",
        icon: "info",
        confirmButtonText: "Entendido",
      });
      return;
    }

    // ❌ SIN DISPONIBILIDAD
    if (cantidad > event.cuposDispo) {
      Swal.fire({
        title: "No hay suficientes tickets",
        text: "La cantidad seleccionada supera los cupos disponibles.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }
    localStorage.setItem("monto_total", event.costo * cantidad);
    // ✔ Crear reserva
    try {
      const res = await API.post(
        "/reservas",
        {
          usuario_id: user.id,
          evento_id: eventId,
          cantidad,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Swal.fire({
        title: "Reserva creada",
        text: "Serás redirigido al pago.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      setTimeout(() => {

        navigate(`/pago/${eventId}`, {
          state: {
            cantidad,
            event,
            reserva: res.data.reserva,
            total: event.costo * cantidad,
          },
        });
      }, 1500);
    } catch (err) {
      console.error("Error al crear reserva", err);
      Swal.fire({
        title: "Error",
        text: err.response?.data?.message || "No se pudo crear la reserva.",
        icon: "error",
      });
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
           <BackButton label="Volver" />

          <div className="event-info">
            <h2>{event.titulo}</h2>
            <p>{event.descripcion}</p>

            <div className="event-details">
              <p>📅 {new Date(event.fecha).toLocaleDateString()}</p>
              <p>
              🕘 {event.fecha?.split("T")[1]?.slice(0, 5) || "00:00"}

              </p>
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
                  <button onClick={() => setCantidad(Math.max(0, cantidad - 1))}>
                    -
                  </button>
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
