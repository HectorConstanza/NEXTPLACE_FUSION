// src/pages/user/home/Home.jsx
import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import ButtonsSection from "../../../components/ButtonsSections";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import API from "../../../utils/api.js";
import { useSearch } from "../../../context/SearchContext";

export default function Home() {
  // 🟣 No definimos un tipo para evitar errores de TS
  const [events, setEvents] = useState([]);

  const searchCtx = useSearch();
  const debouncedQuery = searchCtx?.debouncedQuery || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");

        // 🟣 MAPEAR EVENTOS PARA INCLUIR ESTADO, HORA Y CUPOS
        const cleanEvents = res.data.map((ev) => {
          const eventDate = new Date(ev.fecha);
          const today = new Date();

          let estado = "disponible";
          if (eventDate > today) estado = "próximamente";
          if (eventDate.toDateString() === today.toDateString()) estado = "en curso";
          if (eventDate < today) estado = "finalizado";
          if (ev.cuposDispo <= 0) estado = "agotado";

          return {
            ...ev,
            hora: ev.fecha?.split("T")[1]?.slice(0, 5) || "00:00",
            estado,
          };
        });

        setEvents(cleanEvents);
      } catch (err) {
        console.error("Error al cargar eventos", err);
      }
    };

    fetchEvents();
  }, []);

  // 🟣 BÚSQUEDA PÚBLICA
  const filteredEvents = useMemo(() => {
    if (!debouncedQuery) return events;

    const q = debouncedQuery.toLowerCase();

    return events.filter((ev) => {
      const title = (ev.titulo || "").toLowerCase();
      const desc = (ev.descripcion || "").toLowerCase();
      const cat = (ev.categoria || "").toLowerCase();
      return title.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [events, debouncedQuery]);

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }}></div>

      <Header />
      <ButtonsSection />

      <main className="cards-container">
        {filteredEvents.length > 0 ? (
          // @ts-ignore  ← evita errores molestos sin afectar nada
          filteredEvents.map((ev) => (
            <EventCard
              key={ev.id}
              id={ev.id}
              titulo={ev.titulo}
              fecha={ev.fecha}
              hora={ev.hora}
              categoria={ev.categoria}
              cuposDispo={ev.cuposDispo}
              estado={ev.estado}
              image="/src/assets/images/ejemplo.jpg"
            />
          ))
        ) : (
          <p>No hay eventos disponibles.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
