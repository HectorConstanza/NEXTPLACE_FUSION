import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../../../utils/api";
import "./ResetPassword.css";

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
      alert("Las contraseñas no coinciden 💔");
      return;
    }

    try {
      const res = await API.post("/auth/reset-password", {
        userId,
        token,
        newPassword: password,
      });

      alert(res.data.message || "Contraseña restablecida 💗");
      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Error al restablecer contraseña");
    }
  };

  return (
    <div className="reset-wrapper">
      <div className="reset-card">
        <h2 className="reset-title">Restablecer contraseña</h2>

        <form onSubmit={handleSubmit}>
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={password}
            placeholder="Escribe tu nueva contraseña…"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirm}
            placeholder="Confirma tu nueva contraseña…"
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

          <button type="submit" className="reset-btn">
            Guardar contraseña 💗
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>
        </form>
      </div>
    </div>
  );
}
