// app/api/getdiagnostics/route.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response('User ID is required', { status: 400 });
  }

  try {
    const diagnostics = await prisma.diagnosis.findMany({
      where: { userId: parseInt(userId) },
      include: {
        tests: true,
      },
    });

    return new Response(JSON.stringify(diagnostics), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching diagnostics:', error);
    return new Response('Error fetching diagnostics', { status: 500 });
  }
}
