// app/api/uptateInfoUsers/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(request) {
  try {
    // Obtener el cuerpo de la solicitud
    const {data, id} = await request.json();
    const {name, email } = data;

    if (!id || !name || !email) {
      return new Response(JSON.stringify({ error: 'Faltan datos requeridos' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // Actualizar la información del usuario
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el usuario' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
