"use client"

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function loginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();


    const handleLogin = async (e: any) => {
        e.preventDefault();
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false
        })

        if (res?.error) {
            setError('user or password is wrong!');
        } else {
            router.push('/home')
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto mt-10">
            <h2 className="text-xl font-bold">เข้าสู่ระบบ</h2>
            <input
                className="border p-2 w-full rounded-lg"
                placeholder="username"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className="border p-2 w-full rounded-lg"
                placeholder="Password"
                type="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded transition-all duration-100 ease-in-out hover:bg-blue-600 active:scale-95"
            >
                Login
            </button>
        </form>
    )
}