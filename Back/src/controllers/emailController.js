// emailController.js
const { Resend } = require("resend");

const resend = new Resend("re_YYcCSXNE_N6ScT3SF2yA5z8DHWDEPJvaR");

const sendEmail = async (req, res) => {
  const { name, phone, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "diegopino886@gmail.com",
      subject: `Nuevo mensaje del cliente ${name}`,
      html: `
        <h3>Información del Cliente</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
        <p><strong>Correo Electrónico:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ message: "Correo enviado correctamente", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
};

module.exports = { sendEmail };
