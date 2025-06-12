import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm"

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json()

        // เช็คว่ามี user อยู่แล้วหรือยัง
        const existingUser = await db.select().from(users).where(eq(users.username, username)).limit(1)

        if (existingUser.length > 0) {
            return NextResponse.json({ error: "อีเมลนี้ถูกใช้แล้ว" }, { status: 400 })
        }

        // hash password ก่อนเก็บ
        const hashedPassword = await bcrypt.hash(password, 10)

        await db.insert(users).values({
            username,
            password: hashedPassword,
            created_at: new Date()
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("register error:", error)
        return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 })
    }
}