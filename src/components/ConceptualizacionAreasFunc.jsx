"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  UserCog,
  PiggyBank,
  Users,
  Factory,
  Laptop,
  Microscope
} from 'lucide-react';

const ConceptualizacionAreasFunc = ({Navigate}) => {
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

  const areas = [
    { title: "Ventas y Marketing", description: "Responsable de la promoción y venta de los productos o servicios de la empresa, así como del desarrollo y ejecución de estrategias de marketing, publicidad y relaciones públicas.", icon: ShoppingCart },
    { title: "Dirección general", description: "Encargada de la toma de decisiones estratégicas y la supervisión de todas las áreas funcionales.", icon: UserCog },
    { title: "Finanzas", description: "Responsable de la gestión y control de los recursos económicos, incluyendo la contabilidad, el tesorería, la inversión y la planificación financiera.", icon: PiggyBank },
    { title: "Recursos humanos", description: "Encargada de reclutar, seleccionar, contratar y gestionar al personal de la empresa, además de la gestión de nóminas y beneficios, capacitación y desarrollo, y la gestión del desempeño.", icon: Users },
    { title: "Producción o operaciones", description: "Encargada de la planificación y gestión de los procesos de producción o entrega de servicios de la empresa, incluyendo la gestión de la cadena de suministro, control de calidad y mejora continua.", icon: Factory },
    { title: "Tecnología de la información (TI)", description: "Responsable de la gestión y desarrollo de la infraestructura tecnológica de la empresa, incluyendo redes, sistemas informáticos y software, soporte técnico y seguridad de la información.", icon: Laptop },
    { title: "Investigación y desarrollo (I+D)", description: "Encargada de la investigación y desarrollo de nuevos productos, procesos o tecnologías que puedan generar ventajas competitivas para la empresa.", icon: Microscope },
  ];
  const areasNameroot = [
    "VentasMark",
    "DireccionGeneral",
    "finanzas",
    "recursoshumanos",
    "ProduccionOperaciones",
    "TecnologiaInformacion",
    "InvestigacionDesarrollo"
  ];

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
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C5234] mb-2 break-words hyphens-auto">
            CONCEPTUALIZACIÓN GENERAL DE LAS ÁREAS FUNCIONALES EN LA EMPRESA
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6 text-lg">Las áreas funcionales comunes en la mayoría de las empresas son:</p>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              {areas.map((area, index) => (
                <Card 
                  key={index} 
                  className="w-full bg-white/50 hover:bg-white/70 transition-all duration-300 cursor-pointer"
                  onClick={() => router.push(`/InicioSeccion/usuario/area/${areasNameroot[index]}`)}
                >
                  <CardContent className="p-6 flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <area.icon className="w-12 h-12 text-[#4E9419]" style={{ stroke: '#2C5234', fill: '#FFF700' }} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-semibold text-[#4E9419] mb-3 text-xl">{area.title}</h3>
                      <p className="text-base text-gray-700">{area.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
          <Button 
            className="w-full mt-6 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg p-6"
            onClick={Navigate}
            style={{
              background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
          >
            Siguiente
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptualizacionAreasFunc;
