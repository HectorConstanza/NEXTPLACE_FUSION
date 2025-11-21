
// src/routes/AppRouter.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* --- Páginas públicas / usuario --- */
import Home from "../pages/user/Home/Home";
import EventDetail from "../pages/user/EventDetail/EventDetail";

import Login from "../pages/user/Login/login.jsx";
import TicketsPages from "../pages/user/GetTickets/TicketsPages.jsx";
import DetallePage from "../pages/user/GetTickets/DetallePage.jsx";
import PagoPage from "../pages/user/GetTickets/PagoPage.jsx";

/* --- Dashboard Layout --- */
import DashboardLayout from "../pages/organizer/Dashboard/DashboardLayout";

/* --- Páginas del organizador --- */
import EventList from "../pages/organizer/EventsList/EventList";
import CreateEvent from "../pages/organizer/CreateEvent/CreateEvent.jsx";
import UpdateEvent from "../pages/organizer/CreateEvent/UpdateEvent.jsx"; // NUEVO

export default function AppRouter() {
  return (
    <Router>
      <Routes>

        {/* --- HOME PÚBLICA --- */}
        <Route path="/" element={<Home />} />
        <Route path="/event/:id" element={<EventDetail />} />

        {/* --- LOGIN DE USUARIO --- */}
        <Route path="/login" element={<Login />} />

        {/* --- FLUJO DE COMPRA DE TICKETS --- */}
        <Route path="/tickets/:eventId" element={<TicketsPages />} />
        <Route path="/detalles/:eventId" element={<DetallePage />} />
        <Route path="/pago/:eventId" element={<PagoPage />} />

        {/* --- ORGANIZER DASHBOARD PRINCIPAL --- */}
        <Route
          path="/organizer"
          element={
            <DashboardLayout>
              <EventList />
            </DashboardLayout>
          }
        />

        {/* --- MIS EVENTOS (ORGANIZER) --- */}
        <Route
          path="/organizer/mis-eventos"
          element={
            <DashboardLayout>
              <EventList />
            </DashboardLayout>
          }
        />

        {/* --- CREAR EVENTO (ORGANIZER) --- */}
        <Route
          path="/organizer/crear-evento"
          element={
            <DashboardLayout>
              <CreateEvent />
            </DashboardLayout>
          }
        />

        {/* --- EDITAR EVENTO (ORGANIZER) --- */}
        <Route
          path="/organizer/editar-evento/:id"
          element={
            <DashboardLayout>
              <UpdateEvent />
            </DashboardLayout>
          }
        />

      </Routes>
    </Router>
  );
}

