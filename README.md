🎟️ NextPlace Fusion – Sistema de Eventos
NextPlace Fusion es una aplicación web para gestionar eventos, comprar tickets y administrar organizadores. Incluye un frontend en React + Tailwind CSS y un backend en Node.js + Express + Sequelize.

🚀 Características principales
Usuarios

Registro e inicio de sesión (/api/users/register, /api/users/login)

Navegación por eventos disponibles

Flujo de compra de tickets (detalle → pago → confirmación)

Organizadores

Inicio de sesión (/api/organizers/login)

Dashboard con navegación interna

Crear eventos (POST /api/events)

Listar y administrar eventos (GET /api/events)

Eventos

Modelo con titulo, descripcion, categoria, lugar, fecha, cupos, organizador_id

Cupos disponibles (cuposDispo) inicializados con el total de cupos

📂 Estructura del proyecto
Código
NEXTPLACE_FUSION/
├── NextPlace/              # Frontend (React + Tailwind)
│   ├── src/pages/user      # Flujo de usuario
│   ├── src/pages/organizer # Dashboard organizador
│   └── src/router          # AppRouter
│
├── Rep_BE/                 # Backend (Node.js + Express + Sequelize)
│   ├── controllers/        # Controladores (ej. eventController.js)
│   ├── routes/             # Rutas API
│   ├── models/             # Modelos Sequelize
│   └── app.js              # Configuración principal
│
└── README.md
⚙️ Instalación y ejecución
1. Clonar el repositorio
bash
git clone https://github.com/HectorConstanza/NEXTPLACE_FUSION.git
cd NEXTPLACE_FUSION
2. Backend
bash
cd Rep_BE
npm install
Configura tu archivo .env:

env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASS=tu_password
DB_NAME=nextplace
JWT_SECRET=supersecreto
Levanta el servidor:

bash
npm run dev
3. Frontend
bash
cd NextPlace
npm install
npm run dev
🔑 Flujo de autenticación
Usuarios → /api/users/login

Organizadores → /api/organizers/login

El frontend usa un login unificado que prueba primero usuarios y luego organizadores.

El backend devuelve { token, user } o { token, organizer }.

El frontend guarda el token en localStorage y redirige:

Usuario → /

Organizador → /organizer

📡 Endpoints principales
Usuarios
POST /api/users/register → Registro

POST /api/users/login → Login

Organizadores
POST /api/organizers/login → Login

Eventos
GET /api/events → Listar eventos

GET /api/events/:id → Detalle de evento

POST /api/events → Crear evento (requiere token de organizador)

Ejemplo de creación de evento:

json
{
  "titulo": "Conferencia de Tecnología 2025",
  "descripcion": "Evento sobre innovación y startups",
  "categoria": "tecnologia",
  "lugar": "Universidad UCA",
  "fecha": "2025-12-01 18:00",
  "cupos": 100,
  "organizador_id": 1
}
🛠️ Tecnologías usadas
Frontend: React, React Router, Tailwind CSS

Backend: Node.js, Express, Sequelize, JWT

Base de datos: MySQL / PostgreSQL

Autenticación: JWT con roles (usuario / organizador)

📌 Próximos pasos
Agregar edición/eliminación de eventos

Middleware de autorización para proteger rutas

Mejorar UI del dashboard con estadísticas

👨‍💻 Autores
Proyecto desarrollado por Hector Constanza y colaboradores.
