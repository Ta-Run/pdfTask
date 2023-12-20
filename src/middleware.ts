import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
//  const regex = new RegExp('/api/*')
//   if(regex.test(request.url)){

//  }
  const origin = request.headers.get('origin');

  return NextResponse.next()
}


export const config = {
  matcher: '/api/:path*',
}