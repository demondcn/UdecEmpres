import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { diagnosisId, status } = await request.json();

    // Obtener la fecha y hora actuales
    const now = new Date(); // Equivalent to NOW() in SQL

    // Actualiza el resultado del test
    await prisma.diagnosis.update({
      where: { id: parseInt(diagnosisId, 10) },
      data: { 
        status: status,
        updatedAt: now
      }, 
    });

    return new Response(JSON.stringify({ message: 'Diagnostico Exitoso' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el Diagnostico', error);
    return new Response(
      JSON.stringify({ error: 'Error al actualizar el Diagnostico' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}
