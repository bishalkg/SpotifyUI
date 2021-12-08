import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

//also has next event, but just using req here
export async function middleware(req) {
  //if the user is currently logged in, then the token will exist
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  if (token && pathname === '/login') {
    return NextResponse.redirect('/');
  }

  //protected route
  //if trying to create next-auth session
  //if token already exists
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  //redirect to login if no token and requesting a protected route
  //when you click logout, the token will be invalidated so will redirect you to login page
  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login');
  }
}