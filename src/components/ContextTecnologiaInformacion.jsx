"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Server, Shield, Cloud, Code, Monitor } from 'lucide-react';
import { useRouter } from 'next/navigation';

const TecnologiaInformacionArea = ({ Navigate }) => {
  const router = useRouter();
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <div 
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-[#2C5234] mb-2">
            Tecnología de la Información (TI)
          </CardTitle>
          <div className="flex justify-center mb-4">
            <Server className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Gestión de la Infraestructura Tecnológica</h2>
                <p className="text-gray-700 mb-3">
                  El área de Tecnología de la Información (TI) es responsable de la gestión y mantenimiento de los sistemas tecnológicos de la empresa. TI asegura que todos los sistemas de información funcionen de manera eficiente y que la empresa esté protegida contra amenazas cibernéticas.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de TI:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Shield className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Seguridad informática:</strong> Protección de los sistemas y datos contra ataques y accesos no autorizados.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Cloud className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de la nube:</strong> Administración de servicios en la nube para garantizar la disponibilidad y escalabilidad de las aplicaciones.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Code className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Desarrollo de software:</strong> Creación y mantenimiento de aplicaciones personalizadas para optimizar los procesos de negocio.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Monitor className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Soporte técnico:</strong> Asistencia a los empleados en la resolución de problemas tecnológicos y mantenimiento de la infraestructura de TI.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Tecnología de la Información es fundamental para la operación diaria de la empresa y para mantener su competitividad. Una buena gestión de TI permite a la empresa operar de manera eficiente, aprovechar nuevas tecnologías y proteger sus activos digitales.
                </p>
              </section>
            </div>
          </ScrollArea>
          <Button 
            className="w-full mt-6 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg p-6"
            onClick={() => router.back()}
            style={{
              background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
          >
            Regresar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TecnologiaInformacionArea;
