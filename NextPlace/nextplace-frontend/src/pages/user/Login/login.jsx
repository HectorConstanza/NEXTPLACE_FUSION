import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

  // 🌙💗 ALERTA GLOBAL
  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title,
      html: `<span style="color:#ff9ad5">${text}</span>`,
      icon,
      background: "#050505",
      color: "#ff9ad5",
      iconColor: "#ff9ad5",
      confirmButtonColor: "#ff9ad5",
      confirmButtonText: "OK",
    });
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
          // Intentar login como usuario
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

        } catch {
          // Si usuario falla, intentar login como organizador
          try {
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

          } catch (errorFinal) {
            return showAlert(
              "Error",
              "El correo o la contraseña no coinciden",
              "error"
            );
          }
        }
      }

      // ========================================================
      // 🔹 REGISTRO
      // ========================================================
      try {
        response = await API.post("/users/register", formData);

        await showAlert(
          "Perfil creado",
          "Tu cuenta ha sido creada con éxito 💗. Ahora puedes iniciar sesión.",
          "success"
        );

        navigate("/login");

      } catch (error) {
        return showAlert(
          "Error",
          error.response?.data?.message || "Error al registrar usuario",
          "error"
        );
      }

    } catch (err) {
      showAlert(
        "Error inesperado",
        err.response?.data?.message || "Algo salió mal",
        "error"
      );
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

            {isLoginMode && (
              <div style={{ marginTop: "0.5rem" }}>
                <Link to="/forgot-password" className="forgot-link">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
            )}

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
