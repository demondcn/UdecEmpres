import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);
const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Correo electrónico es requerido' }, { status: 400 });
  }

  // Verificar si el usuario existe
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: 'No se encontró un usuario con ese correo electrónico' }, { status: 404 });
  }

  // Generar un token de recuperación (esto puede ser un JWT o un hash)
  const resetToken = bcrypt.hashSync(email + Date.now(), 10);

  // Guardar el token en la base de datos asociado con el usuario
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      token: resetToken,
      expiresAt: new Date(Date.now() + 3600000), // 1 hora de validez
    },
  });

    // Configurar el correo electrónico
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;
    const emailContent = {
      from: 'noreply@tuapp.com',
      to: email,
      subject: 'Recuperación de Contraseña',
      text: `Para restablecer tu contraseña, por favor visita el siguiente enlace: ${resetUrl}`,
    };

    try {
      // Enviar el correo electrónico usando Resend
      await resend.emails.send(emailContent);
      return NextResponse.json({ message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.' }, { status: 200 });
    } catch (error) {
      console.error('Error al enviar el correo electrónico', error);
      return NextResponse.json({ error: 'No se pudo enviar el correo electrónico' }, { status: 500 });
    }
}
