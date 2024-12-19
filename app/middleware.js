// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.clone();
  const role = req.cookies.get('role'); // Assuming you set user role in cookies

  if (url.pathname.startsWith('/adminDashboard') && role !== 'admin') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  if (url.pathname.startsWith('/dashboard') && role === 'user') {
    return NextResponse.redirect(new URL('/adminDashboard', req.url));
  }

  return NextResponse.next();
}