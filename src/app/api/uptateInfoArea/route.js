export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, result } = body;

    // Convertir el result a número antes de actualizar
    const numericResult = Number(result);

    // Validar si el result es un número válido
    if (!id || isNaN(numericResult)) {
      return new Response(JSON.stringify({ error: 'Faltan datos requeridos o el formato es incorrecto' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const updatedTest = await prisma.test.update({
      where: { id },
      data: { result: numericResult }, // Usar el valor numérico aquí
    });

    return new Response(JSON.stringify(updatedTest), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al actualizar la prueba:', error);
    return new Response(JSON.stringify({ error: 'Error al actualizar la prueba' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
