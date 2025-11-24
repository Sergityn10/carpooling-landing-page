import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PreRegisterForm } from '@/components/pre-register-form';
import { Leaf } from 'lucide-react';
import Image from 'next/image';

export default function PreRegisterPage() {
  const image = PlaceHolderImages.find(img => img.id === 'happy-commuters');

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      <div className="relative grid w-full max-w-4xl grid-cols-1 md:grid-cols-2 overflow-hidden rounded-xl shadow-2xl">
        <div className="bg-background p-8 md:p-12 flex flex-col justify-center">
          <Link href="/" className="mb-8 flex items-center gap-2">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="font-headline text-2xl font-bold text-foreground">
              YouConnext
            </span>
          </Link>
          <Card className="border-0 shadow-none -m-6 md:-m-8">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">¡Sé el primero en saberlo!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Estamos a punto de lanzar. Déjanos tus datos y te avisaremos cuando puedas empezar a compartir coche y ahorrar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PreRegisterForm />
            </CardContent>
          </Card>
        </div>
        <div className="relative hidden md:block">
          {image && (
             <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
           <div className="absolute bottom-8 left-8 text-white">
                <p className="max-w-md text-xl font-medium">"Compartir coche nunca fue tan fácil. Menos tráfico, más ahorro y un planeta más feliz."</p>
                <p className="mt-2 text-sm opacity-80">- Un futuro usuario de EcoTrips</p>
            </div>
        </div>
      </div>
    </div>
  );
}
