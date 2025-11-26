import React, { useEffect, useState, useMemo } from "react";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import ButtonsSection from "../../../components/ButtonsSections";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import API from "../../../utils/api.js";
import { useSearch } from "../../../context/SearchContext";

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const searchCtx = useSearch() as any;
  const debouncedQuery = searchCtx.debouncedQuery as string | undefined;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error al cargar eventos", err);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!debouncedQuery) return events;
    const q = (debouncedQuery || "").toLowerCase();
    return events.filter((ev: any) => {
      const title = (ev.titulo || "").toString().toLowerCase();
      const desc = (ev.descripcion || "").toString().toLowerCase();
      const cat = (ev.categoria || "").toString().toLowerCase();
      return title.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [events, debouncedQuery]);

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }}></div>
      <Header />
      <ButtonsSection />

      {/* Search is provided in the Navbar via SearchContext */}

      <main className="cards-container">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((ev) => (
            <EventCard
              key={ev.id}
              id={ev.id}
              titulo={ev.titulo}
              fecha={ev.fecha}
              categoria={ev.categoria}
              image={"/src/assets/images/ejemplo.jpg"}
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
