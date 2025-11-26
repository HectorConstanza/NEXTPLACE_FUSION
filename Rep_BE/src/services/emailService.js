import nodemailer from "nodemailer";

const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const secure = (process.env.EMAIL_SECURE === "true"); // true => TLS on port 465
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !port || !user || !pass) {
    console.warn("Email not fully configured (EMAIL_HOST/EMAIL_PORT/EMAIL_USER/EMAIL_PASS)");
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

// Verify transporter at startup to get early feedback
transporter.verify()
  .then(() => console.log("Email transporter ready"))
  .catch((err) => console.warn("Email transporter verify failed:", err.message || err));

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"NextPlace" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Correo enviado:", info.messageId);
    // opcional: si usas Ethereal, info.preview URL estará en info
    if (info?.messageId) return info;
    return true;
  } catch (error) {
    console.error("Error enviando correo:", error.message || error);
    throw error;
  }
};