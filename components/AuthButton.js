"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

function getDisplayName(user, profile) {
  return (
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "Usuário"
  )
}

export default function AuthButton() {
  const router = useRouter()

  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadUserAndProfile()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)

      if (session?.user) {
        loadProfile(session.user.id)
      } else {
        setProfile(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  async function loadUserAndProfile() {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user || null)

    if (user) {
      await loadProfile(user.id)
    } else {
      setProfile(null)
    }

    setLoading(false)
  }

  async function loadProfile(userId) {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()

    if (error) {
      console.error("Erro ao buscar profile:", error)
      setProfile(null)
      return
    }

    setProfile(data)
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-500">
        Carregando...
      </div>
    )
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-500"
      >
        Entrar
      </Link>
    )
  }

  const isAdmin = profile?.role === "owner" || profile?.role === "admin"

  return (
    <div className="flex items-center gap-2">
      <div className="hidden rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 md:block">
        Olá, {getDisplayName(user, profile)}
      </div>

      {isAdmin && (
        <Link
          href="/admin"
          className="rounded-full border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
        >
          Admin
        </Link>
      )}

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