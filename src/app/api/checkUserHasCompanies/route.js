// pages/api/checkUserHasCompanies.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer userId del cuerpo de la solicitud
    const { userId } = await request.json();

    if (typeof userId !== 'number') {
      return new Response(
        JSON.stringify({ error: 'userId debe ser un número' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Consulta a la base de datos para verificar si el usuario tiene empresas
    const userWithCompanies = await prisma.user.findUnique({
      where: { id: userId },
      select: { empresas: true },
    });

    // Verificar si el usuario tiene empresas
    const hasCompanies = userWithCompanies?.empresas?.length > 0;

    // Responder con un booleano
    return new Response(
      JSON.stringify({ hasCompanies }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking user companies:', error);
    return new Response(
      JSON.stringify({ error: 'Error checking user companies' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } 
}
