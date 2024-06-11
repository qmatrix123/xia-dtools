import { LoginButton } from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'
import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { cn } from '@/lib/utils'

export default async function Home() {
    return (
        <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
            <div className="space-y-6 text-center">
                <h1
                    className={cn(
                        'text-6xl font-semibold text-white drop-shadow-md'
                    )}
                >
                    🔐 Xia DTools
                </h1>
                <p className="text-white text-lg">
                    A simple tool of digital platform
                </p>
                <div>
                    <LoginButton>
                        <Button variant="secondary" size="lg">
                            Sign in
                        </Button>
                    </LoginButton>
                </div>
            </div>
        </main>
    )
}
