

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

    // Eliminar el usuario y todos los registros asociados en una transacción
    await prisma.$transaction(async (prisma) => {
      // Eliminar las pruebas asociadas a los diagnósticos del usuario
      await prisma.test.deleteMany({
        where: {
          diagnosis: {
            userId: id
          }
        }
      });

      // Eliminar los diagnósticos del usuario
      await prisma.diagnosis.deleteMany({
        where: {
          userId: id
        }
      });

      // Eliminar las empresas del usuario
      await prisma.empresa.deleteMany({
        where: {
          userId: id
        }
      });

      // Eliminar los registros de restablecimiento de contraseña del usuario
      await prisma.passwordReset.deleteMany({
        where: {
          userId: id
        }
      });

      // Finalmente, eliminar el usuario
      await prisma.user.delete({
        where: { id }
      });
    });

    return new Response(JSON.stringify({ message: 'Usuario y registros asociados eliminados' }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    return new Response(JSON.stringify({ error: 'Error al eliminar el usuario' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
