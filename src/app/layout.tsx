
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { MapsProvider } from '@/components/MapsProvider';

export const metadata: Metadata = {
  title: 'EcoTrips - Carpooling Diario y Ecológico',
  description: 'Ahorra en combustible y estrés compartiendo tus trayectos fijos con nuestra comunidad.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (


    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
    <MapsProvider libraries={["places"]}>

        {children}

        <Toaster />
    </MapsProvider>

      </body>
    </html>
  );
}
