"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import NewUserDialog from '@/components/AdminDashboardSContent/DialogAgregarUsers';
import DeleteDialog from '@/components/AdminDashboardSContent/DeleteUserDialog'
import UpdateDialog from '@/components/AdminDashboardSContent/EditUserDialog'
import {
  Users,
  UserPlus,
  UserMinus,
  UserCog,
  Search,
  BarChart2,
  Briefcase,
  SquareUser,
  FileCheck,
  UserRoundX


} from 'lucide-react';
import {
  BarChart,
  PieChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Pie,
  Cell
} from 'recharts';

const UserManagementDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeleteDiagnosticDialogOpen, setIsDeleteDiagnosticDialogOpen] = useState(null)
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(null)

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

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!dashboardData) {
    return <p>Error al cargar los datos</p>;
  }
  const {
    totalUsuarios,
    totalUsuariosUltimoMes,
    totalUsersSemana,
    porcentajeUsuariosActivosSeman,
    usersFormated,
    newUsersData,
    userActivityBar,
    usersConDiagnoses,
    usersWithCompletedDiagnoses,
    usersNotAffiliated,
    testResulPie,
    UsuariosActivosSemana

  } = dashboardData;

  const users = usersFormated;
  const userActivityData = userActivityBar;


  const userRoleData = testResulPie;

  const COLORS = ['#4E9419', '#2C5234', '#FE1100', '#FF6B6B', '#3498DB', '#9B59B6', '#E67E22'];





  const mockUsers = [
    { id: 1, name: 'Juan Pérez', email: 'juan@example.com', role: 'Administrador', lastActive: '2023-06-15' },
    { id: 2, name: 'María García', email: 'maria@example.com', role: 'Gerente', lastActive: '2023-06-14' },
    { id: 3, name: 'Carlos Rodríguez', email: 'carlos@example.com', role: 'Empleado', lastActive: '2023-06-13' },
    { id: 4, name: 'Ana Martínez', email: 'ana@example.com', role: 'Cliente', lastActive: '2023-06-12' },
    { id: 5, name: 'Luis Sánchez', email: 'luis@example.com', role: 'Empleado', lastActive: '2023-06-11' },
  ];

  const usuariosFiltrados = users.filter((user) =>
    user.id.toString().includes(searchTerm.toLowerCase()) ||
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.nD.toString().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Usuarios</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalUsuarios}</p>
                    <p className="text-[#4E9419]">+{totalUsuariosUltimoMes} nuevos este mes</p>
                  </div>
                  <Users className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Usuarios Activos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{UsuariosActivosSemana}</p>
                    <p className="text-[#4E9419]">{Math.floor(porcentajeUsuariosActivosSeman)}% Usuarios activos en la semana</p>
                  </div>
                  <UserCog className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Nuevos Registros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalUsersSemana}</p>
                    <p className="text-[#4E9419]">En los últimos 7 días</p>
                  </div>
                  <UserPlus className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Búsqueda de Usuarios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="text-[#4E9419]" />
                <Input
                  type="text"
                  placeholder="Buscar por nombre, email o rol..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="users" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="users">Lista de Usuarios</TabsTrigger>
              <TabsTrigger value="activity">Actividad de Usuarios</TabsTrigger>
              <TabsTrigger value="roles">Área Por Usuario</TabsTrigger>
            </TabsList>
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
                          <th className="text-left p-2">Id</th>
                          <th className="text-left p-2">Nombre</th>
                          <th className="text-left p-2">Email</th>
                          <th className="text-left p-2">N°Diagnósticos</th>
                          <th className="text-left p-2">Última Actividad</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuariosFiltrados.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.nombre}</td>
                            <td className="p-2">{user.email}</td>
                            <td className="p-2">{user.nD}</td>
                            <td className="p-2">{user.lastActive}</td>
                            <td className="p-2">
                              <div className="flex space-x-2">
                                <DeleteDialog isOpen={isDeleteDiagnosticDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteDiagnosticDialogOpen(isOpen ? user.id : null)} id={user.id} userName={user.nombre} />
                                <UpdateDialog isOpen={isUpdateUserDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateUserDialogOpen(isOpen ? user.id : null)} id={user.id} />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Actividad de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={userActivityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="activos" fill="#4E9419" />
                      <Bar dataKey="inactivos" fill="#2C5234" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="roles">
              <Card>
                <CardHeader>
                  <CardTitle>Resultados Maximos De Usuarios Por Área</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={userRoleData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {userRoleData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Nuevos Usuarios por Mes</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={newUsersData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="nuevosUsuarios" stroke="#4E9419" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <NewUserDialog isOpen={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen} onSubmit={handleNewUser} />
                  <Button className="bg-[#4E9419] text-white">
                    <UserMinus className="mr-2 h-4 w-4" /> Desactivar Usuario
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/SoportAd')}>
                    <Briefcase className="mr-2 h-4 w-4" /> Andministrar Empresas
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/ExportAd')}>
                    <BarChart2 className="mr-2 h-4 w-4" /> Generar Reporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Estadísticas de Usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <SquareUser className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios con Diagnósticos</p>
                      <p className="text-[#4E9419]">{usersConDiagnoses}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FileCheck className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios con Diagnósticos Completados</p>
                      <p className="text-[#4E9419]">{usersWithCompletedDiagnoses}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <UserRoundX className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Usuarios No Afiliados</p>
                      <p className="text-[#4E9419]">{usersNotAffiliated}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserManagementDashboard;