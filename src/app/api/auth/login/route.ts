import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return new Response(JSON.stringify({ message: 'Usuário não encontrado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return new Response(JSON.stringify({ message: 'Senha incorreta' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const token = sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const response = new Response(JSON.stringify({ message: 'Login bem-sucedido' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

    // Para setar cookies, NextResponse facilita, mas aqui você pode setar no header:
    response.headers.append(
      'Set-Cookie',
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}; Secure=${process.env.NODE_ENV === 'production'}`
    );

    return response;
  } catch (error) {
    console.error('Erro no login:', error);
    return new Response(JSON.stringify({ message: 'Erro interno' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
