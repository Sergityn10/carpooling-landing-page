import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnimatedCounter } from "@/components/animated-counter";
import { CityUserFinder } from "@/components/city-user-finder";
import { ContactForm } from "@/components/contact-form";
import { Car, CheckCircle, Leaf, PiggyBank, Smile, Sparkles, Users, Award } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === "hero-mockup");

  const driverBenefits = [
    {
      icon: PiggyBank,
      title: "Ahorro Genuino",
      description: "Cubre hasta el 80% del costo de tu combustible.",
    },
    {
      icon: Award,
      title: "Certificación de Ahorro",
      description: "Obtén Certificados de Ahorro Energético y CO2 para tu empresa o universidad.",
    },
    {
      icon: Users,
      title: "Comunidad Segura",
      description: "Filtra y elige a quién llevas en tus trayectos habituales.",
    },
    {
      icon: Sparkles,
      title: "Rutas Inteligentes",
      description: "Nuestro algoritmo optimiza tu ruta para que ahorres tiempo y combustible.",
    },
  ];

  const passengerBenefits = [
    {
      icon: Smile,
      title: "Cero Estrés",
      description: "Olvídate del autobús lleno y los retrasos del transporte público.",
    },
    {
      icon: CheckCircle,
      title: "Comodidad Garantizada",
      description: "Viaja sentado, con espacio y buena compañía.",
    },
    {
      icon: Car,
      title: "Puntualidad y Flexibilidad",
      description: "Una forma alternativa, eficiente y puntual para moverte.",
    },
     {
      icon: Leaf,
      title: "Eco-Puntos Canjeables",
      description: "Cada viaje compartido te da puntos para canjear por recompensas ecológicas.",
    },
  ];

  const socialProofStats = [
      { value: 5000, label: "Usuarios Registrados", prefix: "+", suffix:"" },
      { value: 5000, label: "Kilómetros Compartidos", prefix: "+", suffix:" km" },
      { value: 50, label: "Toneladas de CO2 Ahorradas", prefix: "-", suffix:" t" },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background pt-24 pb-12 md:pt-32 md:pb-20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10"></div>
            <div className="container mx-auto px-4 md:px-6 relative">
            <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="space-y-6 text-center md:text-left">
                <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Ahorra hasta <span className="text-primary">80%</span> de tu gasolina en tu ruta diaria.
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                    Ahorra en combustible y estrés compartiendo tus trayectos fijos con nuestra comunidad. Conecta, ahorra y muévete de forma ecológica. Cada día.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
                    <Button size="lg" asChild>
                        <a href="#download">Empieza a Ahorrar Hoy</a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <a href="#how-it-works">Cómo Funciona</a>
                    </Button>
                </div>
                </div>
                <div className="relative mx-auto max-w-xs md:max-w-sm">
                {heroImage && (
                    <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    width={400}
                    height={800}
                    priority
                    className="rounded-3xl shadow-2xl"
                    data-ai-hint={heroImage.imageHint}
                    />
                )}
                </div>
            </div>
            </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mb-16 text-center">
              <h2 className="font-headline text-3xl font-bold md:text-4xl">El Doble Beneficio: Gana como Conductor, Viaja Mejor como Pasajero.</h2>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Tu impacto: Más dinero, menos CO2, cero molestias.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-3 text-2xl">
                    <Car className="h-8 w-8 text-primary"/>
                    Conduce con Propósito: Beneficios que Te Mueven
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {driverBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <benefit.icon className="mt-1 h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-bold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                 <CardHeader>
                  <CardTitle className="font-headline flex items-center gap-3 text-2xl">
                    <Users className="h-8 w-8 text-primary"/>
                    Pasajero Cero Estrés: Di Adiós al Transporte Público
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {passengerBenefits.map((benefit) => (
                    <div key={benefit.title} className="flex items-start gap-4">
                       <div className="flex-shrink-0">
                        <benefit.icon className="mt-1 h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h4 className="font-bold">{benefit.title}</h4>
                        <p className="text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="bg-primary/5 py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                 <div className="mb-12 text-center">
                    <h2 className="font-headline text-3xl font-bold md:text-4xl">La Comunidad que ya está Ahorrando: Nuestros Impactos</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Miles de trayectos que avalan nuestro ahorro colectivo y compromiso con el planeta.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
                    {socialProofStats.map((stat) => (
                        <div key={stat.label} className="flex flex-col items-center">
                            <AnimatedCounter 
                                targetValue={stat.value} 
                                prefix={stat.prefix}
                                suffix={stat.suffix}
                                className="font-headline text-5xl font-bold text-primary"
                            />
                            <p className="mt-2 text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* How it works / AI tool Section */}
        <section id="how-it-works" className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <CityUserFinder />
          </div>
        </section>
        
        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28 bg-card">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 md:grid-cols-2 items-center">
                    <div className="space-y-4">
                        <h2 className="font-headline text-3xl font-bold md:text-4xl">¿Tienes Preguntas? Hablemos.</h2>
                        <p className="text-lg text-muted-foreground">
                            Nuestro equipo está listo para responder tus dudas. Rellena el formulario y te contactaremos lo antes posible.
                        </p>
                    </div>
                    <Card className="p-6 md:p-8">
                        <ContactForm />
                    </Card>
                </div>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
