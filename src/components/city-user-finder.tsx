"use client";

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wrapper } from "@googlemaps/react-wrapper";
import {
  findUsersInCity,
  type FindUsersInCityOutput,
} from "@/ai/flows/find-users-in-city";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Users, Search } from "lucide-react";

const formSchema = z.object({
  city: z.string().min(3, { message: "Debe tener al menos 3 caracteres." }),
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

  return <Input placeholder="Ej: Barcelona" {...field} ref={inputRef} />;
}

export function CityUserFinder() {
  const [result, setResult] = useState<FindUsersInCityOutput | null>(null);
  const [searchedCity, setSearchedCity] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);

  useEffect(() => {
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || null);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setSearchedCity(values.city);
    try {
      const response = await findUsersInCity(values);
      setResult(response);
    } catch (e) {
      setError("No se pudo realizar la búsqueda. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const renderForm = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tu Ciudad</FormLabel>
              <FormControl>
                {apiKey ? (
                  <Wrapper apiKey={apiKey} libraries={["places"]}>
                    <AutocompleteInput
                      field={field}
                      setFormValue={(value) => form.setValue("city", value)}
                    />
                  </Wrapper>
                ) : (
                  <Input placeholder="Ej: Barcelona" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Buscando...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Buscar Usuarios
            </>
          )}
        </Button>
      </form>
    </Form>
  );

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <CardTitle className="font-headline text-3xl">Encuentra tu Comunidad</CardTitle>
        </div>
        <CardDescription>
          Introduce tu ciudad y descubre cuántos usuarios están listos para compartir coche cerca de ti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {renderForm()}

        {error && <p className="mt-6 text-center text-destructive">{error}</p>}

        {result && (
          <Card className="mt-8 bg-background/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-muted-foreground">En <span className="font-bold text-primary">{searchedCity}</span>, ya hay</p>
                <p className="font-headline text-6xl font-bold text-primary my-2">{result.userCount}</p>
                <p className="text-muted-foreground">personas con las que puedes compartir tus viajes.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
