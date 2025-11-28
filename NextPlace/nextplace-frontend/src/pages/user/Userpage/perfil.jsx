import React, { useState, useEffect } from "react";
import "./css/Perfil.css";

export default function Perfil() {
  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    imagen: "",
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario
    const fetchUser = async () => {
      try {
        const res = await API.get("/auth/me"); // Ruta para obtener info del usuario logeado
        setUser(res.data);
        setPreview(res.data.imagen ? `http://localhost:4000/${res.data.imagen}` : null);
      } catch (error) {
        console.error("Error cargando usuario", error);
      }
    };
    fetchUser();
  }, []);

  // Manejar subida de imagen
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setUser({ ...user, imagen: file });
    }
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", user.nombre);
      formData.append("apellido", user.apellido);
      formData.append("telefono", user.telefono);

      if (user.imagen instanceof File) {
        formData.append("imagen", user.imagen);
      }

      await API.put("/auth/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Perfil actualizado correctamente!");
    } catch (error) {
      console.error("Error guardando perfil", error);
      alert("Error al actualizar.");
    }
  };

  return (
    <div className="perfil-container">
      <div className="perfil-card">
        <h2 className="perfil-title">Mi Perfil</h2>

        {/* FOTO */}
        <div className="perfil-foto-section">
          <img
            src={preview || "/src/assets/icons/user.png"}
            alt="Foto"
            className="perfil-foto"
          />

          <label className="perfil-btn-foto">
            Cambiar foto
            <input type="file" accept="image/*" onChange={handleImage} hidden />
          </label>
        </div>

        {/* CAMPOS DE INFORMACIÓN */}
        <div className="perfil-form">
          <label>Nombre</label>
          <input
            type="text"
            value={user.nombre}
            onChange={(e) => setUser({ ...user, nombre: e.target.value })}
          />

          <label>Apellido</label>
          <input
            type="text"
            value={user.apellido}
            onChange={(e) => setUser({ ...user, apellido: e.target.value })}
          />

          <label>Teléfono</label>
          <input
            type="text"
            value={user.telefono}
            onChange={(e) => setUser({ ...user, telefono: e.target.value })}
          />

          <label>Email (no editable)</label>
          <input type="text" value={user.email} disabled />
        </div>

        <button className="perfil-save-btn" onClick={handleSave}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
