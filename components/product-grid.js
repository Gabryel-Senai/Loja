import ProductCard from './product-card';

export default function ProductGrid({ products }) {
  if (!products?.length) {
    return (
      <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-12 text-center shadow-soft">
        <h3 className="text-2xl font-bold">Nenhum produto cadastrado ainda</h3>
        <p className="mt-3 text-slate-500">
          Entre no painel da loja e cadastre seus primeiros produtos para preencher a vitrine.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
