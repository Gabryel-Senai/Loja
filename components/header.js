import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import LogoutButton from './logout-button';

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let role = null;

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    role = profile?.role || null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-slate-900 text-sm font-black">
            AF
          </div>
          <div>
            <p className="text-lg font-black tracking-wide">Aurora Femme</p>
            <p className="text-xs text-slate-500">Moda feminina futurista</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/#novidades" className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
            Novidades
          </Link>
          <Link href="/#categorias" className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
            Categorias
          </Link>
          <Link href="/#produtos" className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
            Produtos
          </Link>
          <Link href="/#contato" className="text-sm font-medium text-slate-600 transition hover:text-brand-600">
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user && ['admin', 'editor'].includes(role) ? (
            <Link href="/admin" className="btn-secondary hidden sm:inline-flex">
              Painel da loja
            </Link>
          ) : null}

          {user ? (
            <LogoutButton />
          ) : (
            <Link href="/login" className="btn-primary">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
