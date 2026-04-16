import ProductForm from '@/components/product-form';

export const metadata = {
  title: 'Novo produto | Aurora Femme'
};

export default function NewProductPage() {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">Cadastro</p>
        <h1 className="mt-2 text-3xl font-black">Adicionar novo produto</h1>
      </div>
      <ProductForm mode="create" />
    </section>
  );
}
