// src/pages/user/PagoPage/PagoPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Captura2 from "../../../assets/images/Captura2.JPG";

import "./css/Pago.css";

function PagoPage() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // Aquí podrías validar datos de tarjeta antes de confirmar
    Swal.fire({
      title: "Pago exitoso",
      text: "Tu compra ha sido procesada correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      // Redirigir al Home
      navigate("/");
    });
  };

  return (
    <div className="get-tickets">
      <div className="form-container pago-container">
        <h2>Método de Pago</h2>
        <p className="form-subtitle">
          Selecciona un método para completar tu compra.
        </p>

        <div className="payment-options">
          <div className="payment-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
              alt="Visa"
            />
            <p>Visa</p>
          </div>

          <div className="payment-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
              alt="MasterCard"
            />
            <p>MasterCard</p>
          </div>

          <div className="payment-card">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
              alt="PayPal"
            />
            <p>PayPal</p>
          </div>
        </div>

        <div className="card-form">
          <label>Número de tarjeta</label>
          <input type="text" placeholder="XXXX XXXX XXXX XXXX" />

          <div className="card-row">
            <div>
              <label>Fecha de expiración</label>
              <input type="text" placeholder="MM/AA" />
            </div>
            <div>
              <label>CVV</label>
              <input type="text" placeholder="123" />
            </div>
          </div>
        </div>

        {/* Botón con SweetAlert */}
        <button className="pagar-btn" onClick={handlePayment}>
          Confirmar pago
        </button>

        <div className="flex justify-center mt-4">
          <img src={Captura2} alt="Captura2" className="logo-footer" />
        </div>
      </div>
    </div>
  );
}

export default PagoPage;
