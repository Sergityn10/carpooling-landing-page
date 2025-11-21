"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
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
  }`  `

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it and return a success message.
  console.log("Contact form submitted:", validatedFields.data);

  return {
    message: "¡Gracias por tu consulta! Nos pondremos en contacto contigo pronto.",
    success: true,
    errors: {},
  };
}
