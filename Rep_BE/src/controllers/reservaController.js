// src/controllers/reservaController.js
import { Reserva } from "../models/Reserva.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { HistoricoReserva } from "../models/HistoricoReserva.js";
import { sequelize } from "../config/db.js";

// ======================================================
// Reserva con cantidad múltiple
// ======================================================
export const createReserva = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { usuario_id, evento_id, cantidad } = req.body;

    // Normalizar cantidad
    const qty = parseInt(cantidad);
    if (!qty || qty <= 0) {
      await t.rollback();
      return res.status(400).json({
        message: "La cantidad debe ser un número mayor que 0",
      });
    }

    // Verificar usuario
    const user = await User.findByPk(usuario_id, { transaction: t });
    if (!user) {
      await t.rollback();
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar evento (con bloqueo para concurrencia)
    const event = await Event.findByPk(evento_id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!event) {
      await t.rollback();
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Validar cupos
    if (event.cuposDispo < qty) {
      await t.rollback();
      return res.status(400).json({
        message: `Solo quedan ${event.cuposDispo} cupos disponibles`,
      });
    }

    // Crear reserva
    const reserva = await Reserva.create(
      {
        usuario_id,
        evento_id,
        cantidad: qty,
        estado: "confirmada",
        fechaReserva: new Date(),
      },
      { transaction: t }
    );

    // Registrar histórico
    await HistoricoReserva.create(
      {
        reserva_id: reserva.id,
        fechaCambio: new Date(),
        estadoAnterior: null,
        estadoNuevo: "confirmada",
      },
      { transaction: t }
    );

    // Descontar cupos
    event.cuposDispo -= qty;
    await event.save({ transaction: t });

    await t.commit();

    res.status(201).json({
      message: "Reserva creada exitosamente",
      reserva,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error al crear la reserva",
      error: error.message,
    });
  }
};

// ======================================================
// Obtener reservas del usuario autenticado
// ======================================================
export const getMisReservas = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservas = await Reserva.findAll({
      where: { usuario_id: userId },
      include: [
        {
          model: Event,
          attributes: ["id", "titulo", "fecha", "imagen", "costo"]
        }
      ],
      order: [["fechaReserva", "DESC"]]
    });

    // Agregar total calculado
    const response = reservas.map((res) => ({
      ...res.toJSON(),
      total: res.cantidad * (res.Event?.costo || 0),
    }));

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas" });
  }
};

// ======================================================
// Cancelar reserva
// ======================================================
export const cancelReserva = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id } = req.params;

    const reserva = await Reserva.findByPk(id, { transaction: t });
    if (!reserva) {
      await t.rollback();
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    if (reserva.estado === "cancelada") {
      await t.rollback();
      return res.status(400).json({ message: "La reserva ya está cancelada" });
    }

    const evento = await Event.findByPk(reserva.evento_id, {
      transaction: t,
      lock: t.LOCK.UPDATE,
    });
    if (!evento) {
      await t.rollback();
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    // Registrar en histórico
    await HistoricoReserva.create(
      {
        reserva_id: reserva.id,
        fechaCambio: new Date(),
        estadoAnterior: reserva.estado,
        estadoNuevo: "cancelada",
      },
      { transaction: t }
    );

    // Actualizar estado
    reserva.estado = "cancelada";
    await reserva.save({ transaction: t });

    // Devolver cupos
    const qty = parseInt(reserva.cantidad) || 1;
    evento.cuposDispo += qty;
    await evento.save({ transaction: t });

    await t.commit();

    res.json({
      message: "Reserva cancelada exitosamente",
      reserva,
    });
  } catch (error) {
    await t.rollback();
    res.status(500).json({
      message: "Error al cancelar reserva",
      error: error.message,
    });
  }
};
