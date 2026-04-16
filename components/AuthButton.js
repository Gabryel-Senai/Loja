"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

function getDisplayName(user) {
  if (!user) return ""

  return (
    user.user_metadata?.nome_completo ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Usuária"
  )
}

export default function AuthButton() {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    loadUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user || null)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <div className="hidden rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 md:block">
          Olá, {getDisplayName(user)}
        </div>

        <Link
          href="/checkout"
          className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-500"
        >
          Checkout
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-500"
        >
          Sair
        </button>
      </div>
    )
  }

  return (
    <Link
      href="/login"
      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-500"
    >
      Entrar
    </Link>
  )
}