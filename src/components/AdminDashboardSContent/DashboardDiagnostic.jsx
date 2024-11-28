"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import NewDiagnosticDialog from '@/components/AdminDashboardSContent/DialogAgregarDiagnostico';
import DeleteDialog from '@/components/AdminDashboardSContent/DeleteDiagnosticDialog'
import NewUserDialog from '@/components/AdminDashboardSContent/DialogAgregarUsers';
import {
  ClipboardList,
  BarChart2,
  RefreshCcw,
  Search,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Plus,
  Download,
  Trash2,
  Briefcase
} from 'lucide-react';
import {
  PieChart,
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
  Pie,
  Cell,
  LabelList
} from 'recharts';
import { useRouter } from 'next/navigation';

const DiagnosticManagementDashboard = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNewUserDialogOpen, setIsNewUserDialogOpen] = useState(false)
  const [isNewDiagnosticDialogOpen, setIsNewDiagnosticDialogOpen] = useState(false)
  const [isDeleteDiagnosticDialogOpen, setIsDeleteDiagnosticDialogOpen] = useState(null)


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
    diagnosticosPendientes,
    diagnosticosCompletados,
    monthlyDiagnosticsData,
    ResultadoGeneralMasAlto,
    EmpresasDiagnosticRR,
    resultadosPromedio,
    promedioAreaMasBajo,
    promedioAreaMasAlto,
    descriptionMasBajoArea,
    descriptionMasAltoArea

  } = dashboardData;


  const porcentajeDiagCompletados = Math.floor(totalDiagnosticos > 0 ? (diagnosticosCompletados / totalDiagnosticos) * 100 : 0);

  const porcentajeDiagPendientes = Math.floor(totalDiagnosticos > 0 ? (diagnosticosPendientes / totalDiagnosticos) * 100 : 0);

  const diagnosticStatusData = [
    { name: 'Completados', value: diagnosticosCompletados },
    { name: 'Pendientes', value: diagnosticosPendientes },
  ];


  const COLORS = ['#4E9419', '#FF6B6B'];

  // const monthlyDiagnosticsData = [
  //   { name: 'Ene', diagnosticos: 50 },
  //   { name: 'Feb', diagnosticos: 80 },
  //   { name: 'Mar', diagnosticos: 120 },
  //   { name: 'Abr', diagnosticos: 90 },
  //   { name: 'May', diagnosticos: 110 },
  //   { name: 'Jun', diagnosticos: 150 },
  // ];

  const sectorDistributionData = resultadosPromedio;



  const filteredDiagnostics = EmpresasDiagnosticRR.filter(diagnostic =>
    diagnostic && // Verifica que diagnostic no sea null o undefined
    (
      diagnostic.id.toString().includes(searchTerm.toLowerCase()) ||
      diagnostic.Empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnostic.sector?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnostic.resultGeneralD?.toString().includes(searchTerm) ||
      diagnostic.Dominprueba?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      diagnostic.Peorprueba?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );



  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-x-hidden overflow-y-auto animated-gradient">
        <div className="container mx-auto px-6 py-8">
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Diagnósticos Empresariales</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalDiagnosticos}</p>
                    <p className="text-[#4E9419]">+{totalDiagnosticosUltimoMes} este mes</p>
                  </div>
                  <ClipboardList className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Diagnósticos Completados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{diagnosticosCompletados}</p>
                    <p className="text-[#4E9419]">{porcentajeDiagCompletados}% del total</p>
                  </div>
                  <CheckCircle className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Diagnósticos en Pendiente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{diagnosticosPendientes}</p>
                    <p className="text-[#4E9419]">{porcentajeDiagPendientes}% del total</p>
                  </div>
                  <Clock className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="text-[#2C5234]">Búsqueda de Diagnósticos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Search className="text-[#4E9419]" />
                <Input
                  type="text"
                  placeholder="Buscar por empresa, sector o estado..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="list" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="list">Lista de Diagnósticos</TabsTrigger>
              <TabsTrigger value="status">Estado de Diagnósticos</TabsTrigger>
              <TabsTrigger value="sectors">Distribución por Áreas</TabsTrigger>
            </TabsList>
            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <CardTitle>Gestión de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-end mb-4">
                    <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                  </div>
                  <div className="flex justify-end mb-4">
                    <Button className="bg-[#4E9419] text-white " onClick={() => router.push('/InicioSeccion/admin/DiagnAd')}>
                      <RefreshCcw className="mr-0 h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[400px]">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">IdD</th>
                          <th className="text-left p-2">Empresa</th>
                          <th className="text-left p-2">Sector</th>
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
                            <td className="p-2">{diagnostic.sector}</td>
                            <td className="p-2">{diagnostic.resultGeneralD}</td>
                            <td className="p-2">{diagnostic.Dominprueba}</td>
                            <td className="p-2">{diagnostic.Peorprueba}</td>
                            <td className="p-2">
                              <Button variant="ghost" className="mr-2" onClick={() => router.push(`/InicioSeccion/admin/DiagnAd/result?diagnosisId=${diagnostic.id}`)}>
                                <FileText className="h-4 w-4 mr-1" /> Ver
                              </Button>
                              <DeleteDialog isOpen={isDeleteDiagnosticDialogOpen === diagnostic.id} onOpenChange={(isOpen) => setIsDeleteDiagnosticDialogOpen(isOpen ? diagnostic.id : null)} id={diagnostic.id} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="status">
              <Card>
                <CardHeader>
                  <CardTitle>Estado de Diagnósticos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={diagnosticStatusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {diagnosticStatusData.map((entry, index) => (
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
            <TabsContent value="sectors">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-[#2C5234]">Distribución por Promedio Entre Áreas</CardTitle>
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
                      <Bar dataKey="promedio" fill="#4E9419">
                        <LabelList dataKey="promedio" position="right" fill="#2C5234" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <NewDiagnosticDialog isOpen={isNewDiagnosticDialogOpen} onOpenChange={setIsNewDiagnosticDialogOpen} onSubmit={handleNewDiagnostic} />
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/ExportAd')} >
                    <Download className="mr-2 h-4 w-4" /> Exportar Informes
                  </Button>
                  <Button className="bg-[#4E9419] text-white" onClick={() => router.push('/InicioSeccion/admin/SoportAd')}>
                    <Briefcase className="mr-2 h-4 w-4" /> Andministrar Empresas
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
                <CardTitle className="text-[#2C5234]">Estadísticas de Diagnósticos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Clock className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Resultado General Alto</p>
                      <p className="text-[#4E9419]">{ResultadoGeneralMasAlto}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Área Debil</p>
                      <p className="text-[#4E9419]">{descriptionMasBajoArea} ({Math.floor(promedioAreaMasBajo)})%</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PieChart className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Área Predominante</p>
                      <p className="text-[#4E9419]"> {descriptionMasAltoArea} ({Math.floor(promedioAreaMasAlto)}%)</p>
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

export default DiagnosticManagementDashboard;