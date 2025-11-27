// Importa useParams para leer el ID
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/Detalles.css"; // <-- CSS específico para esta vista

function DetallesPage() {
  const navigate = useNavigate();
  const { eventId } = useParams(); // <-- Obtiene el ID de la URL

  const handleContinue = () => {
    // Pasa el eventId a la ruta de pago
    navigate(`/pago/${eventId}`);
  };

  return (
    <div className="get-tickets">

      <div className="form-container detalles-container">
        <h2>Detalles del Comprador</h2>
        <p className="form-subtitle">
          Ingresa tus datos para completar la compra de tus tickets
        </p>

        <form className="detalles-form">
          <div>
            <label>Nombre completo</label>
            <input type="text" placeholder="Ej. Juan Pérez" />
          </div>
          <div>
            <label>Correo electrónico</label>
            <input type="email" placeholder="ejemplo@correo.com" />
          </div>
          <div>
            <label>Teléfono</label>
            <input type="tel" placeholder="0000-0000" />
          </div>

          <button
            type="button"
            className="continuar-btn"
            onClick={handleContinue}
          >
            Continuar al pago
          </button>
        </form>

        <img src={Captura} alt="logo" className="logo-footer" />
      </div>
    </div>
  );
}


export default DetallesPage;

