import React, { useState, useEffect } from "react";
import API from "../../../utils/api";
import Swal from "sweetalert2";
import "./css/perfil.css";

export default function Perfil() {
  const [user, setUser] = useState({
    nombre: "",
    correoElectronico: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/users/me");
        setUser({
          nombre: res.data.nombre,
          correoElectronico: res.data.correoElectronico,
        });
      } catch (error) {
        console.error("Error cargando usuario", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ============================================================
  // VALIDACIÓN: solo letras y espacios
  // ============================================================
  const handleNameChange = (e) => {
    const value = e.target.value;

    // Solo letras y espacios (incluye acentos)
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$/;

    if (regex.test(value)) {
      setUser({ ...user, nombre: value });
    }
  };

  // ============================================================
  // Guardar cambios
  // ============================================================
  const handleSave = async () => {
    try {
      await API.put("/users/update", {
        nombre: user.nombre,
      });

      Swal.fire({
        title: "¡Perfil actualizado!",
        text: "Tu nombre fue actualizado correctamente.",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/"; 
      });

    } catch (error) {
      console.error("Error guardando perfil", error);
      Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-title">Mi Perfil</h2>

        <div className="perfil-form">
          <label>Nombre</label>
          <input
            type="text"
            value={user.nombre}
            onChange={handleNameChange} // VALIDACIÓN
            maxLength={30}
          />

          <label>Email (no editable)</label>
          <input type="text" value={user.correoElectronico} disabled />
        </div>

        <button className="perfil-save-btn" onClick={handleSave}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
