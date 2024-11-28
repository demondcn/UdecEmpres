// app/api/updateUser/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { userId } = await request.json();

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'User ID is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Buscar la empresa vinculada al userId
    const empresa = await prisma.empresa.findFirst({
      where: { userId: parseInt(userId, 10) },
    });
    
    let updatedEmpresa = null;

    if (empresa) {
      // Actualizar el estado de la empresa
      updatedEmpresa = await prisma.empresa.update({
        where: { id: empresa.id },
        data: { estado: 'Activo' },
      });
    } else {
      return new Response(
        JSON.stringify({ error: 'No company found for this user' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Responder con la empresa actualizada
    return new Response(JSON.stringify(updatedEmpresa), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return new Response(
      JSON.stringify({ error: 'Error updating user' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
