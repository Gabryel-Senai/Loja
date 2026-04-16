'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(e) {
    setForm((old) => ({ ...old, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            data: {
              full_name: form.name
            }
          }
        });

        if (error) throw error;
        setMessage('Cadastro realizado. Confira seu e-mail para confirmar a conta, se o Supabase exigir confirmação.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password
        });

        if (error) throw error;

        router.push('/admin');
        router.refresh();
      }
    } catch (error) {
      setMessage(error.message || 'Não foi possível concluir a ação.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-[32px] border border-white/10 bg-white p-8 shadow-soft">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900">Acesso da loja</h1>
        <p className="mt-2 text-sm text-slate-500">
          Faça login para administrar produtos, preços, estoque e atualizações gerais.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${mode === 'login' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${mode === 'register' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
        >
          Criar conta
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' ? (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Nome</label>
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Nome do responsável"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3"
              required
            />
          </div>
        ) : null}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">E-mail</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="voce@loja.com"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Senha</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={updateField}
            placeholder="********"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
        </div>

        {message ? <p className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">{message}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={loading}>
          {loading ? 'Carregando...' : mode === 'login' ? 'Entrar no painel' : 'Criar conta'}
        </button>
      </form>
    </div>
  );
}
