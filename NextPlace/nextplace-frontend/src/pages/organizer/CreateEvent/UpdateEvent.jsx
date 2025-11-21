import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventForm from "./EventForm";

export default function UpdateEvent() {
  const { id } = useParams();
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    // aquí jalas el evento real
    // GET /events/:id
    setEvento({
      eventName: "Tech Conference",
      date: "2025-04-20",
      time: "14:00",
      location: "UCA",
      category: "tecnologia",
      description: "Evento sobre innovación...",
    });
  }, [id]);

  const handleUpdate = (data) => {
    console.log("Editar evento →", id, data);
    // API PATCH /events/:id
  };

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
