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

  const showAlert = (title, text, icon) => {
    return Swal.fire({
      title,
      html: `<span style="color:#ff9ad5">${text}</span>`,
      icon,
      background: "#1c1c1c",
      color: "#ff9ad5",
      iconColor: "#ff9ad5",
      confirmButtonColor: "#ff9ad5",
      confirmButtonText: "Aceptar",
    });
  };

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
          cost: ev.costo,
          imageUrl: ev.imagen
        };

        setEvento(mapped);
      } catch {
        showAlert("Error", "No se pudo cargar el evento", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      const body = {
        titulo: data.get("eventName"),
        descripcion: data.get("description"),
        categoria: data.get("category"),
        lugar: data.get("location"),
        fecha: `${data.get("date")}T${data.get("time")}:00`,
        cupos: Number(data.get("availableSeats")),
        costo: Number(data.get("cost")),
      };

      await API.put(`/events/${id}`, body);

      await showAlert("Éxito", "Evento actualizado correctamente", "success");
      navigate("/organizer");

    } catch (error) {
      showAlert("Error", error.response?.data?.message || "No se pudo actualizar el evento", "error");
    }
  };

  if (loading) return <p>Cargando evento...</p>;

  return (
    evento && (
      <EventForm mode="edit" initialData={evento} onSubmit={handleUpdate} />
    )
  );
}
