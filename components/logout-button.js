'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';

export default function LogoutButton() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    startTransition(() => {
      router.push('/');
      router.refresh();
    });
  }

  return (
    <button onClick={handleLogout} className="btn-secondary" disabled={pending}>
      {pending ? 'Saindo...' : 'Sair'}
    </button>
  );
}
