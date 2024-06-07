import { int, mysqlEnum, mysqlTable, uniqueIndex, varchar, serial, text } from 'drizzle-orm/mysql-core';

export const accounts = mysqlTable('accounts', {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    userId: text("user_id").notNull()
});
