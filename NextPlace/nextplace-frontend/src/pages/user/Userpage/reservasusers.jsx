import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

import "./css/reservasusers.css";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await API.get("/reservas/mias"); // Cambiar según tu backend
        setReservas(res.data);
      } catch (err) {
        console.error("Error cargando reservas", err);
      }
    };

    fetchReservas();
  }, []);

  return (
    <>
      <Navbar />

      <div className="reservas-container">
        <h2 className="reservas-title">Mis Reservas</h2>

        {reservas.length === 0 ? (
          <p className="reservas-empty">No tienes reservas realizadas.</p>
        ) : (
          <div className="reservas-grid">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="reserva-card">
                <img
                  src={`http://localhost:4000/${reserva.evento.imagen}`}
                  alt={reserva.evento.titulo}
                  className="reserva-img"
                />

                <div className="reserva-info">
                  <h3>{reserva.evento.titulo}</h3>

                  <p>
                    <strong>Fecha:</strong>{" "}
                    {new Date(reserva.evento.fecha).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Hora:</strong>{" "}
                    {reserva.evento.fecha.split("T")[1].slice(0, 5)}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {reserva.cantidad}
                  </p>
                  <p>
                    <strong>Total:</strong> ${reserva.total}
                  </p>

                  <span className="reserva-estado">
                    {reserva.evento.estado}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
