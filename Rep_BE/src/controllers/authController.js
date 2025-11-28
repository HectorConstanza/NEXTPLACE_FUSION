import crypto from "crypto";
import bcrypt from "bcrypt";
import { User, UserTokenR } from "../models/index.js";
import { sendEmail } from "../services/emailService.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "El correo es requerido." });

    const user = await User.findOne({
      where: { correoElectronico: email },
    });

    if (!user) {
      return res.json({
        message:
          "Si el correo existe, recibirás un enlace para restablecer la contraseña.",
      });
    }

    const rawToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await UserTokenR.create({
      usuario_id: user.id,
      token: hashedToken,
      fechaV: expiresAt,
    });

    const frontUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const resetLink = `${frontUrl}/reset-password?token=${rawToken}&id=${user.id}`;

    const html = `
      <h2>Hola ${user.nombre} 💗</h2>
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Haz clic en el siguiente botón (válido por 1 hora):</p>
      
      <a href="${resetLink}"
         style="display:inline-block;
                padding:12px 20px;
                background:#FFB3DB;
                color:black;
                font-weight:600;
                border-radius:8px;
                text-decoration:none;">
        Restablecer contraseña
      </a>

      <p style="margin-top:20px;color:#888;font-size:14px;">
        Si no solicitaste esto, puedes ignorar este mensaje 💗
      </p>
    `;

    await sendEmail({
      to: user.correoElectronico,
      subject: "Recuperar contraseña - NextPlace",
      html,
    });

    return res.json({
      message:
        "Si el correo existe, recibirás un enlace para restablecer la contraseña.",
    });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { userId, token, newPassword } = req.body;

    if (!userId || !token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Todos los datos son obligatorios." });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const tokenRow = await UserTokenR.findOne({
      where: {
        usuario_id: userId,
        token: hashedToken,
      },
    });

    if (!tokenRow)
      return res.status(400).json({
        message: "El enlace no es válido o ya fue utilizado.",
      });

    // Token expirado
    if (new Date(tokenRow.fechaV) < new Date()) {
      await UserTokenR.destroy({ where: { id: tokenRow.id } });
      return res.status(400).json({ message: "El enlace ha expirado." });
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar usuario
    await User.update(
      { contrasena: hashedPassword },
      { where: { id: userId } }
    );

    // Borrar token para evitar uso doble
    await UserTokenR.destroy({ where: { id: tokenRow.id } });

    return res.json({
      message: "Contraseña restablecida correctamente 💗 Ya puedes iniciar sesión.",
    });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
