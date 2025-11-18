"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { submitContactForm } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "El nombre es requerido."),
  email: z.string().email("Email inválido."),
  message: z.string().min(1, "El mensaje es requerido."),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Enviar Consulta
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, {
    message: "",
    errors: {},
    success: false,
  });
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "¡Éxito!",
        description: state.message,
      });
      form.reset();
    } else if (state.message && Object.keys(state.errors ?? {}).length > 0) {
      toast({
        variant: "destructive",
        title: "Error en el formulario",
        description: state.message,
      });
    }
  }, [state, toast, form]);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <Input
          id="name"
          name="name"
          placeholder="Nombre"
          aria-label="Nombre"
          onChange={form.handleChange}
          value={form.watch("name")}
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>
      <div>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          aria-label="Email"
          onChange={form.handleChange}
          value={form.watch("email")}
        />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-destructive">{state.errors.email[0]}</p>
        )}
      </div>
      <div>
        <Textarea
          id="message"
          name="message"
          placeholder="Mensaje"
          aria-label="Mensaje"
          rows={5}
          onChange={form.handleChange}
          value={form.watch("message")}
        />
        {state.errors?.message && (
          <p className="mt-1 text-sm text-destructive">{state.errors.message[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
