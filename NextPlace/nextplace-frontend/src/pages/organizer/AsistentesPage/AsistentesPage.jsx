import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import "./AsistentesPage.css";

export default function AsistentesPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [asistentes, setAsistentes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(`/events/${eventId}/asistentes`);
        setAsistentes(res.data);
      } catch (err) {
        console.error("Error cargando asistentes", err);
      }
    };

    fetchData();
  }, [eventId]);

  return (
    <div className="asistentes-container">
      <h2 className="title">Asistentes del Evento</h2>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Volver
      </button>

      {asistentes.length === 0 ? (
        <p>No hay asistentes aún.</p>
      ) : (
        <ul className="asistentes-list">
          {asistentes.map((a) => (
            <li key={a.id} className="asistente-item">

              <div className="asistente-left">
                <p><strong>Nombre:</strong> {a.nombre}</p>
                <p><strong>Correo:</strong> {a.correoElectronico}</p>
                <p><strong>Cantidad reservada:</strong> {a.cantidad}</p>
              </div>

              <div
                className={`estado-box ${a.estado === "confirmada" ? "estado-confirmada" : "estado-cancelada"
                  }`}
              >
                {a.estado === "confirmada" ? "CONFIRMADA" : "CANCELADA"}
              </div>

            </li>
          ))}
        </ul>
      )}

    </div>
  );
}
