import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export const metadata = {
  title: 'Painel | Aurora Femme'
};

export default async function AdminPage() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  const totalProducts = products?.length || 0;
  const totalActive = products?.filter((item) => item.active).length || 0;
  const totalStock = products?.reduce((sum, item) => sum + Number(item.stock || 0), 0) || 0;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Painel administrativo</p>
          <h1 className="mt-2 text-3xl font-black">Gerencie sua loja</h1>
          <p className="mt-2 text-slate-500">Cadastre produtos, atualize preços, estoque e status de publicação.</p>
        </div>
        <Link href="/admin/produtos/novo" className="btn-primary">
          Novo produto
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Produtos cadastrados</p>
          <p className="mt-3 text-4xl font-black">{totalProducts}</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Produtos ativos</p>
          <p className="mt-3 text-4xl font-black">{totalActive}</p>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
          <p className="text-sm text-slate-500">Itens em estoque</p>
          <p className="mt-3 text-4xl font-black">{totalStock}</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Produto</th>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Categoria</th>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Preço</th>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Estoque</th>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Status</th>
                <th className="px-5 py-4 text-left text-sm font-bold text-slate-700">Ação</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => (
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="px-5 py-4 font-semibold text-slate-900">{product.name}</td>
                  <td className="px-5 py-4 text-slate-600">{product.category}</td>
                  <td className="px-5 py-4 text-slate-600">{formatPrice(product.price)}</td>
                  <td className="px-5 py-4 text-slate-600">{product.stock}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${product.active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                      {product.active ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link href={`/admin/produtos/${product.id}/editar`} className="font-semibold text-brand-700 hover:underline">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
