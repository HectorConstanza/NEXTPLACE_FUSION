// src/pages/user/PagoPage/PagoPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Captura2 from "../../../assets/images/Captura2.JPG";
import "./css/Pago.css";

function PagoPage() {
  const navigate = useNavigate();

  // Leer monto total desde localStorage
  const monto = localStorage.getItem("monto_total") || "0.00";

  useEffect(() => {
    // Cargar el script de PayPal
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AZL38F0eYi7EQ6UfqYUX_r9hwXENxG0crvy8KSB4nYbUuQP3id_iFBaeG3fjHfAoofzhgDbTwZRnhtV9&currency=USD";
    script.async = true;

    script.onload = () => {
      if (window.paypal) {
        window.paypal
          .Buttons({
            createOrder: (data, actions) => {
              // Usar el total real del usuario
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: monto,
                    },
                    description: "Pago de reserva de evento",
                  },
                ],
              });
            },

            onApprove: (data, actions) => {
              return actions.order.capture().then(function (details) {
                Swal.fire({
                  title: "Pago exitoso",
                  text: "Tu compra ha sido procesada correctamente",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                }).then(() => {
                  navigate("/");
                });
              });
            },

            onError: (err) => {
              Swal.fire({
                title: "Error en el pago",
                text: "Hubo un problema al procesar el pago.",
                icon: "error",
              });
            },
          })
          .render("#paypal-button-container");
      }
    };

    document.body.appendChild(script);
  }, [navigate, monto]);

  return (
    <div className="get-tickets">
      <div className="form-container pago-container">
        <h2>Método de Pago</h2>
        <p className="form-subtitle">
          Selecciona un método para completar tu compra.
        </p>

        {/* Mostrar el total real */}
        <p className="total-pago">
          Total a pagar: <strong>${monto}</strong>
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

        {/* Botón de PayPal */}
        <div id="paypal-button-container" style={{ marginTop: "20px" }}></div>

        <div className="flex justify-center mt-4">
          <img src={Captura2} alt="Captura2" className="logo-footer" />
        </div>
      </div>
    </div>
  );
}

export default PagoPage;
