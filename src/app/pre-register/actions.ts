"use server";

import { z } from "zod";

const preRegisterSchema = z.object({
  city: z.string().min(3, "La ciudad debe tener al menos 3 caracteres."),
  email: z.string().email("Por favor, introduce un email válido."),
});

export async function submitPreRegisterForm(prevState: any, formData: FormData) {
  const validatedFields = preRegisterSchema.safeParse({
    city: formData.get("city"),
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Por favor, corrige los errores en el formulario.",
      success: false,
    };
  }

  // Here you would typically save the user to a "pre-registered" list in your database.
  // For this example, we'll just log it and return a success message.
  console.log("Pre-registration submitted:", validatedFields.data);

  return {
    message: "¡Gracias por tu interés! Te notificaremos en cuanto lancemos la aplicación.",
    success: true,
    errors: {},
  };
}
