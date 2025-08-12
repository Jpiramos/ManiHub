import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware rodando na rota:', request.nextUrl.pathname);

  const token = request.cookies.get('token')?.value;
  console.log('Token:', token);

  const { pathname } = request.nextUrl;

  // Liberar rota de login
  if (pathname === '/app/login') {
    return NextResponse.next();
  }

  // Defina aqui as rotas que quer proteger
  const protectedRoutes = ['/', '/app', '/perfil'];

  // Se rota protegida e sem token, redireciona para login
  if (!token && protectedRoutes.some(route => pathname === route || pathname.startsWith(route + '/'))) {
    console.log('Redirecionando para login...');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/app/:path*', '/perfil/:path*'],
};
