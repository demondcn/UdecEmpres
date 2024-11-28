import { PrismaClient } from '@prisma/client';
import Email from 'next-auth/providers/email';

const prisma = new PrismaClient();

export async function GET(request) {
    try {
        // Total de diagnósticos
        const totalDiagnosticos = await prisma.diagnosis.count();

        // Total de diagnósticos creados el último mes
        const fechaUltimoMes = new Date();
        fechaUltimoMes.setMonth(fechaUltimoMes.getMonth() - 1);
        const totalEmpresasUltimoMes = await prisma.empresa.count({
            where: {
                createdAt: {
                    gte: fechaUltimoMes,
                },
            },
        });
        const totalDiagnosticosUltimoMes = await prisma.diagnosis.count({
            where: {
                createdAt: {
                    gte: fechaUltimoMes,
                },
            },
        });
        // Cantidad de empresas activas
        const totalEmpresasActivas = await prisma.empresa.count({
            where: {
                estado: 'Activo',
            },
        });

        // Porcentaje de últimas empresas activas hace una semana
        const fechaUnaSemana = new Date();
        fechaUnaSemana.setDate(fechaUnaSemana.getDate() - 7);
        const empresasActivasSemana = await prisma.empresa.count({
            where: {
                estado: 'Activo',
                createdAt: {
                    gte: fechaUnaSemana,
                },
            },
        });
        //porcentaje de usuarios activos hace esta semana

        const UsuariosActivosSemana = await prisma.user.count({
            where: {
                updatedAt: {
                    gte: fechaUnaSemana,
                },
            },
        });



        //total usuarios activos en la semana
        const totalUsersSemana = await prisma.user.count({
            where: {
                createdAt: {
                    gte: fechaUnaSemana,
                },
            },
        });

        const totalEmpresasSemana = await prisma.empresa.count({
            where: {
                createdAt: {
                    gte: fechaUnaSemana,
                },
            },
        });
        // Total de usuarios registrados
        const totalUsuarios = await prisma.user.count();

        const porcentajeUsuariosActivosSeman = totalUsersSemana > 0 ? (UsuariosActivosSemana / totalUsuarios) * 100 : 0;
        const porcentajeEmpresasActivasSemana = totalEmpresasSemana > 0 ? (empresasActivasSemana / totalEmpresasSemana) * 100 : 0;




        // Porcentaje de registros de usuarios del último mes
        const totalUsuariosUltimoMes = await prisma.user.count({
            where: {
                createdAt: {
                    gte: fechaUltimoMes,
                },
            },
        });
        const porcentajeUsuariosUltimoMes = totalUsuarios > 0 ? (totalUsuariosUltimoMes / totalUsuarios) * 100 : 0;
        const usuariosNuevos = totalUsuariosUltimoMes;




        // Cantidad total de diagnósticos en status "pending" y "completed"
        const diagnosticosPendientes = await prisma.diagnosis.count({
            where: {
                status: 'Pending',
            },
        });
        const diagnosticosCompletados = await prisma.diagnosis.count({
            where: {
                status: 'Completate',
            },
        });


        // Crear notificaciones
        const notificaciones = [];
        const diagnosticos = await prisma.diagnosis.findMany({
            orderBy: {
                updatedAt: 'desc',
            },
            take: totalDiagnosticos, // Número de notificaciones a mostrar
        });

        diagnosticos.forEach(diagnostico => {
            const ahora = new Date();
            const tiempoDesdeActualizacion = ahora - new Date(diagnostico.updatedAt);

            // Convertir el tiempo transcurrido a años, meses, días y horas
            const horasTotales = Math.floor(tiempoDesdeActualizacion / (1000 * 60 * 60));
            const años = Math.floor(horasTotales / (24 * 365));
            const meses = Math.floor((horasTotales % (24 * 365)) / (24 * 30));
            const días = Math.floor((horasTotales % (24 * 30)) / 24);
            const horas = horasTotales % 24;

            let hace = '';
            if (años > 0) hace += `${años} año${años > 1 ? 's' : ''} `;
            if (meses > 0) hace += `${meses} mes${meses > 1 ? 'es' : ''} `;
            if (días > 0) hace += `${días} día${días > 1 ? 's' : ''} `;
            if (horas > 0) hace += `${horas} hora${horas > 1 ? 's' : ''} `;

            notificaciones.push({
                id: diagnostico.id,
                mensaje: `Alerta de diagnóstico ${diagnostico.status === 'Pending' ? 'pendiente' : 'completado'}`,
                hace: hace.trim() || 'menos de una hora',
            });
        });

        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3);
        // Consultar los datos
        const barChartData = await prisma.diagnosis.groupBy({
            by: ['createdAt', 'status'],
            _count: {
                status: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        // Crear un mapa para acumular los conteos de cada mes
        const countsMap = barChartData.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = { completados: 0, pendientes: 0 };
            }
            if (item.status === 'Completate') {
                acc[monthYear].completados += item._count.status;
            } else if (item.status === 'Pending') {
                acc[monthYear].pendientes += item._count.status;
            }
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden descendente
        const sortedKeys = Object.keys(countsMap).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth));
        });

        // Formatear los datos para el gráfico
        const formattedBarChartData1 = sortedKeys.map((key) => ({
            name: key,
            completados: countsMap[key].completados,
            pendientes: countsMap[key].pendientes,
        }));


        const formattedBarChartData = formattedBarChartData1.slice().reverse();

        const empresasActivasPorMes = await prisma.empresa.groupBy({
            by: ['createdAt'],
            _count: {
                estado: true,
            },
            where: {
                createdAt: {
                    gte: startDate,
                    lte: endDate,
                },
                estado: 'Activo',  // Solo toma empresas en estado "Activo"
            },
        });

        // Crear un mapa para acumular el conteo de empresas activas por mes
        const countsMapEmpres = empresasActivasPorMes.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' });
            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += item._count.estado;  // Acumula el conteo de empresas activas
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysEmpres = Object.keys(countsMapEmpres).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedLineChartData1 = sortedKeysEmpres.map((key) => ({
            name: key,
            empresasActivas: countsMapEmpres[key],
        }));
        const formattedLineChartData = formattedLineChartData1.slice().reverse();



        // Información de usuarios, incluyendo su empresa vinculada
        const usuariosConEmpresa = await prisma.user.findMany({
            include: {
                empresas: {
                    select: {
                        nombre: true,
                    },
                },
            },
        });

        // Información de empresa, nombre, fecha de registro, estado del último diagnóstico
        const empresasConDiagnostico = await prisma.empresa.findMany({
            include: {
                user: {
                    include: {
                        diagnoses: {
                            orderBy: {
                                createdAt: 'desc',
                            },
                            take: 1,
                            select: {
                                status: true,
                            },
                        },
                    },
                },
            },
        });

        //diagnosticos por mes:


        // Información sobre el tiempo de diagnóstico en status "pending"
        const diagnosticosPendientesConTiempo = await prisma.diagnosis.findMany({
            where: {
                status: 'Pending',
            },
            select: {
                createdAt: true,
            },
        });


        const currentDate = new Date();
        const tiemposPendientes = diagnosticosPendientesConTiempo.map(diagnostico => {
            const tiempo = Math.floor((currentDate - new Date(diagnostico.createdAt)) / (1000 * 60 * 60 * 24)); // Diferencia en días
            return tiempo;
        });
        const totalEmpresas = await prisma.empresa.count();
        const empresas = await prisma.empresa.findMany({
            orderBy: {
                createdAt: 'desc', // Ordenar por la fecha de creación en orden descendente
            },
            take: totalEmpresas, // Limitar el número de empresas a 10
        });

        const convertBooleanToYesNo = (value) => {
            return value ? "Sí" : "No";
        };
        // Formatear los datos de las empresas
        const empresasFormateadasplus = empresas.map(empresa => ({
           id: empresa.id,
           nombre: empresa.nombre,
           estado: empresa.estado,
           sector: empresa.sector,
           userId: empresa.userId,
           fechaCreaccion: empresa.createdAt.toLocaleDateString(),
           fechaActualizacion: empresa.updatedAt.toLocaleDateString(),
           ActivosActuales: empresa.activosTotales,
           AñoFundacion: empresa.anoFundacion,
           CanalesDist: empresa.canalesDistribucion,
           CorreoContac: empresa.correoElectronico,
           Autorized: convertBooleanToYesNo(empresa.emailAuthorization),
           ingresoA: empresa.ingresosAnuales,
           nit: empresa.nit,
           nombreContacto: empresa.nombreContacto,
           numeroEmple: empresa.numeroEmpleados,
           patrimonio: empresa.patrimonio,
           principalesClien: empresa.principalesClientes,
           tecnologiUtili: empresa.tecnologiaUtilizada,
           telefono: empresa.telefonos,
           tipoEmpresa: empresa.tipoEmpresa,
           ubicacion: empresa.ubicacion
       }));
        //
        const empresasFormateadas = empresas.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            fecha: empresa.createdAt.toLocaleDateString(), // Formatear la fecha
            estado: empresa.estado,
            sector: empresa.sector,
            tipeEmp: empresa.tipoEmpresa,
            Autorized: convertBooleanToYesNo(empresa.emailAuthorization),
        }));
        const empresasFormated = empresas.map(empresa => ({
            id: empresa.id,
            nit: empresa.nit,
            nombre: empresa.nombre,
            tipoEmpresa: empresa.tipoEmpresa,
            sector: empresa.sector,
            AñoFundacion: empresa.anoFundacion
        }));
        const empresasFormated2 = empresas.map(empresa => ({
            id: empresa.id,
            correocontac: empresa.correoElectronico,
            nombrecontac: empresa.nombreContacto,
            Autoriza: convertBooleanToYesNo(empresa.emailAuthorization),
            Ubicacion: empresa.ubicacion,
            userId: empresa.userId
        }));
        const empresasFormated3 = empresas.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            ingresoA: empresa.ingresosAnuales,
            ActivosActuales: empresa.activosTotales,
            patrimonio: empresa.patrimonio,
        }));
        const empresasFormated4 = empresas.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            numeroEmple: empresa.numeroEmpleados,
            CanalesDist: empresa.canalesDistribucion,
            PrincipalesCli: empresa.principalesClientes,
            Tecnologi: empresa.tecnologiaUtilizada
        }));

        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                _count: {
                    select: {
                        diagnoses: true, // Contar el número de diagnósticos asociados
                    },
                },
            },
        });

        // Formatear los datos para enviar al frontend
        const usuariosFormateados = users.map(user => ({
            id: user.id,
            nombre: user.name,
            email: user.email,
            nD: user._count.diagnoses, // Número de diagnósticos
        }));
        const usersManage = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                _count: {
                    select: {
                        diagnoses: true, // Contar el número de diagnósticos asociados
                    },
                },
                updatedAt: true, // Incluir updatedAt en la consulta
            },
        });



        const usersFormated = usersManage.map(user => ({
            id: user.id,
            nombre: user.name,
            email: user.email,
            nD: user._count.diagnoses, // Número de diagnósticos
            lastActive: user.updatedAt.toLocaleDateString(), // Última fecha de actualización
        }))

        const usersFormatedFix = usersManage.map(user => ({
            id: user.id,
            nombre: user.name,
            email: user.email,
            nD: user._count.diagnoses, // Número de diagnósticos
            UltimaActividad: user.updatedAt.toLocaleDateString(), // Última fecha de actualización
        }))


        const EmpresasCreadoPorMes = await prisma.empresa.groupBy({
            by: ['createdAt'],
            _count: {
                id: true, // Contamos el número de usuarios
            },
            where: {
                createdAt: {
                    gte: startDate, // Desde la fecha de inicio
                    lte: endDate,   // Hasta la fecha actual
                },
            },
        });

        // Crear un mapa para acumular el conteo de usuarios creados por mes y año
        const countsMapEmpresS = EmpresasCreadoPorMes.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' }); // Formateamos como "Mes Año"
            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += item._count.id; // Acumula el conteo de usuarios
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysEmpresS = Object.keys(countsMapEmpresS).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedLineChartEmpresS = sortedKeysEmpresS.map((key) => ({
            name: key,
            nuevasEmpresas: countsMapEmpresS[key],
        }));

        // Invertir los datos si es necesario para mostrar desde la fecha más reciente
        const EmpresActivity = formattedLineChartEmpresS.slice().reverse();
        const usuariosCreadoPorMes = await prisma.user.groupBy({
            by: ['createdAt'],
            _count: {
                id: true, // Contamos el número de usuarios
            },
            where: {
                createdAt: {
                    gte: startDate, // Desde la fecha de inicio
                    lte: endDate,   // Hasta la fecha actual
                },
            },
        });

        // Crear un mapa para acumular el conteo de usuarios creados por mes y año
        const countsMapUsers = usuariosCreadoPorMes.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' }); // Formateamos como "Mes Año"
            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += item._count.id; // Acumula el conteo de usuarios
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysUsers = Object.keys(countsMapUsers).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedLineChartData2 = sortedKeysUsers.map((key) => ({
            name: key,
            nuevosUsuarios: countsMapUsers[key],
        }));

        // Invertir los datos si es necesario para mostrar desde la fecha más reciente
        const userActivity = formattedLineChartData2.slice().reverse();










        const usuariosPorMes = await prisma.user.findMany({
            where: {
                updatedAt: {
                    gte: startDate, // Desde la fecha de inicio
                    lte: endDate,   // Hasta la fecha actual
                },
            },
            select: {
                id: true,
                updatedAt: true,
            },
        });

        // Crear un mapa para acumular el conteo de usuarios activos e inactivos por mes y año
        const countsMapUsersBar = usuariosPorMes.reduce((acc, item) => {
            // Extraer el mes/año del campo updatedAt
            const monthYear = item.updatedAt.toLocaleString('default', { month: 'short', year: 'numeric' });

            // Inicializar el contador si no existe para el mes y año
            if (!acc[monthYear]) {
                acc[monthYear] = { activos: 0, inactivos: 0 };
            }

            // Verificar si el usuario está activo o inactivo basado en el updatedAt
            if (item.updatedAt >= fechaUnaSemana && item.updatedAt <= endDate) {
                acc[monthYear].activos += 1; // Usuario activo
            } else {
                acc[monthYear].inactivos += 1; // Usuario inactivo
            }

            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysUsersBar = Object.keys(countsMapUsersBar).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedBarChartDataUser = sortedKeysUsersBar.map((key) => ({
            name: key,
            activos: countsMapUsersBar[key].activos,
            inactivos: countsMapUsersBar[key].inactivos,
        }));

        // Invertir los datos si es necesario para mostrar desde la fecha más reciente
        const userActivityBar = formattedBarChartDataUser.slice().reverse();

        const usersConDiagnoses = await prisma.user.count({
            where: {
                diagnoses: {
                    some: {}, // Asegura que el usuario tenga al menos un diagnóstico
                },
            },
        });
        const usersWithCompletedDiagnoses = await prisma.user.count({
            where: {
                diagnoses: {
                    some: {
                        status: 'Completate', // Filtra los diagnósticos completados
                    },
                },
            },
        });

        const usersNotAffiliated = await prisma.user.count({
            where: {
                empresas: {
                    none: {}, // Asegura que el usuario no esté afiliado a ninguna empresa
                },
            },
        });

        const diagnosticosPorMes = await prisma.diagnosis.groupBy({
            by: ['createdAt'],
            _count: {
                id: true, // Contamos el número de diagnósticos
            },

            where: {
                createdAt: {
                    gte: startDate, // Desde la fecha de inicio
                    lte: endDate,   // Hasta la fecha actual
                },
            },
        });
        // Crear un mapa para acumular el conteo de diagnósticos por mes y año
        const countsMapDiagnosticos = diagnosticosPorMes.reduce((acc, item) => {
            const monthYear = item.createdAt.toLocaleString('default', { month: 'short', year: 'numeric' }); // Formateamos como "Mes Año"
            if (!acc[monthYear]) {
                acc[monthYear] = 0;
            }
            acc[monthYear] += item._count.id; // Acumula el conteo de diagnósticos
            return acc;
        }, {});

        // Ordenar las claves de los meses en orden ascendente
        const sortedKeysDiagnosticos = Object.keys(countsMapDiagnosticos).sort((a, b) => {
            const [aMonth, aYear] = a.split(' ');
            const [bMonth, bYear] = b.split(' ');
            return (aYear - bYear) || (['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(aMonth) - ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(bMonth));
        });

        // Formatear los datos para el gráfico en el formato requerido
        const formattedLineChartDataDiagnosticos = sortedKeysDiagnosticos.map((key) => ({
            name: key,
            diagnosticos: countsMapDiagnosticos[key],
        }));

        const monthlyDiagnosticsData = formattedLineChartDataDiagnosticos.slice().reverse();

        const resultadoMasAlto = await prisma.test.findMany({
            orderBy: {
                result: 'desc'
            },
            take: 1
        });
        const mayorResultadoDescripcion = resultadoMasAlto[0]?.description || 'No hay datos';
        const mayorResultado = resultadoMasAlto[0]?.result || '0';


        const pruebaMenorResultado = await prisma.test.findMany({
            orderBy: {
                result: 'asc'
            },
            take: 1
        });

        const menorResultadoDescripcion = pruebaMenorResultado[0]?.description || 'No hay datos';
        const menorResultado = pruebaMenorResultado[0]?.result || '0';


        const diagnosticosS = await prisma.diagnosis.findMany({
            where: {
                status: 'Completate',
            },
            include: {
                tests: true
            }
        });

        // 2. Calcular el porcentaje para cada diagnóstico
        const resultadosD = diagnosticosS.map(diagnostico => {
            const totalPuntaje = 700; // Puntaje máximo
            const puntajeObtenido = diagnostico.tests.reduce((acc, test) => acc + test.result, 0);
            const porcentaje = (puntajeObtenido / totalPuntaje) * 100;

            return {
                id: diagnostico.id,
                descripcion: diagnostico.tests.map(test => test.description).join(', '), // Puedes ajustar esto si es necesario
                porcentaje
            };
        });

        // 3. Encontrar el diagnóstico con el porcentaje más alto
        const mejorResultado = resultadosD.reduce((prev, current) => {
            return (prev.porcentaje > current.porcentaje) ? prev : current;
        }, { porcentaje: -Infinity });

        const ResultadoGeneralMasAlto = Math.trunc(mejorResultado.porcentaje)

        const PieUserTest = await prisma.test.groupBy({
            by: ['description'],
            _max: {
                result: true,
            },
        });

        // Construir el objeto en el formato solicitado
        const testResulPie = PieUserTest.map(result => ({
            name: result.description,
            value: result._max.result,
        }));


        const DiagnosticEmpresList = await prisma.diagnosis.findMany({
            where: {
                status: 'Completate', // Verifica que este estado sea correcto
            },
            include: {
                user: {
                    include: {
                        empresas: true, // Incluimos la empresa vinculada al usuario
                    },
                },
                tests: true, // Incluimos las pruebas del diagnóstico
            },
        });


        const EmpresasDiagnosticR = DiagnosticEmpresList.map(diagnosis => {
            // Verificamos que haya pruebas y al menos una empresa vinculada
            if (!diagnosis.tests.length || !diagnosis.user.empresas.length) {
                // Si no hay pruebas o empresas, omitimos este diagnóstico
                return null;
            }

            const totalResultado = diagnosis.tests.reduce((sum, test) => sum + test.result, 0);
            const resultGeneralD = (totalResultado / 700) * 100;

            // Encontramos la prueba con mayor y menor resultado
            const DominPrueba = diagnosis.tests.reduce((prev, current) => (prev.result > current.result ? prev : current));
            const Peorprueva = diagnosis.tests.reduce((prev, current) => (prev.result < current.result ? prev : current));

            return {
                id: diagnosis.id,
                Empresa: diagnosis.user.empresas[0].nombre,  // Nombre de la empresa
                sector: diagnosis.user.empresas[0].sector,   // Sector de la empresa
                resultGeneralD: parseFloat(resultGeneralD.toFixed(2)), // Formateamos el resultado a 2 decimales
                Dominprueba: DominPrueba.description, // Descripción de la prueba con mayor resultado
                Peorprueba: Peorprueva.description,   // Descripción de la prueba con menor resultado
            };
        });

        const EmpresasDiagnosticRId = DiagnosticEmpresList.map(diagnosis => {
            // Verificamos que haya pruebas y al menos una empresa vinculada
            if (!diagnosis.tests.length || !diagnosis.user.empresas.length) {
                // Si no hay pruebas o empresas, omitimos este diagnóstico
                return null;
            }

            const totalResultado = diagnosis.tests.reduce((sum, test) => sum + test.result, 0);
            const resultGeneralD = (totalResultado / 700) * 100;

            // Encontramos la prueba con mayor y menor resultado
            const DominPrueba = diagnosis.tests.reduce((prev, current) => (prev.result > current.result ? prev : current));
            const Peorprueva = diagnosis.tests.reduce((prev, current) => (prev.result < current.result ? prev : current));

            return {
                id: diagnosis.user.empresas[0].id,  // ID de la empresa
                Empresa: diagnosis.user.empresas[0].nombre,  // Nombre de la empresa
                sector: diagnosis.user.empresas[0].sector,   // Sector de la empresa
                resultGeneralD: parseFloat(resultGeneralD.toFixed(2)), // Formateamos el resultado a 2 decimales
                Dominprueba: DominPrueba.description, // Descripción de la prueba con mayor resultado
                Peorprueva: Peorprueva.description,   // Descripción de la prueba con menor resultado
            };
        });

        // Filtramos los nulos
        const EmpresasDiagnosticRR = EmpresasDiagnosticR.filter(item => item !== null);
        const EmpresasDiagnosticRRR = EmpresasDiagnosticRId.filter(item => item !== null);

        const UsuariosDiagnosticR = DiagnosticEmpresList.map(diagnosis => {
            // Verificamos que haya pruebas
            if (!diagnosis.tests.length) {
                // Si no hay pruebas, omitimos este diagnóstico
                return null;
            }

            const totalResultado = diagnosis.tests.reduce((sum, test) => sum + test.result, 0);
            const resultGeneralD = (totalResultado / 700) * 100;

            // Encontramos la prueba con mayor y menor resultado
            const DominPrueba = diagnosis.tests.reduce((prev, current) => (prev.result > current.result ? prev : current));
            const Peorprueva = diagnosis.tests.reduce((prev, current) => (prev.result < current.result ? prev : current));

            return {
                id: diagnosis.id,
                Empresa: diagnosis.user.name,  // Nombre del usuario
                resultGeneralD: parseFloat(resultGeneralD.toFixed(2)), // Formateamos el resultado a 2 decimales
                Dominprueba: DominPrueba.description, // Descripción de la prueba con mayor resultado
                Peorprueva: Peorprueva.description   // Descripción de la prueba con menor resultado
            };
        });

        // Filtramos los nulos
        const UsuariosDiagnosticRR = UsuariosDiagnosticR.filter(item => item !== null);











        const testCounts = await prisma.test.groupBy({
            by: ['description'],
            _count: {
                id: true,
            },
        });

        // Transformar el resultado en el formato { name: '{description}', value: {cantidad} }
        const formattedResultsTestCounts = testCounts.map(test => ({
            name: test.description,
            cantidad: test._count.id,
        }));
        const completedDiagnosis = await prisma.diagnosis.findMany({
            where: {
                status: 'Completate', // Filtrar diagnósticos por estado completado
            },
            select: {
                id: true, // Seleccionar solo los IDs de los diagnósticos completados
            },
        });

        const completedDiagnosisIds = completedDiagnosis.map(d => d.id);
        const tests = await prisma.test.findMany({
            where: {
                diagnosisId: {
                    in: completedDiagnosisIds, // Filtrar tests asociados a los diagnósticos completados
                },
            },
            select: {
                description: true,
                result: true,
            },
        });
        const groupedData = tests.reduce((acc, test) => {
            const { description, result } = test;
            if (!acc[description]) {
                acc[description] = { subject: description, A: 0, count: 0 };
            }
            acc[description].A += result;  // Sumamos los resultados
            acc[description].count += 1;   // Contamos el número de pruebas en esa categoría
            return acc;
        }, {});
        // Convertimos el objeto agrupado en un array y calculamos el promedio.
        const radarData = Object.values(groupedData).map(data => ({
            subject: data.subject,
            A: data.A / data.count,  // Promedio de resultados
            fullMark: 100,           // Puedes ajustar el valor máximo esperado
        }));


        const TestListDiag = await prisma.diagnosis.findMany({
            include: {
                user: {
                    include: {
                        empresas: true, // Incluimos la empresa vinculada al usuario
                    },
                },
                tests: true, // Incluimos las pruebas del diagnóstico
            },
        });

        const TestList = TestListDiag.flatMap(diagnosis => {
            // Verificamos que haya pruebas
            if (!diagnosis.tests.length) {
                // Si no hay pruebas, omitimos este diagnóstico
                return [];
            }

            // Mapeamos cada test de este diagnóstico a un nuevo formato de objeto
            return diagnosis.tests.map(test => ({
                id: test.id,                // ID del test
                idD: diagnosis.id,          // ID del diagnóstico
                numero: test.number,        // Número del test
                resultado: test.result,        // Resultado del test
                nombre: test.description      // Descripción del test
            }));
        });
        const TestListR = TestList.filter(item => item !== null);



        const usersExport1 = await prisma.user.findMany({
            include: {
                empresas: true, // Incluir la relación con empresa
            },
        });

        const DiagnosticExport1 = await prisma.diagnosis.findMany({
            include: {
                user: true, // Incluir la relación con usuario
            },
        });

        const TextExport1 = await prisma.test.findMany({
            include: {
                diagnosis: true, // Incluir la relación con diagnóstico
            },
        });

        const EmpresExport1 = await prisma.empresa.findMany({
            include: {
                user: true, // Incluir la relación con usuario
            },
        });

        // Transforma los datos en el formato deseado
        const usersExport = usersExport1.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            nombreEmpresa: user.empresas[0]?.nombre || 'No asignado', // Supone que cada usuario tiene solo una empresa
            fechaCreacion: user.createdAt.toISOString().split('T')[0], // Ajusta el formato de fecha si es necesario
        }));

        const DiagnosticExport = DiagnosticExport1.map(diagnosis => ({
            id: diagnosis.id,
            userId: diagnosis.userId,
            status: diagnosis.status,
            fechaCreacion: diagnosis.createdAt.toISOString().split('T')[0],
        }));

        const TextExport = TextExport1.map(test => ({
            id: test.id,
            diagnosisId: test.diagnosisId,
            number: test.number,
            result: test.result,
            description: test.description,
            fechaCreacion: test.createdAt.toISOString().split('T')[0],
        }));

        const EmpresExport = EmpresExport1.map(empresa => ({
            id: empresa.id,
            nombre: empresa.nombre,
            estado: empresa.estado,
            sector: empresa.sector,
            userId: empresa.userId,
            fechaCreacion: empresa.createdAt.toISOString().split('T')[0],
        }));



        const completadosDiagnosticos = await prisma.diagnosis.findMany({
            where: {
                status: 'Completate',
            },
            include: {
                tests: true,
            },
        });

        // Creamos un objeto para acumular las sumas y conteos de resultados de tests por número
        const sumsAndCounts = {};

        completadosDiagnosticos.forEach(diagnosis => {
            diagnosis.tests.forEach(test => {
                const number = test.number;

                if (!sumsAndCounts[number]) {
                    sumsAndCounts[number] = { sum: 0, count: 0, description: test.description };
                }

                sumsAndCounts[number].sum += test.result;
                sumsAndCounts[number].count += 1;
            });
        });

        // Calculamos el promedio para cada número de test y formateamos el resultado
        const resultadosPromedio = Object.keys(sumsAndCounts).map(number => {
            const { sum, count, description } = sumsAndCounts[number];
            const promedio = sum / count;
            return {
                name: description,
                promedio: Math.floor(promedio),
            };
        });
        // Encontramos el promedio más bajo y el más alto
        const promedioMasBajoo = resultadosPromedio.reduce((min, item) => item.promedio < min.promedio ? item : min, resultadosPromedio[0]);
        const promedioMasAltoo = resultadosPromedio.reduce((max, item) => item.promedio > max.promedio ? item : max, resultadosPromedio[0]);
        const promedioAreaMasBajo = promedioMasBajoo.promedio
        const promedioAreaMasAlto = promedioMasAltoo.promedio
        // Descripciones correspondientes
        const descriptionMasBajoArea = promedioMasBajoo.name;
        const descriptionMasAltoArea = promedioMasAltoo.name;

        const fechaActual = new Date();
        const fechaInicioPeriodoActual = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
        const fechaInicioPeriodoAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth() - 1, 1);
        const fechaFinPeriodoAnterior = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 0); // Último día del mes anterior

        // Obtener número de diagnósticos en el período actual
        const diagnosticosActuales = await prisma.diagnosis.count({
            where: {
                createdAt: {
                    gte: fechaInicioPeriodoActual,
                },
            },
        });

        // Obtener número de diagnósticos en el período anterior
        const diagnosticosAnteriores = await prisma.diagnosis.count({
            where: {
                createdAt: {
                    gte: fechaInicioPeriodoAnterior,
                    lte: fechaFinPeriodoAnterior,
                },
            },
        });

        const tipoEmpresaMayorSeleccion = await prisma.empresa.groupBy({
            by: ['tipoEmpresa'],
            _count: {
                tipoEmpresa: true,
            },
            orderBy: {
                _count: {
                    tipoEmpresa: 'desc',
                },
            },
            take: 1, // Para obtener solo el tipo con más empresas
        });

        const empresasConEmailAutorizado = await prisma.empresa.count({
            where: {
                emailAuthorization: true,
            },
        });

        const tipoConMayorSeleccion = tipoEmpresaMayorSeleccion[0].tipoEmpresa;
        const sectorMayorSeleccion = await prisma.empresa.groupBy({
            by: ['sector'],
            _count: {
                sector: true,
            },
            orderBy: {
                _count: {
                    sector: 'desc',
                },
            },
            take: 1, // Para obtener solo el sector con más empresas
        });

        const empresasPorSectorConsult = await prisma.empresa.groupBy({
            by: ['sector'],  // Agrupamos por el campo sector
            _count: {
              sector: true,  // Contamos cuántas empresas hay en cada sector
            },
          });
        const numeroDeSectores = empresasPorSectorConsult.length;
          
          // Transformamos el resultado para que coincida con el formato deseado
        const empresasPorSector = empresasPorSectorConsult.map((item) => ({
            name: item.sector,
            value: item._count.sector,
          }));

        const sectorConMayorSeleccion = sectorMayorSeleccion[0].sector;

        // Calcular el porcentaje de aumento
        const aumento = diagnosticosActuales - diagnosticosAnteriores;
        const porcentajeAumentoo = diagnosticosAnteriores > 0
            ? (aumento / diagnosticosAnteriores) * 100
            : 0; // Evita la división por cero

        const porcentajeAumento = porcentajeAumentoo > 100
            ? porcentajeAumentoo / 100
            : porcentajeAumentoo;



        return new Response(
            JSON.stringify({
                totalEmpresasSemana,
                totalEmpresasUltimoMes,
                totalDiagnosticos,
                totalDiagnosticosUltimoMes,
                totalEmpresasActivas,
                porcentajeEmpresasActivasSemana,
                totalUsuarios,
                porcentajeUsuariosUltimoMes,
                diagnosticosPendientes,
                diagnosticosCompletados,
                usuariosConEmpresa,
                empresasConDiagnostico,
                tiemposPendientes,
                usuariosNuevos,
                barChartData: formattedBarChartData,
                lineChartData: formattedLineChartData,
                notificaciones,
                empresasFormateadas,
                usuariosFormateados,
                totalUsuariosUltimoMes,
                porcentajeUsuariosActivosSeman,
                totalUsersSemana,
                usersFormated,
                newUsersData: userActivity,
                userActivityBar,
                usersConDiagnoses,
                usersWithCompletedDiagnoses,
                usersNotAffiliated,
                monthlyDiagnosticsData: monthlyDiagnosticsData,
                mayorResultado,
                menorResultado,
                mayorResultadoDescripcion,
                menorResultadoDescripcion,
                ResultadoGeneralMasAlto,
                testResulPie,
                EmpresasDiagnosticRR,
                formattedResultsTestCounts,
                totalEmpresas,
                radarData,
                UsuariosDiagnosticRR,
                EmpresasDiagnosticRRR,
                TestListR,
                usersExport,
                DiagnosticExport,
                TextExport,
                EmpresExport,
                UsuariosActivosSemana,
                promedioAreaMasBajo,
                promedioAreaMasAlto,
                descriptionMasBajoArea,
                descriptionMasAltoArea,
                porcentajeAumento,
                resultadosPromedio,
                usersFormatedFix,
                empresasFormated,
                empresasFormated2,
                empresasFormated3,
                empresasFormated4,
                tipoConMayorSeleccion,
                sectorConMayorSeleccion,
                empresasConEmailAutorizado,
                empresasPorSector,
                numeroDeSectores,
                EmpresActivity,
                empresasFormateadasplus

            }),
            { status: 200 }
        );
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        return new Response(JSON.stringify({ error: 'Error al obtener los datos del dashboard' }), { status: 500 });
    }
}
