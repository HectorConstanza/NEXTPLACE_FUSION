import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import API from "../../../utils/api";
import "./css/reservasusers.css";

export default function MisReservas() {
  const [reservas, setReservas] = useState([]);

  const cargarReservas = async () => {
    try {
      const res = await API.get("/reservas/mias");
      setReservas(res.data);
    } catch (err) {
      console.error("Error cargando reservas", err);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  const cancelarReserva = async (id) => {
    try {
      await API.post(`/reservas/cancel/${id}`);
      cargarReservas();
    } catch (err) {
      console.error("Error cancelando", err);
    }
  };

  return (
    <>
      <Navbar />

    <div className="reservas-container">
       <h1 className="reservas-header">Mis Reservas</h1>


        {reservas.length === 0 ? (
          <p className="reservas-empty">No tienes reservas realizadas.</p>
        ) : (
          <div className="reservas-grid">
            {reservas.map((reserva) => (
              <div key={reserva.id} className="reserva-card">

                <img
                  src={`http://localhost:4000/${reserva.Event?.imagen}`}
                  alt={reserva.Event?.titulo}
                  className="reserva-img"
                />

                <div className="reserva-info">
                  <h3>{reserva.Event?.titulo}</h3>

                  <p><strong>Fecha:</strong>{" "}
                    {new Date(reserva.Event?.fecha).toLocaleDateString()}
                  </p>

                  <p><strong>Cantidad:</strong> {reserva.cantidad}</p>

                  <p><strong>Total:</strong> ${reserva.total}</p>

                  <span className="reserva-estado">{reserva.estado}</span>

                  {reserva.estado !== "cancelada" && (
                    <button
                      className="btn-cancelar"
                      onClick={() => cancelarReserva(reserva.id)}
                    >
                      Cancelar Reserva
                    </button>
                  )}
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
