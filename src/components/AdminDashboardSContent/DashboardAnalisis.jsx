"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NewUserDialog from '@/components/AdminDashboardSContent/DialogAgregarUsers';
import NewDiagnosticDialog from '@/components/AdminDashboardSContent/DialogAgregarDiagnostico';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Target,
  Zap,
  Download,
  Share2,
  FileText,
  Users,
  Building,
  Trash2,
  Filter,
  BarChart2,
  FileOutput,
  Briefcase,
  SquarePlus,
  SquareMinus
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
  Line,
  LineChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LabelList,
  PieChart as RePieChart, PieChart
} from 'recharts';
import { useRouter } from 'next/navigation';
import DeleteUserDialog from '@/components/AdminDashboardSContent/DeleteUserDialog'
import DeleteEmpresDialog from '@/components/AdminDashboardSContent/DeleteEmpresDialog'
import DeleteAreasDialog from '@/components/AdminDashboardSContent/DeleteAreaDialog'
import DeleteDiagnosticDialog from '@/components/AdminDashboardSContent/DeleteDiagnosticDialog'
import UpdateDialog from '@/components/AdminDashboardSContent/EditEmpresDialog'
import UpdateAreasDialog from '@/components/AdminDashboardSContent/EditAreasDialog'
import UpdateUserDialog from '@/components/AdminDashboardSContent/EditUserDialog'

const AnalysisDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [selectedSector, setSelectedSector] = useState('all');
  const [loading, setLoading] = useState(true);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false)
  const [searchTermUsers, setSearchTermUsers] = useState("");
  const [searchTermDiagnostics, setSearchTermDiagnostics] = useState("");
  const [searchTermTests, setSearchTermTests] = useState("");
  const [searchTermEmpress, setSearchTermEmpress] = useState("");
  const [isNewDiagnosticDialogOpen, setIsNewDiagnosticDialogOpen] = useState(false)
  const [filterUser, setFilterUser] = useState("all");
  const [filterDiagnostic, setFilterDiagnostic] = useState("all");
  const [filterEmpres, setFilterEmpres] = useState("all");
  const [filterPrue, setFilterPrue] = useState("all");
  const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(null)
  const [isUpdateUserDialogOpen, setIsUpdateUserDialogOpen] = useState(null)
  const [isDeleteDiagnosticDialogOpen, setIsDeleteDiagnosticDialogOpen] = useState(null)
  const [isDeleteAreasDialopgOen, setIsDeleteAreasDialogOpen] = useState(null)
  const [isUpdateAreasDialogOpen, setIsUpdateAreasDialogOpen] = useState(null)
  const [isDeleteEmpresDialogOpen, setIsDeleteEmpresDialogOpen] = useState(null)
  const [isUpdateCompanyDialogOpen, setIsUpdateCompanyDialogOpen] = useState(null)
  const [filterRange, setFilterRange] = useState([null, null]);





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
    totalUsuarios,
    diagnosticosPendientes,
    diagnosticosCompletados,
    barChartData,
    lineChartData,
    totalEmpresas,
    newUsersData,
    userActivityBar,
    testResulPie,
    formattedResultsTestCounts,
    monthlyDiagnosticsData,
    radarData,
    usersFormated,
    UsuariosDiagnosticRR,
    TestListR,
    EmpresasDiagnosticRRR,
    descriptionMasBajoArea,
    porcentajeAumento,
    resultadosPromedio,
    usersFormatedFix,
    empresasPorSector,
    numeroDeSectores,
    EmpresActivity

  } = dashboardData;

  const porcentajeD = Math.floor((diagnosticosCompletados / totalDiagnosticos) * 100)
  const userActivityData = userActivityBar;
  const sectorDistributionData = formattedResultsTestCounts;
  const users = usersFormatedFix;
  const userRoleData = testResulPie;

  const pieChartData = [
    { name: 'Completados', value: diagnosticosCompletados },
    { name: 'Pendientes', value: diagnosticosPendientes },
  ];

  const COLORSPruebasUsuarios = ['#4E9419', '#2C5234', '#FE1100', '#FF6B6B', '#3498DB', '#9B59B6', '#E67E22'];


  function generateColor(index) {
    const hue = index * 137.508; // 137.508° es el ángulo dorado para una buena distribución de colores
    return `hsl(${hue % 360}, 70%, 50%)`; // Mantén la saturación y la luminosidad fijas
  }

  const getInfiniteColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(generateColor(i));
    }
    return colors;
  }
  const COLORS = getInfiniteColors(numeroDeSectores);



  const COLORSPie = ['#4E9419', '#2C5234'];

  const usuariosFiltrados = users.filter(user => {
    const searchTermLowerCase = searchTermUsers.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterUser === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterUser]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });


  const filteredTests = TestListR.filter(user => {
    const searchTermLowerCase = searchTermTests.toLowerCase();
    // Filtrado por estado
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterPrue === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterPrue]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });

  const filteredDiagnostics = UsuariosDiagnosticRR.filter(user => {
    const searchTermLowerCase = searchTermDiagnostics.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterDiagnostic === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterDiagnostic]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });

  const filteredEmpress = EmpresasDiagnosticRRR.filter(user => {
    const searchTermLowerCase = searchTermEmpress.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterEmpres === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterEmpres]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Análisis de Diagnósticos Empresariales</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalDiagnosticos}</p>
                    <p className="text-[#4E9419]">{diagnosticosCompletados} completados, {diagnosticosPendientes} pendientes</p>
                  </div>
                  <FileText className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Usuarios Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalUsuarios}</p>
                    <p className="text-[#4E9419]">Usuarios registrados</p>
                  </div>
                  <Users className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Empresas Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalEmpresas}</p>
                    <p className="text-[#4E9419]">Empresas registradas</p>
                  </div>
                  <Building className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="charts" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="charts">Gráficos</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="diagnostics">Diagnósticos</TabsTrigger>
              <TabsTrigger value="tests">Áreas</TabsTrigger>
              <TabsTrigger value="empres">Empresas</TabsTrigger>
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

                <Card>
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
                            <Cell key={`cell-${index}`} fill={COLORSPie[index % COLORSPie.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RePieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
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
                <Card>
                  <CardHeader>
                    <CardTitle>Resultados Maximos De Usuarios Por Prueba</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
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
                            <Cell key={`cell-${index}`} fill={COLORSPruebasUsuarios[index % COLORSPruebasUsuarios.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Distribución de Empresas por Sector</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={empresasPorSector}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {empresasPorSector.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#2C5234]">Nuevas Empresas por Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={EmpresActivity}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="nuevasEmpresas" stroke="#4E9419" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-[#2C5234]">Distribución por Cantidad de Pruebas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <BarChart
                        data={sectorDistributionData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cantidad" fill="#4E9419">
                          <LabelList dataKey="cantidad" position="right" fill="#2C5234" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-[#2C5234]">Diagnósticos por Mes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={monthlyDiagnosticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="diagnosticos" stroke="#4E9419" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

              </div>
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#2C5234]">Distribución por Promedio Entre Áreas</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={resultadosPromedio}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="promedio" fill="#4E9419">
                        <LabelList dataKey="promedio" position="right" fill="#2C5234" />
                      </Bar>
                    </BarChart>
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
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center flex-grow">

                      <input
                        type="text"
                        placeholder={`Buscar por ${filterUser}...`}
                        value={searchTermUsers}
                        onChange={e => setSearchTermUsers(e.target.value)}
                        className="border p-2 rounded"
                      />
                      <NewUserDialog isOpen={isNewUserDialogOpen} onOpenChange={setIsNewUserDialogOpen} onSubmit={handleNewUser} />
                    </div>
                    {/* Filter Dropdown */}
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterUser}
                        onChange={(e) => setFilterUser(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {users.length > 0 &&
                          Object.keys(users[0]).map((key) => (
                            <option value={key} key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <SquareMinus className="text-[#4E9419] mr-2" />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={filterRange[0] || ''}
                        onChange={e => setFilterRange([e.target.value || null, filterRange[1]])}
                        className="border p-2 rounded w-20"
                      />
                    <SquarePlus className="text-[#4E9419] mr-2" />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={filterRange[1] || ''}
                        onChange={e => setFilterRange([filterRange[0], e.target.value || null])}
                        className="border p-2 rounded w-20"
                      />
                    </div>
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
                            <td className="p-2">{user.UltimaActividad}</td>
                            <td className="p-2">
                              <DeleteUserDialog isOpen={isDeleteUserDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteUserDialogOpen(isOpen ? user.id : null)} id={user.id} userName={user.nombre} />
                              <UpdateUserDialog isOpen={isUpdateUserDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateUserDialogOpen(isOpen ? user.id : null)} id={user.id} />
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
                  <CardTitle>Gestión de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        placeholder={`Buscar por ${filterDiagnostic}...`}
                        value={searchTermDiagnostics}
                        onChange={e => setSearchTermDiagnostics(e.target.value)}
                        className="border p-2 rounded"
                      />
                      <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                    </div>
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterDiagnostic}
                        onChange={(e) => setFilterDiagnostic(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {UsuariosDiagnosticRR.length > 0 &&
                          Object.keys(UsuariosDiagnosticRR[0]).map((key) => (
                            <option value={key} key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <SquareMinus className="text-[#4E9419] mr-2" />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={filterRange[0] || ''}
                        onChange={e => setFilterRange([e.target.value || null, filterRange[1]])}
                        className="border p-2 rounded w-20"
                      />
                    <SquarePlus className="text-[#4E9419] mr-2" />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={filterRange[1] || ''}
                        onChange={e => setFilterRange([filterRange[0], e.target.value || null])}
                        className="border p-2 rounded w-20"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">IdD</th>
                          <th className="text-left p-2">Usuario</th>
                          <th className="text-left p-2">ResultGeneral</th>
                          <th className="text-center p-2">MejorPrueba</th>
                          <th className="text-left p-2">PeorPrueba</th>
                          <th className="text-center p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDiagnostics.map((diagnostic) => (
                          <tr key={diagnostic.id} className="border-b">
                            <td className="p-2">{diagnostic.id}</td>
                            <td className="p-2">{diagnostic.Empresa}</td>
                            <td className="p-2">{diagnostic.resultGeneralD}</td>
                            <td className="p-2">{diagnostic.Dominprueba}</td>
                            <td className="p-2">{diagnostic.Peorprueva}</td>
                            <td className="p-2">
                              <Button variant="ghost" className="mr-2" onClick={() => router.push(`/InicioSeccion/usuario/diagnostico/result?diagnosisId=${diagnostic.id}`)}>
                                <FileText className="h-4 w-4 mr-1" /> Ver
                              </Button>
                              <DeleteDiagnosticDialog isOpen={isDeleteDiagnosticDialogOpen === diagnostic.id} onOpenChange={(isOpen) => setIsDeleteDiagnosticDialogOpen(isOpen ? diagnostic.id : null)} id={diagnostic.id} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="empres">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Empresas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        placeholder={`Buscar por ${filterEmpres}...`}
                        value={searchTermEmpress}
                        onChange={e => setSearchTermEmpress(e.target.value)}
                        className="border p-2 rounded"
                      />
                      <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                    </div>
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterEmpres}
                        onChange={(e) => setFilterEmpres(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {EmpresasDiagnosticRRR.length > 0 &&
                          Object.keys(EmpresasDiagnosticRRR[0]).map((key) => (
                            <option value={key} key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <SquareMinus className="text-[#4E9419] mr-2" />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={filterRange[0] || ''}
                        onChange={e => setFilterRange([e.target.value || null, filterRange[1]])}
                        className="border p-2 rounded w-20"
                      />
                    <SquarePlus className="text-[#4E9419] mr-2" />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={filterRange[1] || ''}
                        onChange={e => setFilterRange([filterRange[0], e.target.value || null])}
                        className="border p-2 rounded w-20"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">IdE</th>
                          <th className="text-left p-2">Empresa</th>
                          <th className="text-left p-2">Sector</th>
                          <th className="text-left p-2">ResultGeneral</th>
                          <th className="text-center p-2">MejorPrueba</th>
                          <th className="text-left p-2">PeorPrueba</th>
                          <th className="text-center p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEmpress.map((diagnostic) => (
                          <tr key={diagnostic.id} className="border-b">
                            <td className="p-2">{diagnostic.id}</td>
                            <td className="p-2">{diagnostic.Empresa}</td>
                            <td className="p-2">{diagnostic.sector}</td>
                            <td className="p-2">{diagnostic.resultGeneralD}</td>
                            <td className="p-2">{diagnostic.Dominprueba}</td>
                            <td className="p-2">{diagnostic.Peorprueva}</td>
                            <td className="p-2">
                              <UpdateDialog isOpen={isUpdateCompanyDialogOpen === diagnostic.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? diagnostic.id : null)} id={diagnostic.id} />
                              <DeleteEmpresDialog isOpen={isDeleteEmpresDialogOpen === diagnostic.id} onOpenChange={(isOpen) => setIsDeleteEmpresDialogOpen(isOpen ? diagnostic.id : null)} id={diagnostic.id} empresName={diagnostic.Empresa} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tests">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Área</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center flex-grow">
                      <input
                        type="text"
                        placeholder={`Buscar por ${filterPrue}...`}
                        value={searchTermTests}
                        onChange={e => setSearchTermTests(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterPrue}
                        onChange={(e) => setFilterPrue(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {TestListR.length > 0 &&
                          Object.keys(TestListR[0]).map((key) => (
                            <option value={key} key={key}>
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                    <SquareMinus className="text-[#4E9419] mr-2" />
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Mínimo"
                        value={filterRange[0] || ''}
                        onChange={e => setFilterRange([e.target.value || null, filterRange[1]])}
                        className="border p-2 rounded w-20"
                      />
                    <SquarePlus className="text-[#4E9419] mr-2" />
                      <input
                        type="number"
                        placeholder="Máximo"
                        value={filterRange[1] || ''}
                        onChange={e => setFilterRange([filterRange[0], e.target.value || null])}
                        className="border p-2 rounded w-20"
                      />
                    </div>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Id Área</th>
                          <th className="text-left p-2">Id Diagnóstico</th>
                          <th className="text-left p-2">Número</th>
                          <th className="text-left p-2">Resultado</th>
                          <th className="text-left p-2">NombreÁrea</th>
                          <th className="text-center p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTests.map((test) => (
                          <tr key={test.id} className="border-b">
                            <td className="p-2">{test.id}</td>
                            <td className="p-2">{test.idD}</td>
                            <td className="p-2">{test.numero}</td>
                            <td className="p-2">{test.resultado}</td>
                            <td className="p-2">{test.nombre}</td>
                            <td className="p-2">
                              <DeleteAreasDialog isOpen={isDeleteAreasDialopgOen === test.id} onOpenChange={(isOpen) => setIsDeleteAreasDialogOpen(isOpen ? test.id : null)} id={test.id} testName={test.name} />
                              <UpdateAreasDialog isOpen={isUpdateAreasDialogOpen === test.id} onOpenChange={(isOpen) => setIsUpdateAreasDialogOpen(isOpen ? test.id : null)} id={test.id} />
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
                <CardTitle>Análisis por Áreas</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Pruebas" dataKey="A" stroke="#4E9419" fill="#4E9419" fillOpacity={0.6} />

                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>



            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones de Análisis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="bg-[#4E9419] text-white " onClick={() => router.push('/InicioSeccion/admin/UserAd')}>
                    <Users className="mr-2 h-4 w-4" /> Ver Usuarios
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/DiagnAd')}>
                    <FileText className="mr-2 h-4 w-4" /> Ver Diagnosticos
                  </Button>
                  <Button className="bg-[#4E9419] text-white " onClick={() => router.push('/InicioSeccion/admin/ExportAd')}>
                    <FileOutput className="mr-2 h-4 w-4" /> Generar Informe
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/SoportAd')}>
                    <Briefcase className="mr-2 h-4 w-4" /> Andministrar Empresas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Puntos Clave</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[200px]">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingUp className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Tasa de finalización</p>
                        <p className="text-sm text-gray-600">El {porcentajeD}% de los diagnósticos iniciados se completan exitosamente.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <TrendingDown className="h-6 w-6 text-[#FF6B6B] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Área de mejora: {descriptionMasBajoArea}</p>
                        <p className="text-sm text-gray-600">Es necesario mejorar en los siguientes aspectos el Área de {descriptionMasBajoArea} del diagnóstico empresarial. Identificar estas áreas permitirá optimizar los resultados y fortalecer el rendimiento general de las empresas.</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0">
                        <Target className="h-6 w-6 text-[#4E9419] mr-2" />
                      </div>
                      <div>
                        <p className="text-[#2C5234] font-semibold">Crecimiento de diagnóstico</p>
                        <p className="text-sm text-gray-600">El número de diagnósticos creados ha aumentado en un {Math.floor(porcentajeAumento)}%.</p>
                      </div>
                    </li>
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalysisDashboard;