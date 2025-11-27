import { Event } from "../models/Event.js";
import { sendEmail } from "../services/emailService.js";
import { Op, Sequelize } from "sequelize";   // 

export const createEvent = async (req, res) => {
  try {
    const {
      titulo,
      descripcion,
      categoria,
      lugar,
      fecha,
      cupos,
      organizador_id
    } = req.body;

    if (!titulo || !fecha || !cupos || !organizador_id) {
      return res.status(400).json({
        message: "Faltan campos obligatorios: titulo, fecha, cupos, organizador_id"
      });
    }

    const event = await Event.create({
      titulo,
      descripcion,
      categoria,
      lugar,
      fecha,
      cupos,
      cuposDispo: cupos, 
      organizador_id
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

    if (events.length === 0)
      return res.status(404).json({ message: "No se encontraron eventos" });

    res.json(events);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) return res.status(404).json({ message: "Evento no encontrado" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEventsByOrganizer = async (req, res) => {
  try {
    const organizador_id = req.params.organizador_id;
    
    const events = await Event.findAll({ 
      where: { organizador_id } 
    });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

/* 🟣 NUEVO: OBTENER CATEGORÍAS SIN REPETIR */
export const getCategories = async (req, res) => {
  try {
    const categories = await Event.findAll({
      attributes: [
        [Sequelize.fn("DISTINCT", Sequelize.col("categoria")), "categoria"]
      ]
    });

    const clean = categories
      .map(c => c.dataValues.categoria)
      .filter(c => c && c.trim() !== "");

    res.json(clean);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
