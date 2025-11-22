import { useState } from "react";
import Swal from "sweetalert2";
import API from "../../../utils/api.js";

const FormIcon = ({ children, className }) => (
  <span className={`material-icons-outlined absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${className}`}>
    {children}
  </span>
);

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: "",
    date: "",
    time: "",
    location: "",
    category: "",
    description: "",
    availableSeats: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const organizer = JSON.parse(localStorage.getItem("user"));

      if (!organizer || organizer.role !== "organizer") {
        return Swal.fire("Error", "Solo los organizadores pueden crear eventos", "error");
      }

      // Combinar fecha + hora → formato aceptado por MySQL
      const fullDate = `${formData.date} ${formData.time}:00`;

      const eventData = {
        title: formData.eventName,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        date: fullDate,
        available_seats: Number(formData.availableSeats),
        organizer_id: organizer.id,
      };

      const response = await API.post("/events", eventData);

      Swal.fire("Éxito", "Evento creado correctamente", "success");
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "No se pudo crear el evento", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">Next</span>
            <span className="text-2xl font-bold text-pink-500">Place</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <div className="flex items-center gap-3 mb-8">
            <svg className="h-7 w-7 text-pink-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"></path>
            </svg>
            <h1 className="text-2xl font-semibold text-gray-700">Crear Nuevo Evento</h1>
          </div>

          {/* FORM */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Nombre del evento*</label>
              <input
                className="w-full bg-gray-100 rounded-lg py-3 px-4"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="ej. Conferencia 2025"
                type="text"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Fecha*</label>
                <input
                  type="date"
                  name="date"
                  className="w-full bg-gray-100 rounded-lg py-3 px-4"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Hora*</label>
                <input
                  type="time"
                  name="time"
                  className="w-full bg-gray-100 rounded-lg py-3 px-4"
                  value={formData.time}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Ubicación*</label>
              <input
                name="location"
                className="w-full bg-gray-100 pl-10 py-3 rounded-lg"
                placeholder="Ej. Centro de Convenciones"
                value={formData.location}
                onChange={handleChange}
                type="text"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Categoría*</label>
              <select
                name="category"
                className="w-full bg-gray-100 rounded-lg py-3 px-4"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona Categoría</option>
                <option value="tecnologia">Tecnología</option>
                <option value="musica">Música</option>
                <option value="arte">Arte y Cultura</option>
                <option value="deportes">Deportes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Cupos disponibles*</label>
              <input
                type="number"
                name="availableSeats"
                className="w-full bg-gray-100 rounded-lg py-3 px-4"
                value={formData.availableSeats}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Descripción*</label>
              <textarea
                name="description"
                className="w-full bg-gray-100 rounded-lg py-3 px-4"
                rows="5"
                maxLength="750"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-500 text-white font-semibold py-3 rounded-lg hover:bg-pink-600 transition"
            >
              Guardar Evento
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateEvent;
