import prisma from '@/app/libs/prismadb';
import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    if (!token || !password) {
      return new Response(JSON.stringify({ error: 'Token y contraseña son requeridos' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    if (!SECRET_KEY) {
      throw new Error('JWT_SECRET_KEY no está definida en las variables de entorno');
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const email = (decoded as { email: string }).email;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hashedPassword = await hash(password, 12);

    await prisma.user.update({
      where: { email },
      data: { hashedPassword },
    });

    return new Response(JSON.stringify({ message: 'Contraseña actualizada exitosamente' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('[RESET_PASSWORD_ERROR]', error);
    return new Response(JSON.stringify({ error: 'Token inválido o expirado' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}