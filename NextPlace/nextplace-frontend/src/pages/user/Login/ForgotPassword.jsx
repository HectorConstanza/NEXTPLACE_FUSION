import React, { useState } from "react";
import API from "../../../utils/api";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/forgot-password", { email });
      setMessage("Si el email existe, recibirás un enlace para restablecer la contraseña.");
      setEmail("");
    } catch (err) {
      console.error(err);
      setMessage("Error al solicitar restablecimiento.");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">Enviar enlace</button>
          <button type="button" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </form>
      {message && <p style={{ marginTop: "0.75rem" }}>{message}</p>}
    </div>
  );
}
