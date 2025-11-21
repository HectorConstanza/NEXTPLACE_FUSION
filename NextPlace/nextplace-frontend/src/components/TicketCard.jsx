import React from 'react';

export default function TicketCard({ title, subtitle, price, available, quantity, onQuantityChange }) {
  return (
    <div className="ticket-card">
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
        <span className="available">{available} disponibles</span>
      </div>
      <div className="ticket-actions">
        <span className="price">${price}</span>
        <div className="quantity-control">
          <button onClick={() => onQuantityChange(Math.max(0, quantity - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onQuantityChange(quantity + 1)}>+</button>
        </div>
      </div>
    </div>
  );
}