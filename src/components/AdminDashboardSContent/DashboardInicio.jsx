"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NewUserDialog from '@/components/AdminDashboardSContent/DialogAgregarUsers';
import NewDiagnosticDialog from '@/components/AdminDashboardSContent/DialogAgregarDiagnostico';
import DeleteDialog from '@/components/AdminDashboardSContent/DeleteEmpresDialog'
import DeleteUserDialog from '@/components/AdminDashboardSContent/DeleteUserDialog'
import UpdateUserDialog from '@/components/AdminDashboardSContent/EditUserDialog'
import UpdateDialog from '@/components/AdminDashboardSContent/EditEmpresDialog'
import {
  Users,
  ShoppingCart,
  FileText,
  AlertTriangle,
  FileOutput,
  HelpCircle,
  Link,
  BarChart2
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell
} from 'recharts';
import { useRouter } from 'next/navigation';

const AdminDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false)
  const [isNewDiagnosticDialogOpen, setIsNewDiagnosticDialogOpen] = useState(false)
  const [isDeleteDiagnosticDialogOpen, setIsDeleteDiagnosticDialogOpen] = useState(false)
  const [isDeleteEmpressDialogOpen, setIsDeleteEmpressDialogOpen] = useState(null)
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(null)
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(null)
  const [isDeleteCompanyDialogOpen, setIsDeleteCompanyDialogOpen] = useState(null)
  const [isUpdateCompanyDialogOpen, setIsUpdateCompanyDialogOpen] = useState(null)
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/dashboardsroutes/dashboardInicioRoute');
        const data = await res.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    }
    fetchData();
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
      .nav-button {
        position: relative;
        overflow: hidden;
      }
      .nav-button::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background-color: #FFF700;
        transition: width 0.3s ease;
      }
      .nav-button:hover::after {
        width: 100%;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleNewUser = (event) => {
    event.preventDefault()
    // Implement new user creation logic here
    console.log("Creating new user")
    // You might want to make an API call to create the user
    setIsNewUserDialogOpen(false)
  }
  const handleNewDiagnostic = (event) => {
    event.preventDefault()
    // Implement new diagnostic creation logic here
    console.log("Creating new diagnostic")
    // You might want to make an API call to create the diagnostic
    setIsNewDiagnosticDialogOpen(false)
  }

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!dashboardData) {
    return <p>Error al cargar los datos</p>;
  }
  const {
    totalDiagnosticos,
    totalDiagnosticosUltimoMes,
    totalEmpresasActivas,
    porcentajeEmpresasActivasSemana,
    totalUsuarios,
    diagnosticosPendientes,
    diagnosticosCompletados,
    usuariosNuevos,
    barChartData,
    lineChartData,
    notificaciones,
    empresasFormateadas,
    usuariosFormateados,
  } = dashboardData;

  const empresas = empresasFormateadas;

  const users = usuariosFormateados;




  const pieChartData = [
    { name: 'Completados', value: diagnosticosCompletados },
    { name: 'Pendientes', value: diagnosticosPendientes },
  ];

  const COLORS = ['#4E9419', '#2C5234'];


  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Dashboard</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalDiagnosticos}</p>
                    <p className="text-[#4E9419]">+{Math.floor(totalDiagnosticosUltimoMes)}% desde el último mes</p>
                  </div>
                  <FileText className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Empresas Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalEmpresasActivas}</p>
                    <p className="text-[#4E9419]">+{Math.floor(porcentajeEmpresasActivasSemana)}% desde la última semana</p>
                  </div>
                  <ShoppingCart className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Usuarios Registrados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalUsuarios}</p>
                    <p className="text-[#4E9419]">+{Math.floor(usuariosNuevos)} nuevos usuarios</p>
                  </div>
                  <Users className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="charts" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="diagnostics">Empresas</TabsTrigger>
            </TabsList>
            <TabsContent value="charts">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Estado de Diagnósticos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="completados" fill="#4E9419" />
                        <Bar dataKey="pendientes" fill="#2C5234" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Empresas Activas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="empresasActivas" stroke="#4E9419" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Distribución de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <NewUserDialog isOpen={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen} onSubmit={handleNewUser} />
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Nombre</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">N°Diagnósticos</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((users) => (
                          <tr key={users.id} className="border-b">
                            <td className="p-2">{users.nombre}</td>
                            <td className="p-2">{users.email}</td>
                            <td className="p-2">{users.nD}</td>
                            <td className="p-2">
                              <DeleteUserDialog isOpen={isDeleteUserDialogOpen === users.id} onOpenChange={(isOpen) => setIsDeleteUserDialogOpen(isOpen ? users.id : null)} id={users.id} userName={users.nombre} />
                              <UpdateUserDialog isOpen={isUpdateUserDialogOpen === users.id} onOpenChange={(isOpen) => setIsUpdateUserDialogOpen(isOpen ? users.id : null)} id={users.id} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="diagnostics">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Id</th>
                          <th className="text-left p-2">Empresa</th>
                          <th className="text-left p-2">Fecha</th>
                          <th className="text-left p-2">Estado</th>
                          <th className="text-left p-2">Sector</th>
                          <th className="text-left p-2">TipoEmpresa</th>
                          <th className="text-left p-2">AutorizaEnvioCorreos</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {empresas.map((empresa) => (
                          <tr key={empresa.id} className="border-b">
                            <td className="p-2">{empresa.id}</td>
                            <td className="p-2">{empresa.nombre}</td>
                            <td className="p-2">{empresa.fecha}</td>
                            <td className="p-2">{empresa.estado}</td>
                            <td className="p-2">{empresa.sector}</td>
                            <td className="p-2">{empresa.tipeEmp}</td>
                            <td className="p-2">{empresa.Autorized}</td>
                            <td className="p-2">
                            <UpdateDialog isOpen={isUpdateCompanyDialogOpen === empresa.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? empresa.id : null)} id={empresa.id} />
                              <DeleteDialog isOpen={isDeleteDiagnosticDialogOpen === empresa.id} onOpenChange={(isOpen) => setIsDeleteDiagnosticDialogOpen(isOpen ? empresa.id : null)} id={empresa.id} empresName={empresa.nombre} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Notificaciones Recientes</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <div className="space-y-4">
                    {notificaciones.map((notificacion) => (
                      <div key={notificacion.id} className="flex items-center">
                        <AlertTriangle className="h-6 w-6 text-[#FFF700] mr-2" />
                        <div>
                          <p className="text-[#2C5234]">{notificacion.mensaje}</p>
                          <p className="text-[#4E9419] text-sm">Hace {notificacion.hace}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <NewUserDialog isOpen={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen} onSubmit={handleNewUser} />
                  <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                  <Button className="bg-[#4E9419] text-white " onClick={() => router.push('/InicioSeccion/admin/ExportAd')}>
                    <FileOutput className="mr-2 h-4 w-4" /> Generar Informe
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/AnalisisAd')}>
                    <BarChart2 className="mr-2 h-4 w-4" /> Ver Análisis
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Otras Acciones Rapidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <HelpCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <span className="text-[#2C5234]">Administrar Empresas</span>
                  </div>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/SoportAd')}>
                    Ver Empresas
                  </Button>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <Link className="h-6 w-6 text-[#4E9419] mr-2" />
                    <span className="text-[#2C5234]">Administrar Usuarios</span>
                  </div>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/UserAd')}>
                    Ver Usuarios
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;