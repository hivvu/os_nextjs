import { NextResponse } from 'next/server';

// This middleware is responsible for setting the language on the <html> tag.
// To achieve this, the client must include the `x-locale` header in the request,
// specifying the desired locale (e.g., "en", "pt", "fr").
// This allows the application to dynamically adjust the language attribute
// of the HTML document 
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const locale = pathname.split('/')[1] || 'en';

  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  
  return response;
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
 