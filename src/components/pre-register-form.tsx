"use client";
import { createClient } from '@libsql/client';
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState, useRef, useActionState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wrapper } from "@googlemaps/react-wrapper";

import { submitPreRegisterForm } from "@/app/pre-register/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, MapPin, Mail } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const preRegisterSchema = z.object({
  city: z.string().min(3, "La ciudad es requerida."),
  email: z.string().email("Email inválido."),
});

function AutocompleteInput({
  field,
  setFormValue,
}: {
  field: any;
  setFormValue: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (inputRef.current && !autocomplete) {
      const newAutocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["(cities)"],
          fields: ["address_components"],
        }
      );
      setAutocomplete(newAutocomplete);

      newAutocomplete.addListener("place_changed", () => {
        const place = newAutocomplete.getPlace();
        const cityComponent = place.address_components?.find(
          (component) =>
            component.types.includes("locality") ||
            component.types.includes("administrative_area_level_3")
        );
        if (cityComponent) {
          setFormValue(cityComponent.long_name);
        }
      });
    }
  }, [autocomplete, setFormValue]);

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input placeholder="Tu ciudad principal de viaje" {...field} ref={inputRef} className="pl-10" />
    </div>
  );
}


function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full" size="lg">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Notificarme
        </>
      )}
    </Button>
  );
}

export function PreRegisterForm() {
  const [state, formAction] = useActionState(submitPreRegisterForm, {
    message: "",
    errors: {},
    success: false,
  });
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null);
  }, []);

  const form = useForm<z.infer<typeof preRegisterSchema>>({
    resolver: zodResolver(preRegisterSchema),
    defaultValues: {
      city: "",
      email: "",
    },
  });

  useEffect(() => {
    if (state.success) {

      async function insertInTable(){

        const db = await createClient({
          url: process.env.NEXT_PUBLIC_DB_URL,
          authToken: process.env.NEXT_PUBLIC_DB_TOKEN,
      });
      
      let result = await db.execute({
        sql:"SELECT email FROM pre_register WHERE email = ?", 
        args:[form.getValues().email]
      });

      if(result.rows.length > 0){
        toast({
          variant: "destructive",
          title: "Error en el formulario",
          description: "El email ya está registrado",
        });
        return;
      }
      let insert = await db.execute("INSERT INTO pre_register (city, email) VALUES (?, ?)", [form.getValues().city, form.getValues().email]);
        toast({
          title: "¡Todo listo!",
          description: state.message,
        });
  
        form.reset();

      }
      insertInTable();
    } else if (state.message && Object.keys(state.errors ?? {}).length > 0) {
      toast({
        variant: "destructive",
        title: "Error en el formulario",
        description: state.message,
      });
    }
  }, [state, toast, form]);

  return (
    <Form {...form}>
       <form action={formAction} className="space-y-6">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  {apiKey ? (
                      <AutocompleteInput
                        field={field}
                        setFormValue={(value) => form.setValue("city", value, { shouldValidate: true })}
                      />

                  ) : (
                     <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input placeholder="Tu ciudad principal de viaje" {...field} className="pl-10"/>
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input type="email" placeholder="Tu correo electrónico" {...field} className="pl-10"/>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        
        <SubmitButton />
      </form>
    </Form>
  );
}
