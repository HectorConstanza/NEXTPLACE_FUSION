import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header>
      <h1 className="titles">
        Reservas <span className="changeColor">simples</span><br />
        Momentos <span className="highlightWord">inolvidables</span>
      </h1>

      {/* Estrellitas */}
      <span className="star star-1">★</span>
      <span className="star star-2">★</span>
      <span className="star star-3">★</span>

      <h2 className="text">
        La plataforma donde los buenos momentos encuentran su lugar.
        <br />
        Aquí puedes descubrir eventos únicos, reservar tu espacio en segundos
        <br />
        y compartir experiencias sin complicaciones.
      </h2>
    </header>
  );
};

export default Header;
