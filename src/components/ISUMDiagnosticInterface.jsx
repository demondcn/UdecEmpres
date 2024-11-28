// components/ISUMDiagnosticInterface.jsx
import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { ClipboardList, BarChart2, UserPlus, TriangleAlert, MessageCircle } from "lucide-react";

const ISUMDiagnosticInterface = ({ onNewDiagnostic, onViewDiagnostics, onRegister, hasCompanies, loading, Mensaje }) => {
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes glowAnimation {
        0%, 100% { text-shadow: 0 0 5px rgba(255, 247, 0, 0.5), 0 0 10px rgba(78, 148, 25, 0.3); }
        50% { text-shadow: 0 0 10px rgba(255, 247, 0, 0.8), 0 0 20px rgba(78, 148, 25, 0.5); }
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);


  return (
    <div
      className="relative flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-md bg-[#21323C] shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/934998f8-8c24-41fd-bf88-93a6fc55d9fc-8exqPk7JrayPcJsRekohG0YpSGQP9W.jpg"
              alt="Empres 360 Pro Logo"
              width={400}
              height={200}
              className="object-contain"
            />
          </div>
          <CardDescription className="text-xl font-semibold text-[#17D492]">
            Sistema de Diagnóstico Empresarial
          </CardDescription>
          {!hasCompanies && (
            <p className="text-red-500 text-sm mt-2 font-semibold text-xl">
              Por favor registre su empresa
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={onNewDiagnostic}
            style={{
              background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
            disabled={loading || !hasCompanies}
          >
            <BarChart2 className="mr-2 h-6 w-6" />
            Nuevo Diagnóstico
          </Button>
          <Button
            className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={onViewDiagnostics}
            style={{
              background: 'linear-gradient(-45deg, #4E9419, #2C5234, #FFF700)',
              backgroundSize: '400% 400%',
              animation: 'gradientAnimation 15s ease infinite',
            }}
            disabled={loading || !hasCompanies}
          >
            <ClipboardList className="mr-2 h-6 w-6" />
            Ver Diagnósticos
          </Button>
          {!hasCompanies && (
            <Button
              className="w-full h-16 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              onClick={onRegister}
              style={{
                background: 'linear-gradient(-45deg, #2C5234, #FFF700, #4E9419)',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 15s ease infinite',
              }}
            >
              <UserPlus className="mr-2 h-6 w-6" />
              Registrar Empresa
            </Button>
          )}
        </CardContent>
      </Card>
      <div className="absolute bottom-4 right-4 flex items-center opacity-70">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/escudo-color-waDOd0j69NtIrPi0lb2qQI4ctw11aR.png"
          alt="Universidad de Cundinamarca Logo"
          width={20}
          height={20}
        />
        <p className="text-white text-xs ml-2 max-w-[400px]">
          Sistema de Diagnóstico aprobado por la Universidad de Cundinamarca
        </p>
      </div>
      <div className="absolute bottom-4 left-4 flex items-center opacity-70">
        <Button
          className="w-full h-16 text-lg font-semibold text-black transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          onClick={Mensaje}
          style={{
            background: 'linear-gradient(-45deg, #2C5234, #FFF700, #4E9419)',
            backgroundSize: '400% 400%',
            animation: 'gradientAnimation 15s ease infinite',
          }}
        >
          <MessageCircle className="mr-2 h-6 w-6"/>
        </Button>
      </div>
    </div>
  );
};

export default ISUMDiagnosticInterface;
