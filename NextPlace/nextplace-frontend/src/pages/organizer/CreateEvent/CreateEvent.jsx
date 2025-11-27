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
      background: "#1c1c1c",
      color: "#ffffff",
      iconColor: "#7CDAF9",
      confirmButtonColor: "#7CDAF9",
      confirmButtonText: "Aceptar",
    });
  };

  const handleCreate = async (data) => {
    try {
      const organizer = JSON.parse(localStorage.getItem("user"));

      if (!organizer || organizer.role !== "organizer") {
        return showAlert("Error", "Solo los organizadores pueden crear eventos", "error");
      }

      // Validar campos vacíos
      const required = [
        { key: "eventName", name: "Nombre del evento" },
        { key: "date", name: "Fecha" },
        { key: "time", name: "Hora" },
        { key: "location", name: "Ubicación" },
        { key: "category", name: "Categoría" },
        { key: "description", name: "Descripción" },
        { key: "availableSeats", name: "Cupos" },
        { key: "cost", name: "Costo" },
      ];

      for (const field of required) {
        if (!data.get(field.key) || data.get(field.key).toString().trim() === "") {
          return showAlert("Campo incompleto", `El campo ${field.name} es obligatorio.`, "warning");
        }
      }

      const createData = new FormData();

      createData.append("titulo", data.get("eventName"));
      createData.append("descripcion", data.get("description"));
      createData.append("categoria", data.get("category"));
      createData.append("lugar", data.get("location"));
      createData.append("fecha", `${data.get("date")}T${data.get("time")}:00`);
      createData.append("cupos", data.get("availableSeats"));
      createData.append("costo", data.get("cost"));
      createData.append("organizador_id", organizer.id);

      if (data.get("imagen")) {
        createData.append("imagen", data.get("imagen"));
      }

      await API.post("/events", createData);

      await showAlert("Éxito", "Evento creado exitosamente", "success");
      navigate("/organizer");

    } catch (error) {
      showAlert("Error", error.response?.data?.message || "No se pudo crear el evento", "error");
    }
  };

  return <EventForm mode="create" initialData={null} onSubmit={handleCreate} />;
}
