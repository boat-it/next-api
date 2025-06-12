import { db } from "@/db";
import { users } from "@/db/schema/users";

export async function GET(request: Request) {
    try {
        const allUsers = await db.select({
            name: users.user_id,
            email: users.email
        }).from(users)
        return Response.json(allUsers)
    } catch (error) {
        return Response.json({ error: error }, { status: 500 })
    }
}