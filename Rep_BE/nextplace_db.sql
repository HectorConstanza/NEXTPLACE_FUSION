-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2025 a las 02:58:45
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nextplace_db`
--
CREATE DATABASE IF NOT EXISTS `nextplace_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `nextplace_db`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `categoria` varchar(255) DEFAULT NULL,
  `lugar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `cupos` int(11) NOT NULL,
  `organizador_id` int(11) DEFAULT NULL,
  `cuposDispo` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `deletedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`id`, `titulo`, `descripcion`, `categoria`, `lugar`, `fecha`, `cupos`, `organizador_id`, `cuposDispo`, `createdAt`, `updatedAt`, `deletedAt`) VALUES
(1, 'Concierto de Rock', 'Bandas locales en vivo', 'Música', 'Auditorio Nacional', '2025-11-16 02:00:00', 200, 1, 200, '2025-11-20 01:01:49', '2025-11-20 01:22:11', NULL),
(2, 'Concierto de Manuel Turizo', 'Bandas internacionales en vivo', 'Música', 'Auditorio Nacional', '2025-11-16 02:00:00', 200, 1, 200, '2025-11-20 01:31:21', '2025-11-20 01:47:00', NULL),
(3, 'Concierto Bad bunny', 'Bandas internacionales en vivo', 'Música', 'Auditorio Nacional', '2025-11-16 02:00:00', 200, 1, 200, '2025-11-20 01:44:08', '2025-11-20 01:44:08', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventoextras`
--

CREATE TABLE `eventoextras` (
  `evento_id` int(11) NOT NULL,
  `extra_id` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `extras`
--

CREATE TABLE `extras` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `formapago`
--

CREATE TABLE `formapago` (
  `id` int(11) NOT NULL,
  `titular` varchar(100) DEFAULT NULL,
  `numero` varchar(50) DEFAULT NULL,
  `numeroSeguridad` varchar(10) DEFAULT NULL,
  `fechaVencimiento` date DEFAULT NULL,
  `compania` varchar(50) DEFAULT NULL,
  `usuario_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historicoreserva`
--

CREATE TABLE `historicoreserva` (
  `id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  `fechaCambio` datetime DEFAULT current_timestamp(),
  `estadoAnterior` varchar(50) DEFAULT NULL,
  `estadoNuevo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `historicoreserva`
--

INSERT INTO `historicoreserva` (`id`, `reserva_id`, `fechaCambio`, `estadoAnterior`, `estadoNuevo`) VALUES
(1, 1, '2025-11-20 01:22:11', 'confirmada', 'cancelada'),
(2, 2, '2025-11-20 01:47:00', 'confirmada', 'cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `organizador`
--

CREATE TABLE `organizador` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contraseña` varchar(200) DEFAULT NULL,
  `correoElectronico` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `organizador`
--

INSERT INTO `organizador` (`id`, `nombre`, `contraseña`, `correoElectronico`) VALUES
(1, 'Juan Pérez', '$2b$10$EYMph3vafJ0aTj7EfWz0PuXHzSXSoOg6Ke5oRGquG6bWuGTOpnp7e', 'juan.organizador@example.com'),
(2, 'Ramiro Pérez', '$2b$10$MU72dbbUtDBzwclWW324KeyehjGPOLo1n.lRnl3OUuFLpFNP8c/VO', 'Ramiro.organizador@example.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orgtokenr`
--

CREATE TABLE `orgtokenr` (
  `id` int(11) NOT NULL,
  `organizador_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fechaC` datetime DEFAULT current_timestamp(),
  `fechaV` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `evento_id` int(11) NOT NULL,
  `fechaReserva` datetime DEFAULT current_timestamp(),
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id`, `usuario_id`, `evento_id`, `fechaReserva`, `estado`) VALUES
(1, 1, 1, '2025-11-20 01:10:56', 'cancelada'),
(2, 2, 2, '2025-11-20 01:46:52', 'cancelada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usertokenr`
--

CREATE TABLE `usertokenr` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `fechaC` datetime DEFAULT current_timestamp(),
  `fechaV` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usertokenr`
--

INSERT INTO `usertokenr` (`id`, `usuario_id`, `token`, `fechaC`, `fechaV`) VALUES
(3, 9, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZSI6ImF0dGVuZGVlIiwiaWF0IjoxNzYzNjAzMDI2LCJleHAiOjE3NjM2MTM4MjZ9.1XpN7N7MUnwaYzAUuq7izR02r5SZ0jH15IoMO-Cn9SU', '2025-11-20 01:43:46', '2025-11-20 04:43:46');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `correoElectronico` varchar(150) NOT NULL,
  `role` enum('organizer','attendee') NOT NULL DEFAULT 'attendee'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `contrasena`, `correoElectronico`, `role`) VALUES
(1, 'Juan Perez', '$2b$10$fuqlbc.xcC/8/lZjMTO4KOU7LtdeI26uF0MgK.kS1ePX8bV8VTugW', 'juan@gmail.com', 'attendee'),
(2, 'Xavier Gacia', '$2b$10$krcn013gA7j6XncbKIVJOOHp1euREnhlzYwiJzv8IMD9PJ/3Zvs7K', 'xavier@gmail.com', 'attendee'),
(3, 'Xavier Gacia', '$2b$10$CvPIDNF86.x6IE7QbPDgAuNF/KC6Z1/uAV4ECTnUIgpzZkiTeXfcK', '1234@gmail.com', 'attendee'),
(4, 'Prueba ', '$2b$10$GP2wO7blyyC9ZNS8s3F.rOPmZSyCZTnLPbpqhkCM1P6lKxotr6B.q', 'prueba@gmail.com', 'attendee'),
(5, 'rony ', '$2b$10$KqQfxxy7FkjjFNTOMqhB5.ejHWgrmORZsEDFHT2gE6HYEs3Lg4WDS', 'rony@gmail.com', 'attendee'),
(6, 'Juan', '$2b$10$IMZ3WOZQN2VTBoldd8I76ef02Ii3ujPG8ZVPwlRnFlKlhn/tU3Bp2', 'juan@mail.com', 'attendee'),
(7, 'Juan', '$2b$10$S6BR9W9EwnN1Qp9RLaQ4Bu3svDEJ189JwHApOXg5ydV5EC1U19PR.', 'aaa@mail.com', 'attendee'),
(8, 'Xavier', '$2b$10$vQPG1.TZH.ZVNCjOKZyC5uT0k.0c5IxznCVSViQVpecIYshPYU/k.', 'Xavier@mail.com', 'attendee'),
(9, 'Xavier', '$2b$10$cben4pLAYjuDOQ1s6MQS7uRWeXdLiefdCL1fFbCovt8TICmqMTOga', 'Prueba@mail.com', 'attendee');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioeventofavorito`
--

CREATE TABLE `usuarioeventofavorito` (
  `usuario_id` int(11) NOT NULL,
  `evento_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_uefEvento` (`organizador_id`);

--
-- Indices de la tabla `eventoextras`
--
ALTER TABLE `eventoextras`
  ADD PRIMARY KEY (`evento_id`,`extra_id`),
  ADD KEY `FK_extrasEventoExtras` (`extra_id`);

--
-- Indices de la tabla `extras`
--
ALTER TABLE `extras`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `formapago`
--
ALTER TABLE `formapago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_userPagos` (`usuario_id`);

--
-- Indices de la tabla `historicoreserva`
--
ALTER TABLE `historicoreserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_reservasHistorico` (`reserva_id`);

--
-- Indices de la tabla `organizador`
--
ALTER TABLE `organizador`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orgtokenr`
--
ALTER TABLE `orgtokenr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_orgUserTokenR` (`organizador_id`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_eventoReservas` (`evento_id`),
  ADD KEY `FK_usuarioReservas` (`usuario_id`);

--
-- Indices de la tabla `usertokenr`
--
ALTER TABLE `usertokenr`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_userUserTokenR` (`usuario_id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarioeventofavorito`
--
ALTER TABLE `usuarioeventofavorito`
  ADD PRIMARY KEY (`usuario_id`,`evento_id`),
  ADD KEY `FK_eventoUsuarioEventoFav` (`evento_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `extras`
--
ALTER TABLE `extras`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `formapago`
--
ALTER TABLE `formapago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historicoreserva`
--
ALTER TABLE `historicoreserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `organizador`
--
ALTER TABLE `organizador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `orgtokenr`
--
ALTER TABLE `orgtokenr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `usertokenr`
--
ALTER TABLE `usertokenr`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `FK_uefEvento` FOREIGN KEY (`organizador_id`) REFERENCES `organizador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `eventoextras`
--
ALTER TABLE `eventoextras`
  ADD CONSTRAINT `FK_eventoEventoExtras` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_extrasEventoExtras` FOREIGN KEY (`extra_id`) REFERENCES `extras` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `formapago`
--
ALTER TABLE `formapago`
  ADD CONSTRAINT `FK_userPagos` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE SET NULL;

--
-- Filtros para la tabla `historicoreserva`
--
ALTER TABLE `historicoreserva`
  ADD CONSTRAINT `FK_reservasHistorico` FOREIGN KEY (`reserva_id`) REFERENCES `reserva` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `orgtokenr`
--
ALTER TABLE `orgtokenr`
  ADD CONSTRAINT `FK_orgUserTokenR` FOREIGN KEY (`organizador_id`) REFERENCES `organizador` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `FK_eventoReservas` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_usuarioReservas` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usertokenr`
--
ALTER TABLE `usertokenr`
  ADD CONSTRAINT `FK_userUserTokenR` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioeventofavorito`
--
ALTER TABLE `usuarioeventofavorito`
  ADD CONSTRAINT `FK_eventoUsuarioEventoFav` FOREIGN KEY (`evento_id`) REFERENCES `evento` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_usuarioUsuarioEventoFav` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

UPDATE evento
SET categoria = 'Música'
WHERE LOWER(categoria) IN ('musica', 'música');


UPDATE evento
SET categoria = 'Arte y Cultura'
WHERE LOWER(categoria) IN ('arte', 'arte y cultura');

UPDATE evento
SET categoria = 'Tecnología'
WHERE LOWER(categoria) IN ('tecnologia', 'tecnología');
