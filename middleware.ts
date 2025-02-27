

// middleware.ts ใช้ได้ 
// ต้องการปรับให้ แก้ไข Error Warning: Prop `lang` did not match. Server: "th" Client: "en" หน้า /app/layout.tsx

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(th|en)/:path*']
// };

// *****************************************************

// middleware.ts 
// ต้องการแก้ไขจากโค้ดนี้ หน้าที่ใช้ [locale] ได้ มีแค่ /home อย่างเดียว หน้าอื่นๆ ให้ใช้ได้ตามปกติ หมายเหตุหน้า /home อยู่ใน /app/[locale]/home/page.tsx
// ถ้า login แล้ว ไม่สามารถกลับมาหน้า / และ หน้า /login ได้ 
// มี cookie authToken และ status สำหรับ ถ้าไปหน้า / และ /login แล้ว ให้กลับไปที่หน้าตัวเอง เช่น 
// status 0 คือ /user  status 1 คือ /admin   status 2 คือ /super 

// import createMiddleware from 'next-intl/middleware';
// import {routing} from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(th|en)/:path*']
// };



// *****************************************************

import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Middleware for Next.js Internationalized Routing
const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl; // Extract pathname
  const authToken = req.cookies.get('authToken')?.value; // Extract value from RequestCookie
  const status = req.cookies.get('status')?.value; // Extract value from RequestCookie

  // 1. Redirect '/' if user is logged in
  // if (['/', '/login'].includes(pathname) && authToken && status) {
  //   let redirectUrl = '/user/shopcourse'; // Default redirect for status = 0
  //   if (status === '1') redirectUrl = '/admin';
  //   else if (status === '2') redirectUrl = '/super';
  //   return NextResponse.redirect(new URL(redirectUrl, req.url));
  // }

  if (authToken && status === '0') {
    // If the path does not start with '/user', redirect to '/user/shopcourse'
    if (!pathname.startsWith('/user')) {
      return NextResponse.redirect(new URL('/user/shopcourse', req.url));
    }
  }

  if (authToken && status === '1') {
    // If the path does not start with '/user', redirect to '/user/shopcourse'
    if (!pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  if (authToken && status === '2') {
    // If the path does not start with '/user', redirect to '/user/shopcourse'
    if (!pathname.startsWith('/super')) {
      return NextResponse.redirect(new URL('/super', req.url));
    }
  }

  // 2. Restrict '/home' to locale-specific paths only
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/th/home', req.url)); // Default locale
  }

  // 3. Handle locale-specific paths for '/home'
  if (/^\/(th|en)\/home/.test(pathname)) {
    return intlMiddleware(req); // Use the intlMiddleware for locale paths
  }

  // 4. Allow paths like '/login' or '/user/shopcourse' without locale
  if (!/^\/(th|en)\//.test(pathname)) {
    return NextResponse.next(); // Allow non-locale paths to proceed
  }

  // Default to the intlMiddleware for paths that include a locale
  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/login', '/home', '/(th|en)/:path*'], // Match the desired paths
};