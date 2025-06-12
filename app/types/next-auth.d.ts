import NextAuth from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null
            email?: string | null
            image?: string | null
            profile?: string | null
            role_id?: number
        }
    }

    interface User {
        profile?: string | null
        role_id?: number
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        profile?: string | null
        role_id?: number
    }
}
