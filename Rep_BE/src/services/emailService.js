import nodemailer from "nodemailer";

// ⭐ Crea el transporter usando tus variables de entorno
const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = process.env.EMAIL_SECURE === "true"; // true si usas 465
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("⚠️ Falta configuración de email. Revisa tus variables .env");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

const transporter = createTransporter();

// ⭐ Verificar el transporter al iniciar el servidor
transporter
  .verify()
  .then(() => console.log("📧 Email transporter listo para enviar correos"))
  .catch((err) =>
    console.warn("❌ Falló verificación del transporter:", err.message)
  );

// ⭐ Función para enviar emails
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"NextPlace" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("📨 Correo enviado:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error enviando correo:", error.message);
    throw error;
  }
};
