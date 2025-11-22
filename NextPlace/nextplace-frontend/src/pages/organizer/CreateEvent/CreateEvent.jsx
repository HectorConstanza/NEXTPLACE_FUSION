import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../utils/api.js";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
      const organizer = JSON.parse(localStorage.getItem("user"));

      if (!organizer || organizer.role !== "organizer") {
        return Swal.fire("Error", "Solo los organizadores pueden crear eventos", "error");
      }

      // Combinar fecha + hora → formato aceptado por MySQL
      const fullDate = `${formData.date} ${formData.time}:00`;

      const eventData = {
        titulo: formData.eventName,
        descripcion: formData.description,
        categoria: formData.category,
        lugar: formData.location,
        fecha: fullDate,
        cupos: formData.availableSeats ? Number(formData.availableSeats) : 0,
        organizador_id: organizer.id,
      };

      console.log("Enviando evento →", eventData);

      await API.post("/events", eventData);

      Swal.fire("Éxito", "Evento creado correctamente", "success");
      navigate("/organizer");
    } catch (error) {
      console.error("Error al crear evento:", error);
      Swal.fire(
        "Error",
        error.response?.data?.message || "No se pudo crear el evento",
        "error"
      );
    }
  };

  return <EventForm mode="create" initialData={null} onSubmit={handleCreate} />;
}