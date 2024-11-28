// src/app/api/company/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const {
      companyName, nit, address, city, email, phone, contactName,
      companyType, sector, anoFundacion, ingresosAnuales, activosTotales,
      patrimonio, numeroEmpleados, canalesDistribucion, principalesClientes,
      tecnologiaUtilizada, emailAuthorization, userId
    } = await request.json();

    // Validación básica de campos requeridos
    if (!companyName || !email || !userId) {
      return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Crear una nueva empresa en la base de datos
    const newCompany = await prisma.empresa.create({
      data: {
        nombre: companyName,
        nit: nit,
        ubicacion: `${address}, ${city}`,
        correoElectronico: email,
        telefonos: phone,
        nombreContacto: contactName,
        tipoEmpresa: companyType,
        sector: sector,
        anoFundacion: parseInt(anoFundacion, 10),
        ingresosAnuales: ingresosAnuales,
        activosTotales: activosTotales,
        patrimonio: patrimonio,
        numeroEmpleados: numeroEmpleados,
        canalesDistribucion: canalesDistribucion,
        principalesClientes: principalesClientes,
        tecnologiaUtilizada: tecnologiaUtilizada,
        emailAuthorization: emailAuthorization,
        userId: parseInt(userId, 10),
        estado: 'Inactivo'
      },
    });

    // Responder con la empresa creada
    return new Response(JSON.stringify(newCompany), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creando la empresa:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
