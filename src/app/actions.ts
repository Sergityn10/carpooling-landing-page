"use server";


import nodemailer from 'nodemailer';
import { z } from 'zod';
import { ZodError } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

// export async function submitContactForm(prevState: any, formData: FormData) {


//   // Here you would typically send an email, save to a database, etc.
//   // For this example, we'll just log it and return a success message.
//   console.log("Contact form submitted:", validatedFields.data);

//   return {
//     message: "¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.",
//     success: true,
//     errors: {},
//   };
// }


// Esquemna de Zod para validar (debe coincidir con el del cliente)

// --- CONFIGURACIÓN DE NODEMAILER ---
// **IMPORTANTE:** Usa variables de entorno (Environment Variables) para la seguridad.
// Crea un archivo .env.local y añade:
// EMAIL_USER="tu_correo_de_envio@gmail.com"
// EMAIL_PASS="tu_contraseña_de_aplicacion" // Contraseña de aplicación de Google
const EMAIL_RECEPTOR = 'elempresario2002@gmail.com';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_USER,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
  },
});

// --- TIPO DE RESPUESTA ---
// Define el tipo de dato que el Server Action devolverá a useActionState
const initialState = {
  message: "",
  errors: {},
  success: false,
};

// --- EL SERVER ACTION PRINCIPAL ---
export async function submitContactForm(prevState, formData) {
  const validatedFields = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores en el formulario.",
      success: false,
    };
  }

  try {
    // Validar los datos con Zod
    const { name, email, message } = validatedFields.data;

    // 2. ENVIAR CORREO CON NODEMAILER
    const mailOptions = {
      from: `"Contacto Web" <${email}>`,
      to: EMAIL_RECEPTOR,
      subject: `Nuevo mensaje de ${name} (Contacto Web)`,
      html: `
        <h3>Detalles del Emisario:</h3>
        <ul>
          <li><strong>Nombre:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
        </ul>
        <h3>Cuerpo del Mensaje:</h3>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // 3. RESPUESTA DE ÉXITO
    return {
      success: true,
      message: "Tu mensaje ha sido enviado correctamente.",
      errors: {},
    };

  } catch (error) {
    // 4. MANEJO DE ERRORES
    if (error instanceof ZodError) {
      // Errores de validación de Zod
      const errors = error.flatten().fieldErrors;
      return {
        success: false,
        message: "Por favor, corrige los errores en el formulario.",
        errors: errors,
      };
    }

    console.error("Error al enviar el correo:", error);
    
    // Error de envío de Nodemailer o error interno
    return {
      success: false,
      message: "Error interno del servidor. No se pudo enviar el correo.",
      errors: {},
    };
  }
}