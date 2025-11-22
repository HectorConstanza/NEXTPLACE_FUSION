// src/pages/organizer/EventsList/EventList.jsx
import React from "react";

// Importar imágenes correctamente desde /src/assets/images
import event1 from "../../../assets/images/event1.jpg";
import event2 from "../../../assets/images/event2.jpg";
import event3 from "../../../assets/images/event3.jpg";

import EventCard from "../../../components/EventCard";
import "./EventList.css";

export default function EventList() {
  const events = [
    {
      id: 1,
      image: event1,
      title: "Tech Conference 2025",
      date: "Mar 15, 2025",
      tag: "Upcoming"
    },
    {
      id: 2,
      image: event2,
      title: "Web Development Workshop",
      date: "Feb 28, 2025",
      tag: "Upcoming"
    },
    {
      id: 3,
      image: event3,
      title: "Design Thinking Meetup",
      date: "Jan 20, 2025",
      tag: "Completed"
    }
  ];

  return (
    <div className="event-list-wrapper">

      <div className="event-list-header">
        <div>
          <h1 className="event-title">My Events</h1>
          <p className="event-subtitle">
            Manage and view all your created events
          </p>
        </div>

        <button className="create-event-btn">
          + Create New Event
        </button>
      </div>

      <div className="cards-container">
        {events.map((ev) => (
          <EventCard
            key={ev.id}
            image={ev.image}
            title={ev.title}
            date={ev.date}
            tag={ev.tag}
            onEdit={() => console.log("Editar", ev.id)}
            onView={() => console.log("Ver", ev.id)}
            onDelete={() => console.log("Eliminar", ev.id)}
          />
        ))}
      </div>

    </div>
  );
}
