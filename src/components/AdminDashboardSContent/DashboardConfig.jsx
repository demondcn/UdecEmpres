"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Settings,
  Palette,
  Bell,
  Shield,
  Save,
  RefreshCw,
} from 'lucide-react';

const ConfigurationDashboard = () => {
  const [generalConfig, setGeneralConfig] = useState({
    siteName: 'Emprex360',
    language: 'es',
    timeZone: 'America/Bogota',
    maintenanceMode: false,
  });

  const [appearanceConfig, setAppearanceConfig] = useState({
    theme: 'light',
    primaryColor: '#4E9419',
    secondaryColor: '#2C5234',
    fontSize: 16,
  });

  const [notificationConfig, setNotificationConfig] = useState({
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: 'daily',
  });

  const [securityConfig, setSecurityConfig] = useState({
    twoFactorAuth: false,
    passwordExpiration: 90,
    sessionTimeout: 30,
  });

  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = `
      @keyframes gradientAnimation {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      .animated-gradient {
        animation: gradientAnimation 15s ease infinite;
        background: linear-gradient(-45deg, #FFF700, #4E9419, #2C5234);
        background-size: 400% 400%;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleSaveConfig = () => {
    // Esta es una función simulada. En una implementación real, aquí se conectaría con el backend para guardar la configuración.
    console.log('Guardando configuración:', {
      general: generalConfig,
      appearance: appearanceConfig,
      notifications: notificationConfig,
      security: securityConfig,
    });
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Configuración del Sistema</h3>
          
          <Tabs defaultValue="general" className="bg-white/90 backdrop-blur-sm rounded-lg p-6">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="general" className="flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Apariencia
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center">
                <Shield className="w-4 h-4 mr-2" />
                Seguridad
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Configuración General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Nombre del Sitio</label>
                    <Input 
                      value={generalConfig.siteName}
                      onChange={(e) => setGeneralConfig({...generalConfig, siteName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Idioma</label>
                    <Select 
                      value={generalConfig.language}
                      onValueChange={(value) => setGeneralConfig({...generalConfig, language: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un idioma" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Zona Horaria</label>
                    <Select 
                      value={generalConfig.timeZone}
                      onValueChange={(value) => setGeneralConfig({...generalConfig, timeZone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una zona horaria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/Bogota">Bogotá</SelectItem>
                        <SelectItem value="America/New_York">New York</SelectItem>
                        <SelectItem value="Europe/Madrid">Madrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#2C5234]">Modo de Mantenimiento</label>
                    <Switch 
                      checked={generalConfig.maintenanceMode}
                      onCheckedChange={(checked) => setGeneralConfig({...generalConfig, maintenanceMode: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Configuración de Apariencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Tema</label>
                    <Select 
                      value={appearanceConfig.theme}
                      onValueChange={(value) => setAppearanceConfig({...appearanceConfig, theme: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="dark">Oscuro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Color Primario</label>
                    <Input 
                      type="color"
                      value={appearanceConfig.primaryColor}
                      onChange={(e) => setAppearanceConfig({...appearanceConfig, primaryColor: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Color Secundario</label>
                    <Input 
                      type="color"
                      value={appearanceConfig.secondaryColor}
                      onChange={(e) => setAppearanceConfig({...appearanceConfig, secondaryColor: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Tamaño de Fuente Base</label>
                    <Slider
                      value={[appearanceConfig.fontSize]}
                      onValueChange={(value) => setAppearanceConfig({...appearanceConfig, fontSize: value[0]})}
                      max={24}
                      min={12}
                      step={1}
                    />
                    <div className="text-right text-sm text-[#4E9419]">{appearanceConfig.fontSize}px</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Configuración de Notificaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#2C5234]">Notificaciones por Email</label>
                    <Switch 
                      checked={notificationConfig.emailNotifications}
                      onCheckedChange={(checked) => setNotificationConfig({...notificationConfig, emailNotifications: checked})}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#2C5234]">Notificaciones Push</label>
                    <Switch 
                      checked={notificationConfig.pushNotifications}
                      onCheckedChange={(checked) => setNotificationConfig({...notificationConfig, pushNotifications: checked})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Frecuencia de Notificaciones</label>
                    <Select 
                      value={notificationConfig.notificationFrequency}
                      onValueChange={(value) => setNotificationConfig({...notificationConfig, notificationFrequency: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona la frecuencia" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Tiempo Real</SelectItem>
                        <SelectItem value="daily">Diario</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-[#2C5234]">Configuración de Seguridad</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-[#2C5234]">Autenticación de Dos Factores</label>
                    <Switch 
                      checked={securityConfig.twoFactorAuth}
                      onCheckedChange={(checked) => setSecurityConfig({...securityConfig, twoFactorAuth: checked})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Expiración de Contraseña (días)</label>
                    <Input 
                      type="number"
                      value={securityConfig.passwordExpiration}
                      onChange={(e) => setSecurityConfig({...securityConfig, passwordExpiration: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-[#2C5234]">Tiempo de Inactividad de Sesión (minutos)</label>
                    <Input 
                      type="number"
                      value={securityConfig.sessionTimeout}
                      onChange={(e) => setSecurityConfig({...securityConfig, sessionTimeout: parseInt(e.target.value)})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end space-x-4">
            <Button className="bg-[#4E9419] text-white" onClick={handleSaveConfig}>
              <Save className="mr-2 h-4 w-4" /> Guardar Configuración
            </Button>
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" /> Restablecer Valores Predeterminados
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConfigurationDashboard;