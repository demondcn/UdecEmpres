"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, UserPlus, UserCheck, UserCog, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RecursosHumanosArea = ({ Navigate }) => {
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
            Recursos Humanos
          </CardTitle>
          <div className="flex justify-center mb-4">
            <Users className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Gestión del Capital Humano</h2>
                <p className="text-gray-700 mb-3">
                  El área de Recursos Humanos es responsable de atraer, desarrollar y retener el talento en la organización. Su función es clave para asegurar que la empresa cuente con los recursos humanos necesarios para cumplir con sus objetivos estratégicos.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de Recursos Humanos:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <UserPlus className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Reclutamiento y selección:</strong> Identificación y contratación de candidatos con el perfil adecuado para los diferentes puestos en la empresa.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <UserCheck className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Desarrollo y capacitación:</strong> Implementación de programas de formación y desarrollo para mejorar las habilidades y competencias del personal.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <UserCog className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión del desempeño:</strong> Evaluación del rendimiento de los empleados y establecimiento de planes de mejora continua.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <FileText className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Políticas y cumplimiento:</strong> Asegurar que la empresa cumpla con las normativas laborales y mantener un ambiente de trabajo seguro y saludable.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Recursos Humanos juega un papel fundamental en el desarrollo de una cultura organizacional positiva y en el fortalecimiento del compromiso de los empleados. A través de la gestión efectiva del talento, Recursos Humanos contribuye al éxito general de la empresa.
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

export default RecursosHumanosArea;
