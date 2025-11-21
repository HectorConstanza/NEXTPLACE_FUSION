import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import Header from "../../../components/Header";
import ButtonsSection from "../../../components/ButtonsSections";
import EventCard from "../../../components/EventCard";
import Footer from "../../../components/Footer";
import API from "../../../utils/api.js";

export default function Home() {
  const [events, setEvents] = useState([]);

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

  return (
    <>
      <Navbar />
      <div style={{ height: "100px" }}></div>
      <Header />
      <ButtonsSection />

      <main className="cards-container">
        {events.length > 0 ? (
          events.map((ev) => (
            <EventCard
              key={ev.id}
              id={ev.id}
              titulo={ev.titulo}
              fecha={ev.fecha}
              categoria={ev.categoria}
              image={"/src/assets/images/ejemplo.jpg"} // opcional si tu modelo no guarda imagen
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
