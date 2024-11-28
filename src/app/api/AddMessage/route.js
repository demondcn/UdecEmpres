// app/api/AddMessage/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Parsear el cuerpo de la solicitud JSON
    const { field, value, id } = await request.json();

    // Validar los campos necesarios
    if (!field || !value || !id) {
      return new Response(JSON.stringify({ error: 'Faltan datos necesarios' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Validar que el campo seleccionado sea válido
    const validFields = [
      'Problemas Con Registro Empresa',
      'Problemas Con Registro Usuario',
      'Problemas Con Inicio de Sesión',
      'Problemas con la Plataforma',
      'Problemas con la Recuperación de Contraseña',
      'Problemas con la Verificación de Correo',
      'Ideas O Recomendaciones de Mejora',
      'Solicitudes de Nuevas Funcionalidades',
      'Problemas Con Integración de Servicios',
      'Reportar Errores o Bugs',
    ];

    if (!validFields.includes(field)) {
      return new Response(JSON.stringify({ error: 'Campo no válido' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Crear un nuevo mensaje en la base de datos
    const newMessage = await prisma.mensajesPalAdmin.create({
      data: {
        userId: id,  
        asunto: field,  
        mensaje: value,  
      },
    });

    return new Response(JSON.stringify(newMessage), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
