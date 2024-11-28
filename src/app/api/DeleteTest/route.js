// api/DeleteDiagnostic/route.js

import { PrismaClient } from '@prisma/client';

// Inicializa Prisma Client
const prisma = new PrismaClient();

export async function DELETE(request) {
  try {
    // Obtener el cuerpo de la solicitud
    const { id } = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID no proporcionado' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Eliminar el diagnóstico y las pruebas asociadas en una transacción
    await prisma.$transaction(async (prisma) => {
      // Eliminar las pruebas asociadas
      await prisma.test.deleteMany({
        where: { id },
      });

    });

    return new Response(JSON.stringify({ message: 'Prueba eliminada' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al eliminar el diagnóstico:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar la prueba' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  } 
}
