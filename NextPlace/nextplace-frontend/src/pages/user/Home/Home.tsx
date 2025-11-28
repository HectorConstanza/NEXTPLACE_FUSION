import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import ButtonsSection from "../../../components/ButtonsSections";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import API from "../../../utils/api.js";
import { useSearch } from "../../../context/SearchContext";

// ENLACE AL CSS
import "./Home.css";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const searchCtx = useSearch();
  const debouncedQuery = searchCtx?.debouncedQuery || "";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");

        const cleanEvents = res.data.map((ev) => {
          const eventDate = new Date(ev.fecha);
          const today = new Date();

          let estado = "disponible";
          if (eventDate > today) estado = "próximamente";
          if (eventDate.toDateString() === today.toDateString())
            estado = "en curso";
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

  // Filtrado combinado
  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (categoryFilter) {
      result = result.filter((ev) => ev.categoria === categoryFilter);
    }

    if (debouncedQuery) {
      const q = debouncedQuery.toLowerCase();
      result = result.filter((ev) => {
        const title = (ev.titulo || "").toLowerCase();
        const desc = (ev.descripcion || "").toLowerCase();
        const cat = (ev.categoria || "").toLowerCase();
        return title.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    return result;
  }, [events, categoryFilter, debouncedQuery]);

  const handleCategorySelect = (cat) => {
    if (cat === "Todos") {
      setCategoryFilter(null);
      return;
    }
    setCategoryFilter(cat === categoryFilter ? null : cat);
  };

  return (
    <>
      <Navbar />

      {/* ESPACIADO AJUSTADO */}
      <div className="home-spacing-top"></div>

      <div className="home-header-wrapper">
        <Header />
      </div>

      <div className="home-buttons-wrapper">
        <ButtonsSection
          onCategorySelect={handleCategorySelect}
          activeCategory={categoryFilter}
        />
      </div>

      <main className="home-cards-container">
        {filteredEvents.length > 0 ? (
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
              image={
                ev.imagen
                  ? `http://localhost:4000/${ev.imagen}`
                  : "/src/assets/images/ejemplo.jpg"
              }
            />
          ))
        ) : (
          <p className="no-events-msg">No hay eventos disponibles.</p>
        )}
      </main>

      <Footer />
    </>
  );
}
