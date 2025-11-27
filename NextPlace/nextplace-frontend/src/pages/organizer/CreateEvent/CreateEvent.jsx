import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../utils/api.js";
import EventForm from "./EventForm";

export default function CreateEvent() {
  const navigate = useNavigate();

  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title,
      text,
      icon,
      background: "#1c1c1c",       //  fondo negro
      color: "#ffffff",            //  texto blanco
      iconColor: "#7CDAF9",        //  color del ícono (celestito NextPlace)
      confirmButtonColor: "#7CDAF9",
      confirmButtonText: "Aceptar",
    });
  };

  const handleCreate = async (formData) => {
    try {
      const organizer = JSON.parse(localStorage.getItem("user"));

      if (!organizer || organizer.role !== "organizer") {
        return showAlert("Error", "Solo los organizadores pueden crear eventos", "error");
      }

      // 🔍 Validación de campos obligatorios
      const requiredFields = [
        { field: "eventName", text: "Nombre del evento" },
        { field: "date", text: "Fecha" },
        { field: "time", text: "Hora" },
        { field: "location", text: "Ubicación" },
        { field: "category", text: "Categoría" },
        { field: "description", text: "Descripción" },
        { field: "availableSeats", text: "Cupos disponibles" },
      ];

      for (const item of requiredFields) {
        if (!formData[item.field] || formData[item.field].toString().trim() === "") {
          return showAlert(
            "Campo incompleto",
            `El campo "${item.text}" es obligatorio.`,
            "warning"
          );
        }
      }

      // Combinar fecha + hora → formato SQL
      const fullDate = `${formData.date} ${formData.time}:00`;

      const eventData = {
        titulo: formData.eventName,
        descripcion: formData.description,
        categoria: formData.category,
        lugar: formData.location,
        fecha: fullDate,
        cupos: Number(formData.availableSeats),
        organizador_id: organizer.id,
      };

      console.log("Enviando evento →", eventData);

      await API.post("/events", eventData);

      await showAlert("Éxito", "Evento creado correctamente", "success");

      navigate("/organizer");

    } catch (error) {
      console.error("Error al crear evento:", error);

      showAlert(
        "Error",
        error.response?.data?.message || "No se pudo crear el evento",
        "error"
      );
    }
  };

  return <EventForm mode="create" initialData={null} onSubmit={handleCreate} />;
}
