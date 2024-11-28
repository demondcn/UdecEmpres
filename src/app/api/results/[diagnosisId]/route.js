// app/api/results/[diagnosisId]/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const url = new URL(request.url);
  const diagnosisId = url.pathname.split('/').pop(); // Extrae el diagnosisId de la URL

  if (!diagnosisId) {
    return new Response(JSON.stringify({ error: 'Diagnosis ID is required' }), { status: 400 });
  }

  try {
    const tests = await prisma.test.findMany({
      where: { diagnosisId: parseInt(diagnosisId, 10) },
      select: { number: true, result: true, description: true }
    });

    if (tests.length === 0) {
      return new Response(JSON.stringify({ error: 'No tests found for the given diagnosis ID' }), { status: 404 });
    }

    // Calculate average percentage
    const total = tests.reduce((sum, test) => sum + test.result, 0);
    const averagePercentage = tests.length ? total / tests.length : 0;

    // Map tests to a structured result for each test type
    const resultsByTestType = tests.reduce((acc, test) => {
      acc[`resultPrueb${test.number}`] = test.result;
      return acc;
    }, {});

    return new Response(JSON.stringify({
      percentageTotal: averagePercentage,
      ...resultsByTestType,
      testResults: tests
    }), { status: 200 });
  } catch (error) {
    console.error('Error fetching results:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
}
