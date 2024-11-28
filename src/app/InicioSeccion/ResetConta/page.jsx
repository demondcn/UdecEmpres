"use client";
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PasswordRecovery({ onBackClick }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
  
    const res = await fetch("/api/auth/reset-password-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  
    if (res.ok) {
      alert("Revisa tu correo para restablecer tu contraseña.");
    } else {
      alert("Hubo un problema al enviar el correo de recuperación.");
    }
  };
  

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{
        background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234, #21323C)',
        backgroundSize: '400% 400%',
        animation: 'gradientAnimation 15s ease infinite',
      }}
    >
      <Card className="w-full max-w-md bg-[#21323C] shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#17D492]">
            Recuperación de Contraseña
          </CardTitle>
          <CardDescription className="text-white">
            Ingresa tu correo electrónico para recuperar tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="email" 
              placeholder="Correo electrónico" 
              required 
              className="bg-[#2C3E50] text-white border-[#17D492] placeholder-gray-400"
            />
            <Button 
              type="submit"
              className="w-full h-12 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(-45deg, #FFF700, #4E9419, #2C5234)',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 15s ease infinite',
              }}
            >
              <Send className="mr-2 h-5 w-5" />
              Enviar Instrucciones
            </Button>
          </form>
          <Button 
            onClick={() => router.back()}
            className="mt-4 w-full h-12 text-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-[#2C3E50]"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Regresar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}