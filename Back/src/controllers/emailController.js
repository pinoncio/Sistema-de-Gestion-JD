/*
const sgMail = require("@sendgrid/mail");

// Agrega tu API Key de SendGrid (mejor usar variables de entorno)
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  const msg = {
    to: "diegopino886@gmail.com", // Correo de la empresa (fijo)
    from: "noreply@tuempresa.com", // Debe estar verificado en SendGrid
    replyTo: email, // Para que al responder, vaya al usuario
    subject: "Nuevo mensaje de contacto",
    html: `
      <h3>Información del contacto</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Correo Electrónico:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return res.status(200).json({ message: "Correo enviado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al enviar el correo" });
  }
};

module.exports = { sendEmail };
*/
