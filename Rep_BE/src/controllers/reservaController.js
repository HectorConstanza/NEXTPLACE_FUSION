import { Reserva } from "../models/Reserva.js";
import { Event } from "../models/Event.js";
import { User } from "../models/User.js";
import { HistoricoReserva } from "../models/HistoricoReserva.js";

export const createReserva = async (req, res) => {
  try {
    const { usuario_id, evento_id } = req.body;

 
    const user = await User.findByPk(usuario_id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    
    const event = await Event.findByPk(evento_id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    if (event.cuposDispo <= 0) {
      return res.status(400).json({ message: "No hay cupos disponibles" });
    }


    const reserva = await Reserva.create({
      usuario_id,
      evento_id,
      estado: "confirmada",
      fechaReserva: new Date()
    });

   
    event.cuposDispo = event.cuposDispo - 1;
    await event.save();

    res.status(201).json({
      message: "Reserva creada exitosamente",
      reserva
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear la reserva",
      error: error.message
    });
  }
};

export const cancelReserva = async (req, res) => {
  try {
    const { id } = req.params;

  
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

  
    if (reserva.estado === "cancelada") {
      return res.status(400).json({ message: "La reserva ya está cancelada" });
    }

    const evento = await Event.findByPk(reserva.evento_id);
    if (!evento) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    await HistoricoReserva.create({
      reserva_id: reserva.id,
      estadoAnterior: reserva.estado,
      estadoNuevo: "cancelada"
    });

    reserva.estado = "cancelada";
    await reserva.save();

    
    evento.cuposDispo = evento.cuposDispo + 1;
    await evento.save();

    res.json({
      message: "Reserva cancelada exitosamente",
      reserva
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al cancelar reserva",
      error: error.message
    });
  }
};
