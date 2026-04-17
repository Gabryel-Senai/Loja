"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    checkAccess()
  }, [])

  async function checkAccess() {
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setAuthorized(false)
      setLoading(false)
      return
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single()

    if (error || !data) {
      setAuthorized(false)
      setLoading(false)
      return
    }

    setProfile(data)

    if (data.role === "owner" || data.role === "admin") {
      setAuthorized(true)
    } else {
      setAuthorized(false)
    }

    setLoading(false)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] p-6">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-lg">
          <p className="text-slate-600">Carregando painel...</p>
        </div>
      </main>
    )
  }

  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#f5f7fb] p-6">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-black text-slate-900">
            Acesso negado
          </h1>
          <p className="mt-3 text-slate-600">
            Você não tem permissão para acessar o painel administrativo.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Voltar para a loja
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900">
              Painel Administrativo
            </h1>
            <p className="mt-2 text-slate-500">
              Bem-vindo, {profile?.full_name || "Admin"}.
            </p>
          </div>

          <Link
            href="/"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-rose-300 hover:text-rose-500"
          >
            Voltar para loja
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-black text-slate-900">
              Produtos
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Aqui vamos colocar cadastro, edição, preço e estoque.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-black text-slate-900">
              Pedidos
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Aqui vamos acompanhar compras e pagamentos.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="text-xl font-black text-slate-900">
              Clientes
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Aqui vamos gerenciar contas e permissões.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}