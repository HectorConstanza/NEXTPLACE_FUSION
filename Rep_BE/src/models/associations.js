import { User } from "./User.js";
import { Organizer } from "./Organizer.js";
import { Event } from "./Event.js";
import { UserTokenR } from "./UserTokenR.js";
import { OrgTokenR } from "./OrgTokenR.js";
import { Reserva } from "./Reserva.js";
import { HistoricoReserva } from "./HistoricoReserva.js";

Organizer.hasMany(Event, { foreignKey: "organizador_id" });
Event.belongsTo(Organizer, { foreignKey: "organizador_id" });

User.hasMany(Reserva, { foreignKey: "usuario_id" });
Reserva.belongsTo(User, { foreignKey: "usuario_id" });

Event.hasMany(Reserva, { foreignKey: "evento_id" });
Reserva.belongsTo(Event, { foreignKey: "evento_id" });

Reserva.hasMany(HistoricoReserva, { foreignKey: "reserva_id" });
HistoricoReserva.belongsTo(Reserva, { foreignKey: "reserva_id" });

User.hasMany(UserTokenR, { foreignKey: "usuario_id", as: "tokens" });
UserTokenR.belongsTo(User, { foreignKey: "usuario_id" });

Organizer.hasMany(OrgTokenR, { foreignKey: "organizador_id", as: "tokens" });
OrgTokenR.belongsTo(Organizer, { foreignKey: "organizador_id" });

User.hasMany(Reserva, { foreignKey: "usuario_id", as: "usuario" });
Reserva.belongsTo(User, { foreignKey: "usuario_id", as: "usuario" });
