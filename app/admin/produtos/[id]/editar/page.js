import { notFound } from 'next/navigation';
import ProductForm from '@/components/product-form';
import { createClient } from '@/lib/supabase-server';

export const metadata = {
  title: 'Editar produto | Aurora Femme'
};

export default async function EditProductPage({ params }) {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', params.id).single();

  if (!product) {
    notFound();
  }

  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Edição</p>
        <h1 className="mt-2 text-3xl font-black">Editar produto</h1>
      </div>
      <ProductForm product={product} mode="edit" />
    </section>
  );
}
