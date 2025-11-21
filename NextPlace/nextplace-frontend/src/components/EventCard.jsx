import React from "react";
import { Link } from "react-router-dom";
import "./EventCard.css";

const EventCard = ({ id, image, titulo, fecha, categoria }) => {
  return (
    <div className="card">
      <div className="tag">{categoria}</div>
      <img
        src={image || "/src/assets/images/ejemplo.jpg"} 
        alt={titulo}
        className="card-image"
      />
      <div className="card-content">
        <p className="title">{titulo}</p>
        <p className="date">{new Date(fecha).toLocaleDateString()}</p>
        {/* Botón que lleva al detalle del evento */}
        <Link to={`/tickets/${id}`} className="reserve-button">
          Reservar YA
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
