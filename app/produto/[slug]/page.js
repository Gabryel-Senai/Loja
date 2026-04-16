import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { createClient } from '@/lib/supabase-server';
import { formatPrice } from '@/lib/utils';

export default async function ProductDetailsPage({ params }) {
  const supabase = createClient();
  const { data: product } = await supabase.from('products').select('*').eq('slug', params.slug).single();

  if (!product) {
    return (
      <>
        <Header />
        <main className="container-page py-16">
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center shadow-soft">
            <h1 className="text-3xl font-black">Produto não encontrado</h1>
            <Link href="/" className="btn-primary mt-6">
              Voltar para a loja
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container-page py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-4 shadow-soft">
            <Image
              src={product.image_url}
              alt={product.name}
              width={1200}
              height={1400}
              className="h-full w-full rounded-[28px] object-cover"
            />
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-soft">
            <span className="rounded-full bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
              {product.category}
            </span>
            <h1 className="mt-4 text-4xl font-black text-slate-900">{product.name}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>

            <div className="mt-8 space-y-2">
              <p className="text-4xl font-black text-slate-900">{formatPrice(product.price)}</p>
              {product.compare_price ? <p className="text-lg text-slate-400 line-through">{formatPrice(product.compare_price)}</p> : null}
              <p className="text-sm text-slate-500">Estoque disponível: {product.stock}</p>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-sm font-semibold text-slate-700">Tamanhos</p>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <span key={size} className="rounded-2xl border border-slate-200 px-4 py-2 font-semibold text-slate-700">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="btn-primary">Comprar no WhatsApp</button>
              <Link href="/" className="btn-secondary">
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
