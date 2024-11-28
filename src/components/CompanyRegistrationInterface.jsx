import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building2, ArrowLeft } from "lucide-react"

const generateYears = (startYear, endYear) => {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
}
const CompanyRegistrationInterface = ({ userId }) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    companyName: '', nit: '', address: '', city: '', location: '',
    email: '', phone: '', contactName: '', companyType: '', sector: '',
    anoFundacion: '', ingresosAnuales: '', activosTotales: '',
    patrimonio: '', numeroEmpleados: '', canalesDistribucion: '',
    principalesClientes: '', tecnologiaUtilizada: '',
    emailAuthorization: false,
    sectorOtro: '',
    clientesOtro: '',
    tecnologiaOtro: ''
  })

  const [otrosSeleccionados, setOtrosSeleccionados] = useState({
    sector: false,
    clientes: false,
    tecnologia: false
  })
  
  const currentYear = new Date().getFullYear();
  const years = generateYears(1600, currentYear);
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const handleSelectChange = (value, name) => {
    setFormData(prevData => ({ ...prevData, [name]: value }))
    if (name === 'sector') {
      setOtrosSeleccionados(prev => ({ ...prev, sector: value === 'otros' }))
    }
    if (name === 'principalesClientes') {
      setOtrosSeleccionados(prev => ({ ...prev, clientes: value === 'otros' }))
    }
    if (name === 'tecnologiaUtilizada') {
      setOtrosSeleccionados(prev => ({ ...prev, tecnologia: value === 'otros' }))
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prevData => ({ ...prevData, [name]: checked }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Crear una copia de formData para modificar si es necesario
    let dataToSend = { ...formData }

    // Reemplazar valores 'otros' por los que el usuario ha ingresado en los campos de texto
    if (dataToSend.sector === 'otros') {
      dataToSend.sector = dataToSend.sectorOtro
    }
    if (dataToSend.principalesClientes === 'otros') {
      dataToSend.principalesClientes = dataToSend.clientesOtro
    }
    if (dataToSend.tecnologiaUtilizada === 'otros') {
      dataToSend.tecnologiaUtilizada = dataToSend.tecnologiaOtro
    }

    // Eliminar los campos *_Otro que ya no son necesarios
    delete dataToSend.sectorOtro
    delete dataToSend.clientesOtro
    delete dataToSend.tecnologiaOtro
    try {
      const response = await fetch('/api/company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...dataToSend, userId }),
      })
      if (response.ok) {
        console.log('Company registration successful')
        router.push('/InicioSeccion/usuario')
      } else {
        console.error('Error in registration')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

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
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#4E9419] to-[#2C5234] text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Registro de Empresa</CardTitle>
          <CardDescription className="text-xl font-semibold text-center text-green-100">
            Completa el formulario para registrar tu empresa
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfonos</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Nombre de Contacto</Label>
              <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="nit">NIT</Label>
              <Input id="nit" name="nit" value={formData.nit} onChange={handleInputChange} placeholder="(Opcional)"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" name="city" value={formData.city} onChange={handleInputChange} placeholder="(Obligatorio)" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Departamento</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="(Obligatorio)" required/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyType">Tipo de Empresa</Label>
              <Select name="companyType" onValueChange={(value) => handleSelectChange(value, 'companyType')} required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un tipo de empresa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="micro">Microempresa</SelectItem>
                  <SelectItem value="pequena">Pequeña empresa</SelectItem>
                  <SelectItem value="mediana">Mediana empresa</SelectItem>
                  <SelectItem value="gran">Gran empresa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sector">Sector Económico</Label>
              <Select name="sector" onValueChange={(value) => handleSelectChange(value, 'sector')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un sector económico" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="construccion">Construcción</SelectItem>
                  <SelectItem value="agropecuario">Agropecuario</SelectItem>
                  <SelectItem value="industrial_manufacturero">Industrial y Manufacturero</SelectItem>
                  <SelectItem value="minero_energetico">Minero-Energético</SelectItem>
                  <SelectItem value="servicios">Servicios</SelectItem>
                  <SelectItem value="comercio">Comercio</SelectItem>
                  <SelectItem value="cultural_creativo">Cultural y Creativo (Economía Naranja)</SelectItem>
                  <SelectItem value="tecnologico_innovacion">Tecnológico y de Innovación</SelectItem>
                  <SelectItem value="financiero_asegurador">Financiero y Asegurador</SelectItem>
                  <SelectItem value="ambiental_sostenible">Ambiental y Sostenible</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              {otrosSeleccionados.sector && (
                <div className="space-y-2">
                  <Label htmlFor="sectorOtro">Especifique el sector</Label>
                  <Input id="sectorOtro" name="sectorOtro" value={formData.sectorOtro} onChange={handleInputChange} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="anoFundacion">Año de Fundación</Label>
              <Select name="anoFundacion" onValueChange={(value) => handleSelectChange(value, 'anoFundacion')} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el año de fundación" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ingresosAnuales">Ingresos Anuales</Label>
              <Select name="ingresosAnuales" onValueChange={(value) => handleSelectChange(value, 'ingresosAnuales')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el rango de ingresos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menos_100m">Menos de $100 millones</SelectItem>
                  <SelectItem value="entre_100_500m">Entre $100 millones y $500 millones</SelectItem>
                  <SelectItem value="entre_500_1000m">Entre $500 millones y $1.000 millones</SelectItem>
                  <SelectItem value="mas_1000m">Más de $1.000 millones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activosTotales">Activos Totales (opcional) </Label>
              <Select name="activosTotales" onValueChange={(value) => handleSelectChange(value, 'activosTotales')}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el valor de activos totales" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menos_500m">Menos de $500 millones</SelectItem>
                  <SelectItem value="entre_500_5000m">Entre $500 millones y $5.000 millones</SelectItem>
                  <SelectItem value="mas_5000m">Más de $5.000 millones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="patrimonio">Patrimonio (opcional) </Label>
              <Select name="patrimonio" onValueChange={(value) => handleSelectChange(value, 'patrimonio')}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el valor de patrimonio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="menos_500m">Menos de $500 millones</SelectItem>
                  <SelectItem value="entre_500_1000m">Entre $500 millones y $1.000 millones</SelectItem>
                  <SelectItem value="mas_1000m">Más de $1.000 millones</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="numeroEmpleados">Número de Empleados</Label>
              <Select name="numeroEmpleados" onValueChange={(value) => handleSelectChange(value, 'numeroEmpleados')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione el número de empleados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1_10">1-10 empleados</SelectItem>
                  <SelectItem value="11_50">11-50 empleados</SelectItem>
                  <SelectItem value="51_200">51-200 empleados</SelectItem>
                  <SelectItem value="mas_200">Más de 200 empleados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="canalesDistribucion">Canales de Distribución</Label>
              <Select name="canalesDistribucion" onValueChange={(value) => handleSelectChange(value, 'canalesDistribucion')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un canal de distribución" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="directo">Directo</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="distribuidores">Distribuidores</SelectItem>
                  <SelectItem value="mixto">Mixto</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="principalesClientes">Principales Clientes</Label>
              <Select name="principalesClientes" onValueChange={(value) => handleSelectChange(value, 'principalesClientes')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione sus principales clientes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empresas">Empresas</SelectItem>
                  <SelectItem value="consumidores_finales">Consumidores finales</SelectItem>
                  <SelectItem value="gobierno">Gobierno</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              {otrosSeleccionados.clientes && (
                <div className="space-y-2">
                  <Label htmlFor="clientesOtro">Especifique otros clientes</Label>
                  <Input id="clientesOtro" name="clientesOtro" value={formData.clientesOtro} onChange={handleInputChange} />
                </div>
              )}
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="tecnologiaUtilizada">Tecnología Utilizada</Label>
              <Select name="tecnologiaUtilizada" onValueChange={(value) => handleSelectChange(value, 'tecnologiaUtilizada')}required>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione la tecnología utilizada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="automatizacion">Automatización</SelectItem>
                  <SelectItem value="big_data">Big Data</SelectItem>
                  <SelectItem value="blockchain">Blockchain</SelectItem>
                  <SelectItem value="cloud_computing">Cloud Computing</SelectItem>
                  <SelectItem value="inteligencia_artificial">Inteligencia Artificial</SelectItem>
                  <SelectItem value="iot">IoT (Internet de las cosas)</SelectItem>
                  <SelectItem value="otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              {otrosSeleccionados.tecnologia && (
                <div className="space-y-2">
                  <Label htmlFor="tecnologiaOtro">Especifique otra tecnología</Label>
                  <Input id="tecnologiaOtro" name="tecnologiaOtro" value={formData.tecnologiaOtro} onChange={handleInputChange} />
                </div>
              )}
            </div> */}
            <div className="md:col-span-2 flex items-center space-x-2">
              <Checkbox
                id="emailAuthorization"
                name="emailAuthorization"
                checked={formData.emailAuthorization}
                onCheckedChange={(checked) => setFormData(prevData => ({ ...prevData, emailAuthorization: checked }))}
              />
              <Label htmlFor="emailAuthorization">
                ¿Da su autorización para recibir correos?
              </Label>
            </div>
            <div className="md:col-span-2 flex flex-col sm:flex-row gap-4 mt-6">
              <Button type="submit" className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-[#FFF700] to-[#4E9419] hover:from-[#4E9419] hover:to-[#2C5234] text-white transition-all duration-300 transform hover:scale-105">
                <Building2 className="mr-2 h-6 w-6" />
                Registrar Empresa
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

export default CompanyRegistrationInterface