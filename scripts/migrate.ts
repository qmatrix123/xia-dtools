import { config } from "dotenv"
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, connection } from '@/db/drizzle';

config({ path: ".env.local" })


const main = async () => {
    try {
        await migrate(db, { migrationsFolder: './drizzle' });
    } catch (error) {
        console.log("Error during migration:", error)
        process.exit(1)
    }
}

main()