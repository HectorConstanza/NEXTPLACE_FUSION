import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../../utils/api";

export default function ResetPassword() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const userId = params.get("id");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    try {
      await API.post("/auth/reset-password", { userId, token, newPassword: password });
      alert("Contraseña restablecida. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error al restablecer la contraseña");
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h2>Restablecer contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nueva contraseña"
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Confirmar contraseña"
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
        />
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="submit">Restablecer</button>
          <button type="button" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </form>
    </div>
  );
}
