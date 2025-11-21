import React from 'react';

export default function OrderSummary({ total }) {
  return (
    <aside className="order-summary">
      <h3>Resumen del pedido</h3>
      <button className="continue-btn">Continuar</button>
      <p className="secure-info"> Pago </p>
      <hr />
      <div className="total-section">
        <strong>Total:</strong> <span>${total}</span>
      </div>
    </aside>
  );
}
