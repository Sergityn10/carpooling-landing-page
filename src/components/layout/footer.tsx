import Link from "next/link";
import { Instagram, Linkedin, Twitter, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  const legalLinks = [
    { href: "#", label: "Términos y Condiciones" },
    { href: "#", label: "Política de Privacidad" },
  ];

  return (
    <footer className="bg-card text-card-foreground">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="font-headline text-xl font-bold">EcoTrips</span>
          </div>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <Button key={link.label} variant="ghost" size="icon" asChild>
                <Link href={link.href} aria-label={link.label}>
                  <link.icon className="h-5 w-5 text-foreground/70 transition-colors hover:text-primary" />
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between border-t border-border pt-6 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} EcoTrips. Todos los derechos reservados.</p>
          <div className="mt-4 flex gap-6 md:mt-0">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
