import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

if (!process.env.AUTH_SECRET) {
  throw new Error('AUTH_SECRET environment variable is not set');
}

const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /admin routes (except /admin/login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, secretKey, { algorithms: ['HS256'] });
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('session');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
