"use client"

import { supabase } from "@/lib/supabaseClient"

export default function GoogleLoginButton() {
  async function handleGoogleLogin() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    })

    if (error) {
      console.error("Erro no login com Google:", error)
      alert("Não foi possível entrar com Google.")
    }
  }

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-rose-400 hover:text-rose-500"
    >
      Entrar com Google
    </button>
  )
}