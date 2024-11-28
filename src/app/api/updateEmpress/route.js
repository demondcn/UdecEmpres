// app/api/uptateEmpress/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    // Parse the JSON body
    const { field, value, id } = await request.json();

    // Validate the necessary fields
    if (!field || !value || !id) {
      return new Response(JSON.stringify({ error: 'Faltan datos necesarios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validate that the field is valid
    const validFields = [
      'nombre',
      'estado',
      'correoElectronico',
      'telefonos',
      'nombreContacto',
      'nit',
      'tipoEmpresa',
      'sector',
      'anoFundacion',
      'ubicacion',
      'ingresosAnuales',
      'activosTotales',
      'patrimonio',
      'numeroEmpleados',
      'canalesDistribucion',
      'principalesClientes',
      'tecnologiaUtilizada',
      'emailAuthorization'
    ];

    if (!validFields.includes(field)) {
      return new Response(JSON.stringify({ error: 'Campo no válido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Update the empresa in the database
    const updatedEmpresa = await prisma.empresa.update({
      where: { id },
      data: { [field]: value },
    });

    return new Response(JSON.stringify(updatedEmpresa), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error actualizando la empresa:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
