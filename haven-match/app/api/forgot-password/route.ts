import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from '@/app/libs/prismadb';

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: 'Email es requerido' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
  }

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY!, {
    expiresIn: '1h',
  });

  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  
  return NextResponse.json({
    message: 'Link de restablecimiento generado',
    link: resetLink,
  });
}
