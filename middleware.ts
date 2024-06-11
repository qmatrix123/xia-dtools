import NextAuth from 'next-auth'
import authConfig from '@/auth.config'
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes
} from '@/routes'
import { NextRequest } from 'next/server'

export const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req) {
    // Your custom middleware logic goes here
    const { nextUrl } = req
    const isLoggedIn = !!req.auth

    console.log({ isLoggedIn })

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
        }
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/auth/login', nextUrl))
    }

    return
})

// 下面的路由规则将触发上面的auth函数是否会被执行
export const config = {
    matcher: ['/((?!.+.[w]+$|_next).*)', '/', '/(api|trpc)(.*)']
}
