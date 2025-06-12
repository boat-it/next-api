import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/db"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { username, password } = credentials ?? {}

                if (!username || !password) return null

                const foundUsers = await db
                    .select()
                    .from(users)
                    .where(eq(users.username, username))
                    .limit(1)

                console.log({ foundUsers })

                const user = foundUsers[0]
                if (!user || !user.password) return null

                const rawHash = user.password
                const fixedHash = rawHash.replace("$2y$", "$2b$")

                const isValid = await bcrypt.compare(password, fixedHash)
                if (!isValid) return null
                return {
                    id: user.user_id.toString(),
                    username: user.username,
                    email: user.email ?? undefined,
                    position: user.position_id,
                    profile: user.profile,
                    srp: user.profile_srp,
                    vera: user.profile_verapack,
                    mypack: user.profile_mypack
                }
            }
        })
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET!,
    pages: { signIn: "/login" }
}

// ✅ ต้อง export HTTP methods แบบนี้ใน App Router
const handler = NextAuth(authOptions)

export const GET = handler
export const POST = handler
