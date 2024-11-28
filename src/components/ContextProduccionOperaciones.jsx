"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Factory, Settings, ClipboardList, Package, Truck } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ProduccionOperacionesArea = ({ Navigate }) => {
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
            Producción y Operaciones
          </CardTitle>
          <div className="flex justify-center mb-4">
            <Factory className="w-16 h-16 text-[#4E9419]" />
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] px-4">
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Gestión de la Producción y Operaciones</h2>
                <p className="text-gray-700 mb-3">
                  El área de Producción y Operaciones se centra en la fabricación de productos y la optimización de los procesos de producción. Su objetivo es garantizar que los productos se fabriquen de manera eficiente, con alta calidad y dentro del presupuesto.
                </p>
                <h3 className="text-xl font-semibold text-[#4E9419] mb-2">Funciones clave de Producción y Operaciones:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li className="flex items-start space-x-2">
                    <Settings className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Gestión de la cadena de suministro:</strong> Coordinación de proveedores, logística y almacenamiento para asegurar la producción continua.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ClipboardList className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Control de calidad:</strong> Asegurar que los productos cumplan con los estándares de calidad establecidos a lo largo del proceso de producción.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Package className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Optimización de procesos:</strong> Mejora continua de los procesos productivos para aumentar la eficiencia y reducir costos.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Truck className="w-5 h-5 text-[#4E9419] mt-1 flex-shrink-0" />
                    <span><strong>Logística y distribución:</strong> Coordinación de la entrega de productos terminados al cliente final de manera eficiente y oportuna.</span>
                  </li>
                </ul>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold text-[#4E9419] mb-3">Importancia Estratégica</h2>
                <p className="text-gray-700">
                  El área de Producción y Operaciones es esencial para garantizar que la empresa pueda cumplir con la demanda del mercado. Una producción eficiente no solo mejora la rentabilidad, sino que también permite a la empresa adaptarse rápidamente a los cambios en la demanda y las condiciones del mercado.
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

export default ProduccionOperacionesArea;
