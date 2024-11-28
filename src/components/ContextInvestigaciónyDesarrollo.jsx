"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Microscope, Lightbulb, Beaker, Rocket, Atom } from 'lucide-react';
import { useRouter } from 'next/navigation';

const InvestigacionDesarrolloArea = ({ Navigate }) => {
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
            Investigación y Desarrollo (I+D)
          </CardTitle>
          <div className="flex justify-center mb-4">
            <Microscope className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Innovación y Desarrollo de Productos</h2>
                <p className="text-gray-700 mb-3">
                  El área de Investigación y Desarrollo es responsable de la innovación dentro de la empresa. Esto incluye el desarrollo de nuevos productos, la mejora de los existentes y la investigación de nuevas tecnologías y procesos.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de I+D:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Lightbulb className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Investigación de mercado:</strong> Identificación de nuevas oportunidades y tendencias en el mercado para desarrollar productos innovadores.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Beaker className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Desarrollo de productos:</strong> Creación y mejora de productos y servicios, asegurando que satisfagan las necesidades del cliente y mantengan una ventaja competitiva.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Rocket className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Innovación tecnológica:</strong> Implementación de nuevas tecnologías para optimizar procesos y aumentar la eficiencia operativa.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Atom className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Investigación científica:</strong> Exploración de nuevos materiales, fórmulas o métodos para mejorar la calidad y funcionalidad de los productos.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Investigación y Desarrollo es vital para mantener la competitividad en el mercado y liderar la innovación en la industria. I+D impulsa la creación de nuevos productos, mejora los procesos existentes y ayuda a la empresa a adaptarse a los cambios en la tecnología y las necesidades del mercado.
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

export default InvestigacionDesarrolloArea;
