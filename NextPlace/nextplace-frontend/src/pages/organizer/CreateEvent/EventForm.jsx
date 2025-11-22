import { useState, useEffect } from "react";
import "./EventForm.css";

const FormIcon = ({ children, className }) => (
  <span className={`material-icons-outlined form-icon ${className}`}>
    {children}
  </span>
);

export default function EventForm({ mode = "create", initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
  });

  /* Si estamos en modo edición, cargamos los datos iniciales */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="ce-wrapper">

      {/* Header vacío */}
      <header className="ce-header">
        <div className="ce-header-content"></div>
      </header>

      {/* Título dinámico */}
      <div className="ce-page-title">
        {mode === "edit" ? "Actualizar Evento" : "Crear Evento"}
      </div>

      {/* Main */}
      <main className="ce-main">
        <div className="ce-card">

          {/* Subtítulo */}
          <div className="ce-title">
            <svg className="ce-title-icon" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <h1 className="ce-title-text">
              {mode === "edit" ? "Editar Datos del Evento" : "Detalles del Evento"}
            </h1>
          </div>

          <form className="ce-form" onSubmit={handleSubmit}>

            {/* Nombre */}
            <div className="ce-field">
              <label htmlFor="eventName">Nombre del evento*</label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                placeholder="ej. Conferencia de Tecnología 2025"
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>

            {/* Fecha y hora */}
            <div className="ce-grid-2">
              <div className="ce-field">
                <label htmlFor="date">Fecha*</label>
                <div className="ce-input-icon">
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                  <FormIcon className="icon-right">calendar_today</FormIcon>
                </div>
              </div>

              <div className="ce-field">
                <label htmlFor="time">Hora*</label>
                <div className="ce-input-icon">
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                  />
                  <FormIcon className="icon-right">schedule</FormIcon>
                </div>
              </div>
            </div>

            {/* Ubicación */}
            <div className="ce-field">
              <label htmlFor="location">Ubicación*</label>
              <div className="ce-input-icon">
                <FormIcon className="icon-left">location_on</FormIcon>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="ej. Universidad Centroamericana José Simeón Cañas"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Categoría */}
            <div className="ce-field">
              <label htmlFor="category">Categoría*</label>
              <div className="ce-input-icon">
                <FormIcon className="icon-left">bookmark_border</FormIcon>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="" disabled>Selecciona una categoría</option>
                  <option value="tecnologia">Tecnología</option>
                  <option value="musica">Música</option>
                  <option value="arte">Arte y Cultura</option>
                  <option value="deportes">Deportes</option>
                </select>
                <FormIcon className="icon-right">expand_more</FormIcon>
              </div>
            </div>

            {/* Descripción */}
            <div className="ce-field">
              <label htmlFor="description">Descripción*</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                maxLength="750"
                placeholder="Describe tu evento…"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <p className="ce-counter">{formData.description.length}/750 caracteres</p>
            </div>

            {/* Botón dinámico */}
            <button className="ce-submit-btn">
              {mode === "edit" ? "Actualizar Evento" : "Crear Evento"}
            </button>

          </form>

        </div>
      </main>

    </div>
  );
}
