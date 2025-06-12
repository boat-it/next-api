import { int, varchar, timestamp, mysqlTable } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
    id: int('id').primaryKey().autoincrement(),
    username: varchar('username', { length: 255 }).notNull().unique(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
});