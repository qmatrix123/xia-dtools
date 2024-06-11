import { Hono, Context } from 'hono'
import bcrypt from 'bcryptjs'
import { handle } from 'hono/vercel'
import {
    authHandler,
    initAuthConfig,
    verifyAuth,
    AuthConfig
} from '@hono/auth-js'

import GitHub from '@auth/core/providers/github'
import Credentials from 'next-auth/providers/credentials'

import todos from './todos'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { LoginSchema } from '@/schemas'
import { getUserByEmail } from '@/data/user'

// export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.use('*', initAuthConfig(getAuthConfig))
app.use('/auth/*', authHandler())

app.get('/protected', verifyAuth(), (c) => {
    const auth = c.get('authUser')
    return c.json({ auth })
})

app.route('/todos', todos)

function getAuthConfig(c: Context): AuthConfig {
    return {
        adapter: DrizzleAdapter(db),
        secret: process.env.AUTH_SECRET,
        session: {
            strategy: 'jwt'
        },
        providers: [
            Credentials({
                async authorize(credentials) {
                    const validatedFields = LoginSchema.safeParse(credentials)

                    if (validatedFields.success) {
                        const { email, password } = validatedFields.data

                        const user = await getUserByEmail(email)
                        if (!user || !user.password) return null

                        const passwordsMatch = await bcrypt.compare(
                            password,
                            user.password
                        )

                        if (passwordsMatch) return user
                    }
                    return null
                }
            })
        ]
    }
}

export const GET = handle(app)
export const POST = handle(app)
