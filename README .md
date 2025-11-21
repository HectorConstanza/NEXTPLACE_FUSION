# NextPlace Backend — Registro de Cambios (Última actualización)

Este documento resume los cambios realizados recientemente en el backend mientras se integraba con el frontend y se realizaron ajustes de seguridad, autenticación y rutas protegidas.

---

## ✅ **1. Autenticación Mejorada (Usuarios y Organizadores)**

### Cambios realizados:
- Se corrigió el hashing de contraseña en registro de organizadores.
- Se agregó generación, almacenamiento y validación de tokens para *usuarios* y *organizadores*.
- Se implementó:
  - `authUserMiddleware`
  - `authOrganizerMiddleware`
  - `authorizeRole(...)`
- Ahora las rutas protegidas solo permiten el acceso si se envía un **JWT válido guardado en la BD**.

---

## ✅ **2. Validaciones Mejoradas**
- Validación personalizada para mostrar errores específicos (no genéricos).
- Validación para evitar duplicación de correos electrónicos.
- Mensajes de error más claros enviados al frontend (para uso con SweetAlert).

---

## ✅ **3. Integración con Frontend**
- Axios configurado con interceptores para enviar `Authorization: Bearer <token>`.
- SweetAlert integrado en Login/Registro.
- Ajuste en flujos:
  - Login → primero intenta usuario, luego organizador.
  - Registro → solo usuario.
- Mejora del comportamiento: ya no muestra alertas de éxito en login (flujo más limpio).

---

## ✅ **4. Protección de Rutas en React**
Se implementaron:

### `ProtectedRouteUser`
- Bloquea rutas si no hay usuario logeado.

### `ProtectedRouteOrganizer`
- Bloquea rutas si no hay organizador logeado.
- Redirige al login si el token no coincide.

Se corrigió el acceso a `/organizer/create-event`.

---

## ✅ **5. Modelos, Asociaciones y Base de Datos**
- Se corrigieron nombres de tablas (`usuario`, `evento`, etc.).
- Se eliminaron columnas duplicadas y se corrigieron columnas faltantes.
- Se implementaron las asociaciones:
  - Usuario → TokenR
  - Usuario → Reservas
  - Evento → Reservas
  - Reserva → Historial
- Se removió el soft delete cuando causaba errores (deletedAt inexistente).

---

## ✅ **6. Correcciones en Backend**
- Corrección en `sequelize.sync()` y su orden de importaciones.
- Limpieza del archivo `index.js` de modelos.
- Ajustes en controladores para evitar errores:
  - Registro de organizador ya no falla por "data and salt required".
  - Login de organizador ahora devuelve token y datos.
- Solución al problema:
  ```
  Unknown column 'organizer_id' in field list
  ```
  Actualizando modelo de `Evento`.

---

## ✅ **7. Flujo de Reservas Implementado**
Se creó backend para:
- Crear reserva
- Restar cupos automáticamente
- Historial de cambios
- Cancelar reserva + devolver cupos

---

## 📄 **Estado actual del proyecto**
El backend ahora:
- Soporta login/registro con roles separados.
- Valida tokens según rol.
- Bloquea rutas desde frontend.
- Permite crear, leer y filtrar eventos.
- Permite reservas y cancelaciones con lógica correcta.

---

