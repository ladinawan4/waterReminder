import { NextResponse } from 'next/server';

export function middleware(req) {
  // Example middleware function that does nothing and allows all requests
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/(api|trpc)(.*)'],
};
