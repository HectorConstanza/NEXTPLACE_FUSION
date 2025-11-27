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
    availableSeats: "",
  });

  /* Nueva propiedad para imagen */
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  /* Si estamos en edición, cargar datos */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);

      // Cargar imagen existente si viene desde el backend
      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* Manejar imagen */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Previsualización instantánea
    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Armamos un FormData si hay imagen
    const dataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    if (imageFile) {
      dataToSend.append("image", imageFile);
    }

    onSubmit(dataToSend);
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

            {/* -------------- NUEVA SECCIÓN DE IMAGEN -------------- */}
            <div className="ce-field">
              <label>Imagen del Evento (máx 1)*</label>

              <div className="ce-image-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                {/* Preview */}
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="ce-image-preview"
                  />
                )}
              </div>
            </div>
            {/* ------------------------------------------------------ */}

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
                  <option value="Tecnología">Tecnología</option>
                  <option value="Música">Música</option>
                  <option value="Arte">Arte y Cultura</option>
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

            {/* Cupos */}
            <div className="ce-field">
              <label htmlFor="availableSeats">Cupos disponibles*</label>
              <div className="ce-input-icon">
                <FormIcon className="icon-left">people</FormIcon>
                <input
                  id="availableSeats"
                  name="availableSeats"
                  type="number"
                  min="1"
                  placeholder="ej. 100"
                  value={formData.availableSeats}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Botón */}
            <button className="ce-submit-btn">
              {mode === "edit" ? "Actualizar Evento" : "Crear Evento"}
            </button>

          </form>

        </div>
      </main>

    </div>
  );
}
