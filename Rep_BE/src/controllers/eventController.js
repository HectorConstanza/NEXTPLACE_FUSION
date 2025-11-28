import { Event } from "../models/Event.js";
import { Op } from "sequelize";
import { Reserva } from "../models/Reserva.js";
import { User } from "../models/User.js";

export const createEvent = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      categoria,
      lugar,
      fecha,
      cupos,
      organizador_id,
      costo
    } = req.body;

    if (!titulo || !fecha || !cupos || !organizador_id) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: titulo, fecha, cupos, organizador_id"
      });
    }

    const allowedCategories = ["Tecnología", "Arte y Cultura", "Música"];
    if (categoria && !allowedCategories.includes(categoria)) {
      return res.status(400).json({
        message: "La categoría no es válida. Use: Tecnología, Arte y Cultura o Música"
      });
    }

    if (costo === undefined || costo === null || isNaN(costo)) {
      return res.status(400).json({ message: "El costo es obligatorio y debe ser numérico" });
    }

    const parsedCost = Number(costo);
    if (parsedCost < 0) {
      return res.status(400).json({ message: "El costo no puede ser negativo" });
    }

    // Imagen subida
    const imagenPath = req.file ? `uploads/eventos/${req.file.filename}` : null;

    const event = await Event.create({
      titulo,
      descripcion,
      categoria,
      lugar,
      fecha,
      imagen: imagenPath,
      cupos,
      cuposDispo: cupos,
      organizador_id,
      costo: parsedCost
    });

    res.status(201).json(event);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFilteredEvents = async (req, res) => {
  try {
    const { categoria, fecha, lugar, randomSearch } = req.body;

    const filters = {};

    if (categoria) filters.categoria = categoria;
    if (lugar) filters.lugar = lugar;

    if (fecha) {
      const day = new Date(fecha);

      const start = new Date(day);
      start.setHours(0, 0, 0, 0);

      const end = new Date(day);
      end.setHours(23, 59, 59, 999);

      filters.fecha = { [Op.between]: [start, end] };
    }

    if (randomSearch) {
      filters[Op.or] = [
        { titulo: { [Op.like]: `%${randomSearch}%` } },
        { categoria: { [Op.like]: `%${randomSearch}%` } },
        { lugar: { [Op.like]: `%${randomSearch}%` } }
      ];
    }

    const events = await Event.findAll({ where: filters });

    if (events.length === 0) {
      return res.status(404).json({ message: "No se encontraron eventos" });
    }

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id, {
      attributes: [
        "id",
        "titulo",
        "descripcion",
        "categoria",
        "lugar",
        "fecha",
        "cupos",
        "cuposDispo",
        "costo",
        "imagen",
        "organizador_id"
      ]
    });

    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    res.json(event.toJSON());

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByOrganizer = async (req, res) => {
  try {
    const organizador_id = req.params.organizador_id;

    const events = await Event.findAll({
      where: { organizador_id },
      attributes: [
        "id",
        "titulo",
        "descripcion",
        "categoria",
        "lugar",
        "fecha",
        "cupos",
        "cuposDispo",
        "costo",
        "imagen"
      ]
    });

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================================
// UPDATE EVENT
// =====================================
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({ message: "Evento no encontrado" });
    }

    await event.update(req.body);
    res.json({ message: "Evento actualizado", event });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================================
// CATEGORÍAS
// =====================================
export const getCategories = async (req, res) => {
  try {
    res.json(["Tecnología", "Arte y Cultura", "Música"]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ======================================================
// Obtener asistentes de un evento
// ======================================================
export const getEventAttendees = async (req, res) => {
  try {
    const { id } = req.params;

    const reservas = await Reserva.findAll({
      where: { evento_id: id },
      include: [
        {
          model: User,
          as: "usuario",
          attributes: ["id", "nombre", "correoElectronico"]
        }
      ]
    });
    const data = reservas.map((r) => ({
      id: r.id,
      nombre: r.usuario?.nombre || "Usuario no disponible",
      correoElectronico: r.usuario?.correoElectronico || "---",
      cantidad: r.cantidad,
       estado: r.estado
    }));

    res.json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error obteniendo asistentes" });
  }
};




