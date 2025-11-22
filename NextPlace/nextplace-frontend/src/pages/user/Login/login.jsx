import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../../utils/api.js";
import Swal from "sweetalert2";
import "./login.css";
import loginImage from "../../../assets/images/background.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correoElectronico: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;

      // ========================================================
      // 🔹 LOGIN
      // ========================================================
      if (isLoginMode) {
        try {
          // Login como usuario
          response = await API.post("/users/login", {
            correoElectronico: formData.correoElectronico,
            contrasena: formData.contrasena,
          });

          const { token, user } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));

          if (onLoginSuccess) onLoginSuccess(user);

          navigate("/");
          return;
        } catch {}

        try {
          // Login como organizador
          response = await API.post("/organizers/login", {
            correoElectronico: formData.correoElectronico,
            contrasena: formData.contrasena,
          });

          const { token, organizer } = response.data;

          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(organizer));

          if (onLoginSuccess) onLoginSuccess(organizer);

          navigate("/organizer");
          return;
        } catch {
          Swal.fire("Error", "Credenciales incorrectas", "error");
        }

        return;
      }

      // ========================================================
      // 🔹 REGISTRO
      // ========================================================
      response = await API.post("/users/register", formData);

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      if (onLoginSuccess) onLoginSuccess(user);

      navigate("/");

    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || "Error inesperado", "error");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">

        <div className="login-image">
          <img src={loginImage} alt="Login visual" />
        </div>

        <div className="login-form">
          <h2>{isLoginMode ? "Iniciar Sesión" : "Registrarse"}</h2>

          <div className="tab-switch">
            <button
              className={isLoginMode ? "active" : ""}
              onClick={() => setIsLoginMode(true)}
            >
              Login
            </button>

            <button
              className={!isLoginMode ? "active" : ""}
              onClick={() => setIsLoginMode(false)}
            >
              Signup
            </button>

            <div className={`tab-indicator ${isLoginMode ? "left" : "right"}`} />
          </div>

          <form onSubmit={handleSubmit}>
            {!isLoginMode && (
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="login-input"
              />
            )}

            <input
              type="email"
              name="correoElectronico"
              placeholder="Correo electrónico"
              value={formData.correoElectronico}
              onChange={handleChange}
              required
              className="login-input"
            />

            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={formData.contrasena}
              onChange={handleChange}
              required
              className="login-input"
            />

            <button type="submit" className="submit-btn">
              {isLoginMode ? "Entrar" : "Registrarse"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
