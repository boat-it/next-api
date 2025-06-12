import {
    mysqlTable,
    int,
    varchar,
    timestamp
} from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const users = mysqlTable("users", {
    user_id: int("user_id").primaryKey().autoincrement(),

    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),

    profile: varchar("profile", { length: 255 }),
    profile_srp: varchar("profile_srp", { length: 255 }),
    profile_verapack: varchar("profile_verapack", { length: 255 }),
    profile_mypack: varchar("profile_mypack", { length: 255 }),

    department_id: int("department_id"),
    department: varchar("department", { length: 255 }),

    position_id: int("position_id"),
    position: varchar("position", { length: 255 }),

    team_id: int("team_id"),
    team: varchar("team", { length: 255 }),

    role_id: int("role_id"),
    email: varchar("email", { length: 255 }),

    google_id: int("google_id"),
    url_user: varchar("url_user", { length: 255 }),
    status: int("status").default(1),

    line_token: varchar("line_token", { length: 100 }),

    created_at: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
    create_by: varchar("create_by", { length: 255 }),

    updated_at: timestamp("updated_at", { mode: "string" }),
    updated_by: int("updated_by")
})
