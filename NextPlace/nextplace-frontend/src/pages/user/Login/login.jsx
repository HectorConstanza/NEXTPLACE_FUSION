import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Importa useNavigate
import API from "../../../utils/api.js";
import "./login.css";
import loginImage from "../../../assets/images/background.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // ✅ Hook para redirección

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correoElectronico: "",
    contrasena: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // Si es login → primero probar usuarios, luego organizadores
  // Si es registro → solo usuarios
  const endpoint = isLoginMode ? "/users/login" : "/users/register";

  try {
    let response;

    if (isLoginMode) {
      try {
        // 1. Intentar login como usuario
        response = await API.post("/users/login", formData);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        if (onLoginSuccess) onLoginSuccess(response.data.user);

        // Redirigir al home
        navigate("/");
        return;
      } catch (errUser) {
        // 2. Si falla, intentar login como organizador
        try {
          response = await API.post("/organizers/login", formData);

          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.organizer));

          if (onLoginSuccess) onLoginSuccess(response.data.organizer);

          // Redirigir al dashboard de organizador
          navigate("/organizer");
          return;
        } catch (errOrg) {
          setError(errOrg.response?.data?.message || "Credenciales inválidas");
        }
      }
    } else {
      // Registro normal de usuario
      response = await API.post(endpoint, formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (onLoginSuccess) onLoginSuccess(response.data.user);

      navigate("/");
    }
  } catch (err) {
    setError(err.response?.data?.message || "Error en autenticación");
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-container">
        {/* Imagen a la izquierda */}
        <div className="login-image">
          <img src={loginImage} alt="Login visual" />
        </div>

        {/* Formulario a la derecha */}
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
              <div className="forgot-password">
                <a href="#">¿Olvidaste tu contraseña?</a>
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isLoginMode ? "Entrar" : "Registrarse"}
            </button>

            {error && <p className="login-error">{error}</p>}

            <p className="switch-mode">
              {isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsLoginMode(!isLoginMode);
                }}
              >
                {isLoginMode ? "Regístrate ahora" : "Login"}
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
