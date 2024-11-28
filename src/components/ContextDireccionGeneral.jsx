"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCog, Compass, Globe, BarChart, Briefcase, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const DireccionGeneralArea = ({ Navigate }) => {
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
            Dirección General
          </CardTitle>
          <div className="flex justify-center mb-4">
            <UserCog className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Responsabilidades de la Dirección General</h2>
                <p className="text-gray-700 mb-3">
                  La Dirección General es responsable de la toma de decisiones estratégicas clave para la organización y la supervisión de todas las áreas funcionales. Su objetivo es asegurar el crecimiento y la sostenibilidad a largo plazo de la empresa.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de la Dirección General:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Compass className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Definición de la visión y misión:</strong> Establecer la dirección estratégica de la empresa, asegurando que los objetivos a largo plazo sean claros y alcanzables.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Briefcase className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Supervisión de las operaciones:</strong> Asegurar que todas las áreas de la empresa funcionen de manera eficiente y alineadas con los objetivos estratégicos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Globe className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Relaciones externas:</strong> Gestionar las relaciones con stakeholders clave como accionistas, gobiernos, medios de comunicación y el público en general.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BarChart className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión financiera:</strong> Supervisar la asignación eficiente de los recursos financieros y asegurar la estabilidad económica de la empresa.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ShieldCheck className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de riesgos:</strong> Identificar y mitigar riesgos estratégicos, operativos y financieros que puedan afectar a la empresa.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Liderazgo y Cultura Organizacional</h2>
                <p className="text-gray-700 mb-3">
                  La Dirección General también juega un papel crucial en establecer el tono y la cultura organizacional de la empresa. Esto incluye liderar con el ejemplo y asegurar que los valores de la empresa se reflejen en todas las áreas.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  La Dirección General es vital para guiar a la empresa hacia el éxito a largo plazo. A través de la planificación estratégica, la supervisión de las operaciones y la gestión de relaciones externas e internas, asegura que la empresa se mantenga competitiva en un entorno de negocios en constante cambio.
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

export default DireccionGeneralArea;
