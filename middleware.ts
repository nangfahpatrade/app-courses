

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const publicPrefixes = ['/', '/home', '/auth'];
const backendPaths = ['/admin', '/user', '/super', '/api', '/payment'];
const roleBasePaths: { [key: string]: string } = {
  '0': '/user',
  '1': '/admin',
  '2': '/super',
};

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get('authToken')?.value;
  const status = req.cookies.get('status')?.value;

  const localePrefixPattern = /^\/(th|en)/;
  const pathWithoutLocale = pathname.replace(localePrefixPattern, '') || '/';

  const isBackendPath = backendPaths.some((path) => pathWithoutLocale.startsWith(path));
  if (isBackendPath) {

    if (pathWithoutLocale.startsWith('/payment')) {
      return NextResponse.next();
    }

    if (!authToken || !status) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    const userRootPath = roleBasePaths[status];

    if (!userRootPath || !pathWithoutLocale.startsWith(userRootPath)) {
      const userBasePath = roleBasePaths[status];
      return NextResponse.redirect(new URL(userBasePath || '/', req.url));
    }
    return NextResponse.next();
  }

  if (authToken && status && pathWithoutLocale === '/') {
    const userBasePath = roleBasePaths[status];
    return NextResponse.redirect(new URL(userBasePath, req.url));
  }

  const isPublicPage = publicPrefixes.some((prefix) => pathWithoutLocale.startsWith(prefix))

  if (authToken && status && pathWithoutLocale.startsWith('/auth/')) {
    const userBasePath = roleBasePaths[status];
    return NextResponse.redirect(new URL(userBasePath, req.url));
  }

  if (!authToken && !isPublicPage) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};