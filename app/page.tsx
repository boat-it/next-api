import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import LogoutButton from '@/components/logoutButton'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect("/login")
  }

  return (
    <div className="text-center mt-10">
      <h1>ยินดีต้อนรับ {session.user?.profile}</h1>
      <LogoutButton />
    </div>
  )
}
