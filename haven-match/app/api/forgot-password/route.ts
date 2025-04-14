import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

// Usamos crypto para generar un token único simulado
import crypto from "crypto";

export async function POST(request: Request) {
  const { email } = await request.json();

  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
  }

  // Simulamos un token único
  const token = email; // Para simulación usamos el email como token
  const link = `http://localhost:3000/reset-password?token=${encodeURIComponent(token)}`;

  // Simulamos que enviamos el correo, pero lo mostramos en la UI
  console.log(`[SIMULADO] Enviar correo a ${email} con link: ${link}`);

  return NextResponse.json({
    message: "Correo enviado",
    link // llega al frontend
  });
}
