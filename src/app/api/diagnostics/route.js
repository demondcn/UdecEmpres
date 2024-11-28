// src/app/api/diagnostics/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer el userId del cuerpo de la solicitud
    const { userId, status, createdAt } = await request.json();

    // Crear un nuevo diagnóstico en la base de datos
    const newDiagnostic = await prisma.diagnosis.create({
      data: {
        userId: parseInt(userId, 10),
        status: status,
        createdAt: createdAt
      },
    });

    // Responder con el ID del nuevo diagnóstico
    return new Response(JSON.stringify({ id: newDiagnostic.id }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating diagnostic:', error);
    return new Response(
      JSON.stringify({ error: 'Error creating diagnostic' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
