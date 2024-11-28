import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { testId, average } = await request.json();

    // Actualiza el resultado del test
    await prisma.test.update({
      where: { id: parseInt(testId, 10) },
      data: { result: Math.round(average) }, // Redondea el promedio
    });

    return new Response(JSON.stringify({ message: 'Test actualizado con éxito' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar el test:', error);
    return new Response(
      JSON.stringify({ error: 'Error al actualizar el test' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await prisma.$disconnect();
  }
}
