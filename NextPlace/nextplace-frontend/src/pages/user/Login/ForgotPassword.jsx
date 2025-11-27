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
      const res = await API.post("/auth/forgot-password", { email });

      setMessage(res.data.message);
      setEmail("");
    } catch (err) {
      console.error("ERROR EN FORGOT PASSWORD => ", err.response?.data || err);
      setMessage("Error al solicitar restablecimiento.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "420px",
        margin: "4rem auto",
        padding: "2rem",
        background: "#fff1f7",
        borderRadius: "12px",
        boxShadow: "0 0 20px rgba(255, 182, 193, 0.25)",
        color: "#222",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#d63384",
          fontWeight: "700",
        }}
      >
        Recuperar contraseña
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={{ fontSize: "0.9rem", color: "#444" }}>
          Correo electrónico
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          required
          style={{
            width: "100%",
            padding: "0.75rem",
            marginTop: "0.4rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ffb3d4",
            background: "#ffe6f2",
            color: "#222",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            marginTop: "0.5rem",
          }}
        >
          <button
            type="submit"
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "#ff99c8",
              border: "none",
              color: "black",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Enviar enlace
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            style={{
              flex: 1,
              padding: "0.75rem",
              background: "#ffd6e8",
              border: "none",
              color: "black",
              borderRadius: "10px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Volver
          </button>
        </div>
      </form>

      {message && (
        <p
          style={{
            marginTop: "1.2rem",
            textAlign: "center",
            color: "#d63384",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
