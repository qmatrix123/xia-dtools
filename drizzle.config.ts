import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './db/schema.ts',
    out: './drizzle',
    dialect: 'mysql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: '127.0.0.1',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
});