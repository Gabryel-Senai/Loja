import Link from 'next/link';
import { LayoutDashboard, PlusCircle, Shirt } from 'lucide-react';

const items = [
  { href: '/admin', label: 'Resumo', icon: LayoutDashboard },
  { href: '/admin/produtos/novo', label: 'Novo produto', icon: PlusCircle },
  { href: '/', label: 'Ver loja', icon: Shirt }
];

export default function AdminSidebar() {
  return (
    <aside className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-soft">
      <h2 className="text-lg font-black">Painel da loja</h2>
      <nav className="mt-5 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
