"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, BarChart, TrendingUp, PieChart, Briefcase } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FinanzasArea = ({ Navigate }) => {
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
            Finanzas
          </CardTitle>
          <div className="flex justify-center mb-4">
            <DollarSign className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Gestión Financiera</h2>
                <p className="text-gray-700 mb-3">
                  El área de Finanzas se encarga de la administración de los recursos financieros de la empresa, asegurando la viabilidad económica y el crecimiento sostenible. Sus responsabilidades incluyen la planificación financiera, la gestión de inversiones y el control de los costos.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de Finanzas:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <BarChart className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Presupuestos y planificación:</strong> Elaboración y seguimiento del presupuesto anual y planificación financiera a largo plazo.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de inversiones:</strong> Optimización del uso de capital, asegurando el retorno de la inversión y el crecimiento de los activos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <PieChart className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Análisis financiero:</strong> Evaluación del desempeño financiero, incluyendo análisis de costos, rentabilidad y liquidez.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Briefcase className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Control de riesgos:</strong> Identificación y gestión de riesgos financieros para proteger los activos de la empresa.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Finanzas es crítica para asegurar la estabilidad y el éxito a largo plazo de la empresa. Una buena gestión financiera permite tomar decisiones estratégicas informadas, mantener la competitividad y garantizar el uso eficiente de los recursos.
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

export default FinanzasArea;
