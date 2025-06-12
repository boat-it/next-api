"use client";

import { signOut } from "next-auth/react";

export default function logoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-red-600 px-4 py-2 border rounded hover:bg-red-50"
        >
            logout
        </button>
    )
}