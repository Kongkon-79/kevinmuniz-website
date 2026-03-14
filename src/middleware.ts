/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that don't require authentication, or auth specific routes
const AUTH_ROUTES = ['/login', '/sign-up', '/forgot-password']

const isAuthRoute = (pathname: string) =>
    AUTH_ROUTES.some(
        route => pathname === route || pathname.startsWith(`${route}/`),
    )

export async function middleware(request: NextRequest) {
    const token = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    })

    const { pathname } = request.nextUrl
    const isAuthenticated = Boolean(token)

    // Wait, website needs USER or CREATOR. Admin shouldn't be here.
    const role = token?.role as string | undefined
    const isAllowedRole = role === 'USER' || role === 'CREATOR'

    if (isAuthRoute(pathname)) {
        if (isAuthenticated && isAllowedRole) {
            return NextResponse.redirect(new URL('/dashboard/overview', request.url))
        }
        return NextResponse.next()
    }

    // Protect /dashboard and its sub-routes
    if (pathname.startsWith('/dashboard')) {
        if (!isAuthenticated) {
            const signInUrl = new URL('/login', request.url)
            signInUrl.searchParams.set('callbackUrl', pathname)
            return NextResponse.redirect(signInUrl)
        }

        if (!isAllowedRole) {
            // If admin somehow logs in here or an invalid role
            const signInUrl = new URL('/login', request.url)
            signInUrl.searchParams.set('error', 'UNAUTHORIZED_ROLE')
            return NextResponse.redirect(signInUrl)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|assets).*)'],
}
