"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Search, Megaphone, Globe, Users, HandshakeIcon, BarChart } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VentasYMarketingArea = () => {
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
            Ventas y Marketing
          </CardTitle>
          <div className="flex justify-center mb-4">
            <ShoppingCart className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Marketing</h2>
                <p className="text-gray-700 mb-3">
                  El marketing se centra en comprender el mercado y crear valor para los clientes. Esto incluye investigar las necesidades y deseos de los consumidores, analizar la competencia, y desarrollar estrategias que posicionen los productos o servicios de la empresa de manera efectiva en el mercado.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Actividades clave del marketing:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Search className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Investigación de mercado:</strong> Identificación de tendencias, necesidades del cliente y oportunidades de mercado.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ShoppingCart className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Estrategia de marca:</strong> Creación y gestión de la identidad de la marca, asegurando que sea reconocible y relevante para el público objetivo.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Megaphone className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Publicidad y promoción:</strong> Diseño de campañas publicitarias y promociones para comunicar el valor del producto o servicio.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Globe className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Marketing digital:</strong> Uso de herramientas digitales, como redes sociales, SEO y publicidad en línea, para llegar a los consumidores de manera efectiva.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de relaciones públicas:</strong> Mantenimiento de una buena imagen pública y manejo de la comunicación externa.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Ventas</h2>
                <p className="text-gray-700 mb-3">
                  El área de ventas se encarga de convertir el interés generado por el marketing en ingresos reales a través de la venta directa de productos o servicios. Su enfoque está en el contacto directo con el cliente, ya sea a través de ventas presenciales, en línea o mediante otros canales de distribución.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de ventas:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Users className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de clientes:</strong> Identificación y desarrollo de relaciones con clientes potenciales, así como la gestión de cuentas existentes.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <HandshakeIcon className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Negociación y cierre de ventas:</strong> Presentación de productos o servicios, negociación de términos y condiciones, y cierre de acuerdos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Users className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Atención al cliente:</strong> Asegurarse de que los clientes estén satisfechos con el producto o servicio, lo que fomenta la repetición de compras y la lealtad a la marca.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <BarChart className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de equipos de ventas:</strong> Supervisión y motivación de los equipos de ventas para alcanzar objetivos de rendimiento y metas de ventas.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Marketing y Ventas es esencial porque se encarga de generar ingresos, atraer clientes y construir la imagen de la empresa en el mercado. Un marketing efectivo asegura que los productos y servicios lleguen a la audiencia adecuada, mientras que un equipo de ventas fuerte cierra el ciclo al convertir ese interés en transacciones comerciales.
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

export default VentasYMarketingArea;