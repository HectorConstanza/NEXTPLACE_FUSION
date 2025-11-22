# NEXTPLACE_FUSION
# 🎟️ NextPlace - Sistema de Eventos

NextPlace es una aplicación web para gestionar eventos, compra de tickets y administración de organizadores.  
Incluye **frontend en React + Tailwind CSS** y **backend en Node.js + Express + Sequelize**.

---

## 🚀 Características principales

- **Usuarios**
  - Registro e inicio de sesión (`/api/users/register`, `/api/users/login`)
  - Navegación por eventos disponibles
  - Flujo de compra de tickets (detalle → pago → confirmación)

- **Organizadores**
  - Inicio de sesión (`/api/organizers/login`)
  - Dashboard con navegación interna
  - Crear eventos (`POST /api/events`)
  - Listar y administrar eventos (`GET /api/events`)

- **Eventos**
  - Modelo con `titulo, descripcion, categoria, lugar, fecha, cupos, organizador_id`
  - Cupos disponibles (`cuposDispo`) inicializados con el total de cupos

---

cd backend
npm install

