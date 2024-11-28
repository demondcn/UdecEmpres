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

    // Actualizar la fecha `updatedAt` del usuario
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: { updatedAt: new Date() },
    });

    // Responder con el usuario actualizado
    return new Response(JSON.stringify(updatedUser), {
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
