import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home/Home.tsx";
import Login from "../pages/user/Login/login.jsx";
import TicketsPages from "../pages/user/GetTickets/TicketsPages.jsx";
import DetallePage from "../pages/user/GetTickets/DetallePage.jsx";
import PagoPage from "../pages/user/GetTickets/PagoPage.jsx";
import EventDetail from "../pages/user/EventDetail/EventDetail.jsx";

import Dashboard from "../pages/organizer/Dashboard/dashnoard.jsx";
import CreateEvent from "../pages/organizer/CreateEvent/CreateEvent.jsx";

import ProtectedRoute from "../routes/ProtectedRoute";

export default function AppRouter() {
  return (
    <Router>
      <Routes>

        {/* RUTAS PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* RUTAS PÚBLICAS DEL USUARIO */}
        <Route path="/event/:id" element={<EventDetail />} />
        <Route path="/tickets/:eventId" element={<TicketsPages />} />
        <Route path="/detalles/:eventId" element={<DetallePage />} />
        <Route path="/pago/:eventId" element={<PagoPage />} />

        {/* RUTAS DEL ORGANIZADOR (PROTEGIDAS) */}
        <Route
          path="/organizer/create-event"
          element={
            <ProtectedRoute requiredRole="organizer">
              <CreateEvent />
            </ProtectedRoute>
          }

        >
          <Route
            path="create-event"
            element={
              <ProtectedRoute role="organizer">
                <CreateEvent />
              </ProtectedRoute>
            }
          />
        </Route>

      </Routes>
    </Router>
  );
}
