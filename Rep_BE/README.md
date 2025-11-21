# 🧠 NextPlace – Backend (PMV)

Backend del proyecto **NextPlace**, desarrollado con **Node.js**, **Express**, **Sequelize** y **MySQL**.  
Este servidor provee autenticación JWT, gestión de usuarios, organizadores, eventos, reservas y manejo de cupos.

---

## 🚀 Tecnologías utilizadas

- **Node.js** – Entorno de ejecución
- **Express.js** – Framework web para API
- **MySQL** – Base de datos relacional
- **Sequelize ORM** – Modelado de datos y conexión a MySQL
- **JSON Web Tokens (JWT)** – Autenticación segura
- **bcrypt** – Hasheo de contraseñas
- **nodemon** – Recarga automática en desarrollo
- **dotenv** – Manejo de variables de entorno

---

## ⚙️ Requisitos previos

Debes tener instalado:

- Node.js (v18+)
- MySQL (puerto 3306)
- Postman o similar
- Git

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/usuario/NextPlace_Backend_PMV.git

# Entrar a la carpeta del backend
cd NextPlace_Backend_PMV

# Instalar dependencias
npm install
```

Crear archivo **.env** en la raíz:

```
DB_NAME=NextPlace_db
DB_USER=root
DB_PASS=
DB_HOST=127.0.0.1
DB_PORT=3306
JWT_SECRET=supersecretkey
PORT=4000
```

---

## 🗂️ Estructura del proyecto

```
src/
│── config/
│   └── db.js
│
│── controllers/
│   ├── userController.js
│   ├── organizerController.js
│   ├── eventController.js
│   └── reservaController.js
│
│── middlewares/
│   └── auth.validation.js
│
│── models/
│   ├── User.js
│   ├── Organizer.js
│   ├── Event.js
│   ├── Reserva.js
│   ├── HistoricoReserva.js
│   ├── UserTokenR.js
│   ├── OrgTokenR.js
│   ├── index.js
│   └── associations.js
│
│── routes/
│   ├── userRoutes.js
│   ├── organizerRoutes.js
│   ├── eventRoutes.js
│   └── reservaRoutes.js
│
│── services/
│   └── emailService.js
│
└── app.js
```

---

## 🗃️ Base de datos (MySQL)

La base debe crearse así:

```sql
CREATE DATABASE IF NOT EXISTS NextPlace_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
```

Relaciones principales del sistema:

| Relación | Descripción |
|---------|-------------|
| Organizador → Evento | Un organizador crea muchos eventos |
| Usuario → Reserva | Un usuario puede reservar muchos eventos |
| Evento → Reserva | Un evento puede recibir muchas reservas |
| Reserva → HistoricoReserva | Cada cambio queda registrado |
| Usuario → UserTokenR | Tokens activos por usuario |
| Organizador → OrgTokenR | Tokens activos por organizador |

---

## 🔐 Autenticación

El sistema usa:

- **JWT**
- **bcrypt** para contraseñas
- Tokens guardados en BD en:
  - userTokenR
  - orgTokenR

---

## 📌 Endpoints principales

---

# 👤 Usuarios

### Registrar usuario  
POST `/api/users/register`

```json
{
  "nombre": "Juan Perez",
  "correoElectronico": "juan@mail.com",
  "contrasena": "12345678"
}
```

### Login usuario  
POST `/api/users/login`

```json
{
  "correoElectronico": "juan@mail.com",
  "contrasena": "12345678"
}
```

### Logout usuario  
POST `/api/users/logout`

```json
{
  "token": "JWT_GENERADO"
}
```

---

# 🧑‍💼 Organizadores

### Registrar organizador  
POST `/api/organizers/register`

```json
{
  "nombre": "EmpresaX",
  "correoElectronico": "org@mail.com",
  "contrasena": "clave1234"
}
```

### Login organizador  
POST `/api/organizers/login`

```json
{
  "correoElectronico": "org@mail.com",
  "contrasena": "clave1234"
}
```

---

# 🎫 Eventos

### Crear evento  
POST `/api/events`

```json
{
  "titulo": "Concierto Rock",
  "descripcion": "Banda en vivo",
  "categoria": "Música",
  "lugar": "Auditorio Nacional",
  "fecha": "2025-11-15 20:00:00",
  "cupos": 100,
  "organizador_id": 1
}
```

### Obtener todos  
GET `/api/events`

---

### Filtrar eventos  
POST `/api/events/filter`

```json
{
  "categoria": "Música",
  "randomSearch": "rock"
}
```

---

# 🎟️ Reservas

### Crear una reserva  
POST `/api/reservas`

```json
{
  "usuario_id": 2,
  "evento_id": 5
}
```

✔ Disminuye cupos automáticamente  
✔ Estado: "confirmada"

---

### Cancelar una reserva  
POST `/api/reservas/cancel/10`

✔ Estado → "cancelada"  
✔ Incrementa cupos disponibles  
✔ Registra cambio en historicoReserva  

---

## 🛠 Scripts

```bash
npm run dev    # Servidor con nodemon
npm start      # Servidor normal
```

---
