// emailController.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'diegopino886@gmail.com', 
    pass: 'cpqg vrmr zlee xqfz' 
  }
});


const sendEmail = async (req, res) => {
  const { name, phone, email, message } = req.body;


  const mailOptions = {
    from: 'tu-correo@gmail.com', 
    to: 'diegopino886@gmail.com',
    subject: `Nuevo mensaje del cliente ${name}`, 
    html: `
      <h3>Información del Cliente</h3>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Correo Electrónico:</strong> ${email}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    ` 
  };

  try {

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};

module.exports = { sendEmail };
