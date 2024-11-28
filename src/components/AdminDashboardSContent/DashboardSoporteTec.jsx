"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
// import NewCompanyDialog from '@/components/AdminDashboardSContent/DialogAgregarCompany';
import DeleteDialog from '@/components/AdminDashboardSContent/DeleteEmpresDialog'
import UpdateDialog from '@/components/AdminDashboardSContent/EditEmpresDialog'
import {
  Building2,
  Plus,
  BarChart2,
  Briefcase,
  Users,
  Filter,
  FileOutput,
  FileText,
  Factory,
  BookOpenCheck,
  SquareMinus,
  SquarePlus

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

const CompanyManagementDashboard = () => {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isNewCompanyDialogOpen, setIsNewCompanyDialogOpen] = useState(false)
  const [filterEmpres, setFilterEmpres] = useState("all");
  const [searchTermEmpres, setSearchTermEmpres] = useState("");
  const [filterEmpres2, setFilterEmpres2] = useState("all");
  const [searchTermEmpres2, setSearchTermEmpres2] = useState("");
  const [filterEmpres3, setFilterEmpres3] = useState("all");
  const [searchTermEmpres3, setSearchTermEmpres3] = useState("");
  const [filterEmpres4, setFilterEmpres4] = useState("all");
  const [searchTermEmpres4, setSearchTermEmpres4] = useState("");
  const [filterRange, setFilterRange] = useState([null, null]);
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
    `;
    document.head.appendChild(styleElement);
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const handleNewCompany = (event) => {
    event.preventDefault()
    console.log("Creating new company")
    setIsNewCompanyDialogOpen(false)
  }

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (!dashboardData) {
    return <p>Error al cargar los datos</p>;
  }
  const {
    totalEmpresas,
    totalEmpresasUltimoMes,
    totalEmpresasSemana,
    porcentajeEmpresasActivasSemana,
    empresasFormated,
    empresasFormated2,
    empresasFormated3,
    empresasFormated4,
    tipoConMayorSeleccion,
    sectorConMayorSeleccion,
    empresasConEmailAutorizado,
    empresasPorSector,
    numeroDeSectores,
    EmpresActivity
  } = dashboardData;


  const empresas = empresasFormated;
  const empresas2 = empresasFormated2;
  const empresas3 = empresasFormated3;
  const empresas4 = empresasFormated4;



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

  // Ejemplo: Genera 10 colores infinitos
  const COLORS = getInfiniteColors(numeroDeSectores);

  //filtros
  const Empresas1Filtrados = empresas.filter(user => {
    const searchTermLowerCase = searchTermEmpres.toLowerCase();
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

  const Empresas2Filtrados = empresas2.filter(user => {
    const searchTermLowerCase = searchTermEmpres2.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterEmpres2 === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterEmpres2]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });
  const Empresas3Filtrados = empresas3.filter(user => {
    const searchTermLowerCase = searchTermEmpres3.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterEmpres3 === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterEmpres3]?.toString().toLowerCase();
      if (filterRange[0] !== null && filterRange[1] !== null) {
        const [min, max] = filterRange.map(val => parseFloat(val));
        return isInRange(value, min, max);
      }
      return value?.includes(searchTermLowerCase);
    }
  });
  const Empresas4Filtrados = empresas4.filter(user => {
    const searchTermLowerCase = searchTermEmpres4.toLowerCase();
    const isInRange = (value, min, max) => {
      const numericValue = parseFloat(value);
      return numericValue >= min && numericValue <= max;
    };
    if (filterEmpres4 === "all") {
      // Si el filtro es "all", buscamos en todas las llaves
      return Object.keys(user).some(key => {
        const value = user[key]?.toString().toLowerCase();
        return value?.includes(searchTermLowerCase);
      });
    } else {
      // Si hay un filtro específico, buscamos solo en la llave seleccionada
      const value = user[filterEmpres4]?.toString().toLowerCase();
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
          <h3 className="text-white text-3xl font-medium mb-4">Gestión de Empresas</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Total de Empresas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalEmpresas}</p>
                    <p className="text-[#4E9419]">+{totalEmpresasUltimoMes} nuevas este mes</p>
                  </div>
                  <Building2 className="h-12 w-12 text-[#4E9419]" />
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
                    <p className="text-3xl font-semibold text-[#2C5234]">{Math.floor(porcentajeEmpresasActivasSemana * totalEmpresas / 100)}</p>
                    <p className="text-[#4E9419]">{Math.floor(porcentajeEmpresasActivasSemana)}% Empresas activas en la semana</p>
                  </div>
                  <Briefcase className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Empresas Registradas </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-semibold text-[#2C5234]">{totalEmpresasSemana}</p>
                    <p className="text-[#4E9419]">En los últimos 7 días</p>
                  </div>
                  <Plus className="h-12 w-12 text-[#4E9419]" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="companies" className="bg-white/90 backdrop-blur-sm rounded-lg p-4">
            <TabsList>
              <TabsTrigger value="companies">Lista de Empresas</TabsTrigger>
              <TabsTrigger value="Contac">Info Contacto</TabsTrigger>
              <TabsTrigger value="Financiero">Info Financiera</TabsTrigger>
              <TabsTrigger value="Operacion">Info de Operación</TabsTrigger>
              <TabsTrigger value="sectors">Empresas por Sector</TabsTrigger>
            </TabsList>
            <TabsContent value="companies">
              <Card>
                <CardHeader>
                  <CardTitle>Informacion De Identificador</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center flex-grow">

                      <input
                        type="text"
                        placeholder={`Buscar por ${filterEmpres}...`}
                        value={searchTermEmpres}
                        onChange={e => setSearchTermEmpres(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>
                    {/* Filter Dropdown */}
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterEmpres}
                        onChange={(e) => setFilterEmpres(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {empresas.length > 0 &&
                          Object.keys(empresas[0]).map((key) => (
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
                          <th className="text-left p-2">Nit</th>
                          <th className="text-left p-2">Nombre</th>
                          <th className="text-left p-2">TipoEmpresa</th>
                          <th className="text-left p-2">Sector</th>
                          <th className="text-left p-2">AñoFundacion</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Empresas1Filtrados.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.nit}</td>
                            <td className="p-2">{user.nombre}</td>
                            <td className="p-2">{user.tipoEmpresa}</td>
                            <td className="p-2">{user.sector}</td>
                            <td className="p-2">{user.AñoFundacion}</td>
                            <td className="p-2">
                              <UpdateDialog isOpen={isUpdateCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} />
                              <DeleteDialog isOpen={isDeleteCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} empresName={user.nombre} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Contac">
              <Card>
                <CardHeader>
                  <CardTitle>Informacion De Contacto</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center flex-grow">

                      <input
                        type="text"
                        placeholder={`Buscar por ${filterEmpres2}...`}
                        value={searchTermEmpres2}
                        onChange={e => setSearchTermEmpres2(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>
                    {/* Filter Dropdown */}
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterEmpres2}
                        onChange={(e) => setFilterEmpres2(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {empresas2.length > 0 &&
                          Object.keys(empresas2[0]).map((key) => (
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
                          <th className="text-left p-2">CorreoContacto</th>
                          <th className="text-left p-2">NombreContacto</th>
                          <th className="text-left p-2">Autorizacion</th>
                          <th className="text-left p-2">Ubicacion</th>
                          <th className="text-left p-2">UsuarioRelacionado</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Empresas2Filtrados.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.correocontac}</td>
                            <td className="p-2">{user.nombrecontac}</td>
                            <td className="p-2">{user.Autoriza}</td>
                            <td className="p-2">{user.Ubicacion}</td>
                            <td className="p-2">{user.userId}</td>
                            <td className="p-2">
                              <UpdateDialog isOpen={isUpdateCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} />
                              <DeleteDialog isOpen={isDeleteCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} empresName={user.id} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Financiero">
              <Card>
                <CardHeader>
                  <CardTitle>Informacion Financiera</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center flex-grow">

                      <input
                        type="text"
                        placeholder={`Buscar por ${filterEmpres3}...`}
                        value={searchTermEmpres3}
                        onChange={e => setSearchTermEmpres3(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>
                    {/* Filter Dropdown */}
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterEmpres3}
                        onChange={(e) => setFilterEmpres3(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {empresas3.length > 0 &&
                          Object.keys(empresas3[0]).map((key) => (
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
                          <th className="text-left p-2">IngresosAnuales</th>
                          <th className="text-left p-2">ActivosActuales</th>
                          <th className="text-left p-2">Patrimonio</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Empresas3Filtrados.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.nombre}</td>
                            <td className="p-2">{user.ingresoA}</td>
                            <td className="p-2">{user.ActivosActuales}</td>
                            <td className="p-2">{user.patrimonio}</td>
                            <td className="p-2">
                              <UpdateDialog isOpen={isUpdateCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} />
                              <DeleteDialog isOpen={isDeleteCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} empresName={user.nombre} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="Operacion">
              <Card>
                <CardHeader>
                  <CardTitle>Informacion de Operacion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                    <div className="flex items-center flex-grow">

                      <input
                        type="text"
                        placeholder={`Buscar por ${filterEmpres4}...`}
                        value={searchTermEmpres4}
                        onChange={e => setSearchTermEmpres4(e.target.value)}
                        className="border p-2 rounded"
                      />
                    </div>
                    {/* Filter Dropdown */}
                    <div className="flex items-center">
                      <Filter className="text-[#4E9419] mr-2" />
                      <select
                        value={filterEmpres4}
                        onChange={(e) => setFilterEmpres4(e.target.value)}
                        className="border border-gray-300 rounded-md p-2"
                      >
                        <option value="all">Todos</option>
                        {empresas4.length > 0 &&
                          Object.keys(empresas4[0]).map((key) => (
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
                          <th className="text-left p-2">NumeroEmpleados</th>
                          <th className="text-left p-2">CanalesDistribucion</th>
                          <th className="text-left p-2">PrincipalesClientes</th>
                          <th className="text-left p-2">TecnologiaUtilizada</th>
                          <th className="text-left p-2">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Empresas4Filtrados.map((user) => (
                          <tr key={user.id} className="border-b">
                            <td className="p-2">{user.id}</td>
                            <td className="p-2">{user.nombre}</td>
                            <td className="p-2">{user.numeroEmple}</td>
                            <td className="p-2">{user.CanalesDist}</td>
                            <td className="p-2">{user.PrincipalesCli}</td>
                            <td className="p-2">{user.Tecnologi}</td>
                            <td className="p-2">
                              <UpdateDialog isOpen={isUpdateCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsUpdateCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} />
                              <DeleteDialog isOpen={isDeleteCompanyDialogOpen === user.id} onOpenChange={(isOpen) => setIsDeleteCompanyDialogOpen(isOpen ? user.id : null)} id={user.id} empresName={user.nombre} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sectors">
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
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
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

            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-[#2C5234]">Acciones Rápidas</CardTitle>
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
                <CardTitle className="text-[#2C5234]">Estadísticas de Empresas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Building2 className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Tipo Empresa Mayor Seleccion</p>
                      <p className="text-[#4E9419]">es {tipoConMayorSeleccion}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    < Factory className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Sectoy Mayor Seleccion</p>
                      <p className="text-[#4E9419]">es {sectorConMayorSeleccion}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <BookOpenCheck className="h-6 w-6 text-[#4E9419] mr-2" />
                    <div>
                      <p className="text-[#2C5234] font-semibold">Cantidad de Empresas que Autorizan</p>
                      <p className="text-[#4E9419]"> {empresasConEmailAutorizado}</p>
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

export default CompanyManagementDashboard;