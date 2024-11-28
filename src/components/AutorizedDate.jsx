"use client";
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, ArrowLeft } from "lucide-react"

const DataAuthorizationInterface = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    personalDataUsage: false,
    marketingCommunications: false,
    thirdPartySharing: false,
    dataRetention: false
  })

  const handleCheckboxChange = (name) => {
    setFormData(prevData => ({ ...prevData, [name]: !prevData[name] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  
    const allSelected = Object.values(formData).every(value => value === true)
  
    if (allSelected) {
      // Redirigir a un enlace si todos los checkbox están seleccionados
      router.push('/InicioSeccion/usuario/RegisterEmpress') // Cambia esto a la URL a la que quieras redirigir
    } else {
      alert('Por favor, acepta todas las políticas antes de continuar.')
    }
  }
  

  const authorizationText = `
    Autorización para el Tratamiento de Datos Personales

    1. Recolección de Datos:
    Recopilamos información personal como nombre, dirección de correo electrónico, número de teléfono y otros datos relevantes para nuestros servicios.

    2. Uso de la Información:
    Utilizamos sus datos para proporcionar y mejorar nuestros servicios, personalizar su experiencia, procesar transacciones y comunicarnos con usted.

    3. Protección de Datos:
    Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra acceso no autorizado, alteración, divulgación o destrucción.

    4. Compartir Información:
    Podemos compartir su información con terceros de confianza que nos ayudan a operar nuestro negocio y servicios, siempre bajo estrictas normas de confidencialidad.

    5. Sus Derechos:
    Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de sus datos personales en cualquier momento.

    6. Cambios en la Política:
    Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en nuestro sitio web.

    7. Consentimiento:
    Al utilizar nuestros servicios, usted consiente la recopilación y uso de su información de acuerdo con esta política.

    8. Contacto:
    Si tiene preguntas sobre esta política o el manejo de sus datos personales, por favor contáctenos a través de los canales proporcionados en nuestro sitio web.
  `

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-gradient-x">
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          background: linear-gradient(-45deg, #FFF700, #4E9419, #2C5234, #21323C);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
      <Card className="w-full max-w-2xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#4E9419] to-[#2C5234] text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Autorización de Datos</CardTitle>
          <CardDescription className="text-xl font-semibold text-center text-green-100">
            Por favor, revise y acepte nuestras políticas de uso de datos
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Política de Autorización de Datos</Label>
              <ScrollArea className="h-48 w-full rounded border p-4">
                <p className="text-sm">{authorizationText}</p>
              </ScrollArea>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="personalDataUsage" 
                  checked={formData.personalDataUsage} 
                  onCheckedChange={() => handleCheckboxChange('personalDataUsage')} 
                />
                <Label htmlFor="personalDataUsage">
                  Autorizo el uso de mis datos personales para los fines descritos en la política de privacidad.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="marketingCommunications" 
                  checked={formData.marketingCommunications} 
                  onCheckedChange={() => handleCheckboxChange('marketingCommunications')} 
                />
                <Label htmlFor="marketingCommunications">
                  Acepto recibir comunicaciones de marketing y promociones.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="thirdPartySharing" 
                  checked={formData.thirdPartySharing} 
                  onCheckedChange={() => handleCheckboxChange('thirdPartySharing')} 
                />
                <Label htmlFor="thirdPartySharing">
                  Autorizo compartir mis datos con terceros para mejorar los servicios.
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dataRetention" 
                  checked={formData.dataRetention} 
                  onCheckedChange={() => handleCheckboxChange('dataRetention')} 
                />
                <Label htmlFor="dataRetention">
                  Entiendo y acepto la política de retención de datos.
                </Label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button type="submit" className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-[#FFF700] to-[#4E9419] hover:from-[#4E9419] hover:to-[#2C5234] text-white transition-all duration-300 transform hover:scale-105">
                <Shield className="mr-2 h-6 w-6" />
                Autorizar Uso de Datos
              </Button>
              <Button onClick={() => router.back()} variant="outline" className="flex-1 h-12 text-lg font-semibold">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Regresar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default DataAuthorizationInterface