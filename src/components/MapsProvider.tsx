"use client";

import React, { ReactNode } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

// --- 1. Definición de Tipos ---

// Tipado para las propiedades del componente (solo necesita children)
interface MapsProviderProps {
  children: ReactNode;
  // Opcional: puedes añadir más props como libraries, language, etc., si las necesitas globales
  libraries?: string[]; 
}

// Las opciones de configuración del API Key (deben ser constantes)
// Asegúrate de definir NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en tu archivo .env.local
const API_KEY: string | undefined = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

// --- 2. Función de Renderizado ---

// Esta función se pasa al Wrapper para mostrar el estado de carga o error.
const renderStatus = (status: Status) => {
  if (status === Status.LOADING) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        Cargando Mapa... (Status: {status})
      </div>
    );
  }
  if (status === Status.FAILURE) {
    // Es vital manejar el caso de fallo, especialmente si la API Key es incorrecta
    return (
      <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
        ⚠️ Error al cargar la API de Google Maps. Verifica tu clave.
      </div>
    );
  }
  return null;
};

// --- 3. Componente Provider Principal ---

export function MapsProvider({ children, libraries = [] }: MapsProviderProps) {
  
  if (!API_KEY) {
    // Es buena práctica avisar si la clave no está configurada
    console.error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY no está definida en el entorno.");
    return <div>Error de Configuración: Falta la API Key de Google Maps.</div>;
  }
    
  return (
    <Wrapper 
      apiKey={API_KEY} 
      render={renderStatus}
      libraries={libraries} // Permite cargar librerías como 'places' globalmente
      // Otras opciones: version="beta", language="es", region="ES"
    >
      {children}
    </Wrapper>
  );
}