"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import GoogleLoginButton from "@/components/GoogleLoginButton"

export default function LoginPage() {
  const router = useRouter()

  const [isLogin, setIsLogin] = useState(true)
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [loading, setLoading] = useState(false)
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMensagem("")
    setErro("")

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password: senha,
        })

        if (error) throw error

        router.push("/")
        router.refresh()
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: senha,
          options: {
            data: {
              nome_completo: nome,
            },
          },
        })

        if (error) throw error

        if (data.user) {
          await supabase.from("perfis").upsert({
            id: data.user.id,
            nome_completo: nome,
            papel: "cliente",
          })
        }

        setMensagem("Cadastro realizado com sucesso. Agora faça login.")
        setIsLogin(true)
        setSenha("")
      }
    } catch (err) {
      setErro(err.message || "Ocorreu um erro.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-4xl font-black">Aurora Femme</h1>
            <p className="mt-2 text-sm uppercase tracking-[0.25em] text-rose-500">
              Acesso da loja
            </p>
          </Link>
        </div>

        <div className="rounded-[30px] border border-white/60 bg-white p-8 shadow-xl">
          <div className="mb-6 flex rounded-full bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`w-1/2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isLogin
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`w-1/2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                !isLogin
                  ? "bg-slate-950 text-white"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome"
                  className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-rose-400"
                  required={!isLogin}
                />
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-semibold">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@email.com"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-rose-400"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">Senha</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-rose-400"
                required
              />
            </div>

            {mensagem && (
              <div className="rounded-2xl bg-green-100 px-4 py-3 text-sm text-green-700">
                {mensagem}
              </div>
            )}

            {erro && (
              <div className="rounded-2xl bg-red-100 px-4 py-3 text-sm text-red-700">
                {erro}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Carregando..." : isLogin ? "Entrar" : "Criar conta"}
            </button>

            <GoogleLoginButton />

            <Link
              href="/"
              className="block text-center text-sm font-medium text-slate-500 transition hover:text-rose-500"
            >
              Voltar para a loja
            </Link>
          </form>
        </div>
      </div>
    </main>
  )
}