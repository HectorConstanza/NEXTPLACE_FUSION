import crypto from "crypto";
import bcrypt from "bcrypt";
import { User, UserTokenR } from "../models/index.js";
import { sendEmail } from "../services/emailService.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email requerido" });

    const user = await User.findOne({ where: { correoElectronico: email } });
    if (!user) {
      // No revelar si existe o no
      return res.json({ message: "Si el email existe, se envió un enlace para restablecer la contraseña." });
    }

    // Generar token (raw) y almacenar su hash
    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await UserTokenR.create({
      usuario_id: user.id,
      token: hashedToken,
      fechaV: expiresAt
    });

    const frontUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontUrl}/reset-password?token=${rawToken}&id=${user.id}`;

    const html = `
      <p>Hola ${user.nombre},</p>
      <p>Haz click en el siguiente enlace para restablecer tu contraseña (válido 1 hora):</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Si no solicitaste esto, ignora este mensaje.</p>`;

    try {
      await sendEmail({ to: user.correoElectronico, subject: "Recuperar contraseña - NextPlace", html });
    } catch (e) {
      console.error("Error enviando email de recuperación:", e.message);
    }

    return res.json({ message: "Si el email existe, se envió un enlace para restablecer la contraseña." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId, token, newPassword } = req.body;
    if (!userId || !token || !newPassword) return res.status(400).json({ message: "Datos incompletos" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const tokenRow = await UserTokenR.findOne({ where: { usuario_id: userId, token: hashedToken } });
    if (!tokenRow) return res.status(400).json({ message: "Token inválido o ya usado" });

    if (tokenRow.fechaV && new Date(tokenRow.fechaV) < new Date()) {
      await UserTokenR.destroy({ where: { id: tokenRow.id } });
      return res.status(400).json({ message: "Token expirado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update({ contrasena: hashedPassword }, { where: { id: userId } });

    // Eliminar token usado
    await UserTokenR.destroy({ where: { id: tokenRow.id } });

    return res.json({ message: "Contraseña restablecida correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno" });
  }
};
