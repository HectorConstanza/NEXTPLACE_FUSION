import { sequelize } from "../config/db.js";


import { User } from "./User.js";
import { Event } from "./Event.js";
import { Reserva } from "./Reserva.js";
import { Organizer } from "./Organizer.js";
import { UserTokenR } from "./UserTokenR.js";
import { OrgTokenR } from "./OrgTokenR.js";
import { HistoricoReserva } from "./HistoricoReserva.js";

import "./associations.js";

export {
  sequelize,
  User,
  Event,
  Reserva,
  Organizer,
  UserTokenR,
  OrgTokenR,
  HistoricoReserva
};
