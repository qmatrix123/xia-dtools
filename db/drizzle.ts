import { drizzle } from 'drizzle-orm/node-postgres'
import { Client, Pool } from 'pg'

export const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
    ssl: false
})

export const db = drizzle(pool)
