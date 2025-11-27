// src/pages/organizer/UpdateEvent/UpdateEvent.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import EventForm from "./EventForm";
import API from "../../../utils/api";

export default function UpdateEvent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [evento, setEvento] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🌸✨ SweetAlert personalizado (negro + rosado)
  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title: title,
      html: `<span style="color:#ff9ad5">${text}</span>`,
      icon: icon,
      background: "#1c1c1c",
      color: "#ff9ad5",
      iconColor: "#ff9ad5",
      confirmButtonColor: "#ff9ad5",
      confirmButtonText: "Aceptar",
    });
  };

  // 🟣 1. Jalar el evento real del backend
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${id}`);
        const ev = res.data;

        const mapped = {
          eventName: ev.titulo,
          date: ev.fecha.split("T")[0],
          time: ev.fecha.split("T")[1].slice(0, 5),
          location: ev.lugar,
          category: ev.categoria,
          description: ev.descripcion,
          availableSeats: ev.cupos,
        };

        setEvento(mapped);
      } catch (error) {
        console.error("Error al cargar evento:", error);
        showAlert("Error", "No se pudo cargar el evento", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  // 🟣 2. Guardar cambios en backend
  const handleUpdate = async (data) => {
    try {
      // Validación de campos
      const fields = [
        { field: "eventName", name: "Nombre del evento" },
        { field: "date", name: "Fecha" },
        { field: "time", name: "Hora" },
        { field: "location", name: "Ubicación" },
        { field: "category", name: "Categoría" },
        { field: "description", name: "Descripción" },
        { field: "availableSeats", name: "Cupos disponibles" },
      ];

      for (const f of fields) {
        if (!data[f.field] || data[f.field].toString().trim() === "") {
          return showAlert(
            "Campo incompleto",
            `El campo <b>${f.name}</b> es obligatorio.`,
            "warning"
          );
        }
      }

      const updatedEvent = {
        titulo: data.eventName,
        descripcion: data.description,
        categoria: data.category,
        lugar: data.location,
        fecha: `${data.date}T${data.time}:00`,
        cupos: Number(data.availableSeats),
      };

      await API.put(`/events/${id}`, updatedEvent);

      await showAlert("Éxito", "Evento actualizado correctamente", "success");

      // Redirigir a Mis Eventos igual que CreateEvent
      navigate("/organizer");
    } catch (error) {
      console.error(error);
      showAlert(
        "Error",
        error.response?.data?.message || "No se pudo actualizar el evento",
        "error"
      );
    }
  };

  if (loading) return <p>Cargando evento...</p>;

  return (
    evento && (
      <EventForm
        mode="edit"
        initialData={evento}
        onSubmit={handleUpdate}
      />
    )
  );
}
