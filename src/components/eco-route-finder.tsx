"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  suggestEnvironmentallyFriendlyRoutes,
  type SuggestEnvironmentallyFriendlyRoutesOutput,
} from "@/ai/flows/suggest-environmentally-friendly-routes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Route, Sparkles, Wind } from "lucide-react";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  startLocation: z.string().min(3, { message: "Debe tener al menos 3 caracteres." }),
  endLocation: z.string().min(3, { message: "Debe tener al menos 3 caracteres." }),
  currentTrafficConditions: z.string().min(5, { message: "Describe brevemente el tráfico." }),
});

export function EcoRouteFinder() {
  const [result, setResult] = useState<SuggestEnvironmentallyFriendlyRoutesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: "",
      endLocation: "",
      currentTrafficConditions: "Tráfico moderado",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await suggestEnvironmentallyFriendlyRoutes(values);
      setResult(response);
    } catch (e) {
      setError("No se pudo obtener la sugerencia. Inténtalo de nuevo.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary"/>
            <CardTitle className="font-headline text-3xl">Encuentra tu Ruta Eco-Inteligente</CardTitle>
        </div>
        <CardDescription>
          Usa nuestra IA para descubrir rutas que ahorran combustible y reducen tu huella de carbono.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Punto de Partida</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Av. Principal 123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="endLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Punto de Destino</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej: Zona Industrial, Edificio B" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="currentTrafficConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condiciones del Tráfico Actual</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ej: Tráfico denso en el centro, fluido en la autopista" {...field} />
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
                  <Sparkles className="mr-2 h-4 w-4" />
                  Sugerir Ruta Ecológica
                </>
              )}
            </Button>
          </form>
        </Form>

        {error && <p className="mt-4 text-center text-destructive">{error}</p>}

        {result && (
          <Card className="mt-8 bg-background/50">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Tu Ruta Ecológica Sugerida</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-bold font-headline flex items-center gap-2"><Route className="text-primary"/> Ruta Sugerida</h3>
                <p className="text-muted-foreground">{result.suggestedRoute}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold font-headline flex items-center gap-2"><Wind className="text-accent-foreground"/> Reducción de Emisiones Estimada</h3>
                <p className="text-muted-foreground">{result.estimatedEmissionsReduction}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-bold font-headline flex items-center gap-2"><Sparkles className="text-primary"/> Consejos Adicionales</h3>
                <p className="text-muted-foreground">{result.additionalTips}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
