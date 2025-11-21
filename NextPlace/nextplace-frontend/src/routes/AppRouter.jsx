import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// --- Importaciones de páginas de Usuario ---
import Home from "../pages/user/Home/Home.tsx";
import Login from "../pages/user/Login/login.jsx";
import TicketsPages from "../pages/user/GetTickets/TicketsPages.jsx";
import DetallePage from "../pages/user/GetTickets/DetallePage.jsx";
import PagoPage from "../pages/user/GetTickets/PagoPage.jsx";
import EventDetail from "../pages/user/EventDetail/EventDetail.jsx";

// --- Importaciones de páginas de Organizador ---
import Dashboard from "../pages/organizer/Dashboard/dashnoard.jsx"; // layout principal
import CreateEvent from "../pages/organizer/CreateEvent/CreateEvent.jsx";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        {/* --- Rutas Principales y de Usuario --- */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* --- Flujo de Compra de Tickets --- */}
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/tickets/:eventId" element={<TicketsPages />} />
        <Route path="/detalles/:eventId" element={<DetallePage />} />
        <Route path="/pago/:eventId" element={<PagoPage />} />

        {/* --- Flujo del Organizador --- */}
        <Route path="/organizer" element={<Dashboard />}>
          
          <Route path="create-event" element={<CreateEvent />} />
          
        </Route>
      </Routes>
    </Router>
  );
}
