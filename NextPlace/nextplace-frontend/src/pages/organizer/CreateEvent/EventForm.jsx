import { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
    cost: ""
  });

  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);

      if (initialData.imageUrl) {
        setPreviewImage(initialData.imageUrl);
      }
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cost" && value < 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => setPreviewImage(reader.result);
    reader.readAsDataURL(file);
  };

  const validateDate = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selected = new Date(formData.date);

    if (selected < today) {
      Swal.fire({
        title: "Fecha inválida",
        html: `<span style="color:#ff9ad5">La fecha no puede ser anterior a hoy.</span>`,
        icon: "warning",
        background: "#1c1c1c",
        color: "#ff9ad5",
        iconColor: "#ff9ad5",
        confirmButtonColor: "#ff9ad5",
        confirmButtonText: "Aceptar",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      { key: "eventName", text: "Nombre del evento" },
      { key: "date", text: "Fecha" },
      { key: "time", text: "Hora" },
      { key: "location", text: "Ubicación" },
      { key: "category", text: "Categoría" },
      { key: "description", text: "Descripción" },
      { key: "availableSeats", text: "Cupos disponibles" },
      { key: "cost", text: "Costo" },
    ];

    for (const field of requiredFields) {
      const value = formData[field.key];

      if (!value || value.toString().trim() === "") {
        Swal.fire({
          title: "Campo incompleto",
          html: `<span style="color:#ff9ad5">El campo <b>${field.text}</b> es obligatorio.</span>`,
          icon: "warning",
          background: "#1c1c1c",
          color: "#ff9ad5",
          iconColor: "#ff9ad5",
          confirmButtonColor: "#ff9ad5",
          confirmButtonText: "Aceptar",
        });
        return;
      }
    }

    // Imagen obligatoria SOLO en CREATE
    if (mode === "create" && !imageFile) {
      Swal.fire({
        title: "Imagen requerida",
        html: `<span style="color:#ff9ad5">Debes seleccionar una imagen para crear un evento.</span>`,
        icon: "warning",
        background: "#1c1c1c",
        color: "#ff9ad5",
        iconColor: "#ff9ad5",
        confirmButtonColor: "#ff9ad5",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    if (!validateDate()) return;

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    if (imageFile) dataToSend.append("imagen", imageFile);

    onSubmit(dataToSend);
  };

  return (
    <div className="ce-wrapper">
      <header className="ce-header">
        <div className="ce-header-content"></div>
      </header>

      <div className="ce-page-title">
        {mode === "edit" ? "Actualizar Evento" : "Crear Evento"}
      </div>

      <main className="ce-main">
        <div className="ce-card">
          <div className="ce-title">
            <h1 className="ce-title-text">
              {mode === "edit" ? "Editar Datos del Evento" : "Detalles del Evento"}
            </h1>
          </div>

          <form className="ce-form" onSubmit={handleSubmit}>

            {/* Imagen */}
            <div className="ce-field">
              <label>Imagen del Evento {mode === "create" ? "(obligatoria)*" : "(opcional)"}</label>
              <div className="ce-image-upload">
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewImage && (
                  <img src={previewImage} alt="Preview" className="ce-image-preview" />
                )}
              </div>
            </div>

            {/* Nombre */}
            <div className="ce-field">
              <label htmlFor="eventName">Nombre del evento*</label>
              <input
                id="eventName"
                name="eventName"
                type="text"
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>

            {/* Fecha/Hora */}
            <div className="ce-grid-2">
              <div className="ce-field">
                <label htmlFor="date">Fecha*</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
              <div className="ce-field">
                <label htmlFor="time">Hora*</label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Ubicación */}
            <div className="ce-field">
              <label htmlFor="location">Ubicación*</label>
              <input
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Categoría */}
            <div className="ce-field">
              <label htmlFor="category">Categoría*</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="" disabled>Selecciona una categoría</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Música">Música</option>
                <option value="Arte y Cultura">Arte y Cultura</option>
              </select>
            </div>

            {/* Costo */}
            <div className="ce-field">
              <label htmlFor="cost">Costo*</label>
              <input
                id="cost"
                name="cost"
                type="number"
                min="0"
                value={formData.cost}
                onChange={handleChange}
              />
            </div>

            {/* Descripción */}
            <div className="ce-field">
              <label htmlFor="description">Descripción*</label>
              <textarea
                id="description"
                name="description"
                rows="5"
                maxLength="750"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Cupos */}
            <div className="ce-field">
              <label htmlFor="availableSeats">Cupos disponibles*</label>
              <input
                id="availableSeats"
                name="availableSeats"
                type="number"
                min="1"
                value={formData.availableSeats}
                onChange={handleChange}
              />
            </div>

            <button className="ce-submit-btn">
              {mode === "edit" ? "Actualizar Evento" : "Crear Evento"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
