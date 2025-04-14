import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return new NextResponse('Invalid email', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    return NextResponse.json({ exists: !!existingUser });
  } catch (error) {
    console.error('Error checking email:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
