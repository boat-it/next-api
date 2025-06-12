"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"

export default function RegisterPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const router = useRouter()

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })

        const data = await res.json()
        if (!res.ok) {
            setError(data.error || "เกิดข้อผิดพลาด")
            return
        }

        // login อัตโนมัติหลัง register
        await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        router.push("/")
    }

    return (
        <form onSubmit={handleRegister} className="space-y-4 max-w-sm mx-auto mt-10">
            <h2 className="text-xl font-bold">สมัครสมาชิก</h2>
            <input
                className="border p-2 w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                className="border p-2 w-full"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="bg-green-600 text-white px-4 py-2 rounded">สมัคร</button>
        </form>
    )
}
