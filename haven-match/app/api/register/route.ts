import bcrypt from "bcryptjs";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    // Verifica que todos los campos existan
    if (!email || !name || !password) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    // Verifica si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("Email already in use", { status: 409 });
    }

    // Hashea la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crea el usuario
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Registration error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
