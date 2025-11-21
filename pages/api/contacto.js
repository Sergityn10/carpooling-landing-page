import nodemailer from 'nodemailer';

// Dirección de correo a la que quieres recibir el mensaje
const EMAIL_RECEPTOR = 'elempresario2002@gmail.com';

// Configuración del transportador (ejemplo usando Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // Tu dirección de Gmail que usas para enviar (puede ser la misma que la receptora)
    user: EMAIL_RECEPTOR, // ¡Cámbialo!
    // Contraseña de aplicación generada en la configuración de seguridad de Google
    pass: "Rufo2009", // ¡Cámbialo!
  },
});

export default async function handler(req, res) {
  // Solo aceptamos peticiones POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { nombre, email, mensaje } = req.body;

    // 1. Validar que los campos no estén vacíos
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }

    // 2. Definir las opciones del correo
    const mailOptions = {
      from: `"Formulario de Contacto" <${email}>`, // Muestra el email del emisario
      to: EMAIL_RECEPTOR, // La dirección que proporcionaste
      subject: `Nuevo mensaje de ${nombre} (Contacto Web)`, // Asunto
      text: `
        Nombre: ${nombre}
        Email: ${email}
        ---
        Mensaje:
        ${mensaje}
      `,
      html: `
        <h3>Detalles del Emisario:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${nombre}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Cuerpo del Mensaje:</h3>
        <p>${mensaje}</p>
      `,
    };

    // 3. Enviar el correo
    await transporter.sendMail(mailOptions);

    // 4. Respuesta exitosa
    res.status(200).json({ success: true, message: 'Correo enviado con éxito.' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error interno del servidor al enviar el correo.' });
  }
}