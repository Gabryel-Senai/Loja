'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-browser';
import { CATEGORIES, SIZES } from '@/lib/constants';
import { slugify } from '@/lib/utils';

const initialState = {
  name: '',
  category: 'Vestidos',
  price: '',
  compare_price: '',
  stock: 0,
  featured: false,
  active: true,
  image_url: '',
  description: '',
  sizes: ['P', 'M', 'G']
};

export default function ProductForm({ product, mode = 'create' }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    ...initialState,
    ...product,
    sizes: product?.sizes?.length ? product.sizes : initialState.sizes
  });

  function updateField(e) {
    const { name, value, type, checked } = e.target;
    setForm((old) => ({
      ...old,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function toggleSize(size) {
    setForm((old) => ({
      ...old,
      sizes: old.sizes.includes(size)
        ? old.sizes.filter((item) => item !== size)
        : [...old.sizes, size]
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      name: form.name,
      slug: slugify(form.name),
      category: form.category,
      price: Number(form.price),
      compare_price: form.compare_price ? Number(form.compare_price) : null,
      stock: Number(form.stock),
      featured: Boolean(form.featured),
      active: Boolean(form.active),
      image_url: form.image_url,
      description: form.description,
      sizes: form.sizes
    };

    try {
      let error;

      if (mode === 'edit') {
        ({ error } = await supabase.from('products').update(payload).eq('id', product.id));
      } else {
        ({ error } = await supabase.from('products').insert(payload));
      }

      if (error) throw error;

      router.push('/admin');
      router.refresh();
    } catch (error) {
      setMessage(error.message || 'Erro ao salvar o produto.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmDelete = window.confirm('Deseja mesmo excluir este produto?');
    if (!confirmDelete) return;

    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.from('products').delete().eq('id', product.id);
      if (error) throw error;
      router.push('/admin');
      router.refresh();
    } catch (error) {
      setMessage(error.message || 'Não foi possível excluir.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-[28px] border border-slate-200 bg-white p-6 shadow-soft">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Nome do produto</label>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Ex: Vestido Aurora"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Categoria</label>
          <select
            name="category"
            value={form.category}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          >
            {CATEGORIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Preço</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Preço promocional antigo</label>
          <input
            name="compare_price"
            type="number"
            min="0"
            step="0.01"
            value={form.compare_price || ''}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Opcional"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Estoque</label>
          <input
            name="stock"
            type="number"
            min="0"
            value={form.stock}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">URL da imagem</label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={updateField}
            className="w-full rounded-2xl border border-slate-200 px-4 py-3"
            placeholder="Cole a URL da foto"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Descrição</label>
        <textarea
          name="description"
          value={form.description}
          onChange={updateField}
          rows={5}
          className="w-full rounded-2xl border border-slate-200 px-4 py-3"
          placeholder="Descreva o produto, tecido, caimento, ocasião de uso e detalhes importantes"
          required
        />
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-700">Tamanhos disponíveis</p>
        <div className="flex flex-wrap gap-3">
          {SIZES.map((size) => (
            <button
              type="button"
              key={size}
              onClick={() => toggleSize(size)}
              className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${form.sizes.includes(size) ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input name="featured" type="checkbox" checked={form.featured} onChange={updateField} />
          <span className="text-sm font-medium text-slate-700">Destacar na home</span>
        </label>

        <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
          <input name="active" type="checkbox" checked={form.active} onChange={updateField} />
          <span className="text-sm font-medium text-slate-700">Produto ativo</span>
        </label>
      </div>

      {message ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p> : null}

      <div className="flex flex-wrap gap-3">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Salvando...' : mode === 'edit' ? 'Salvar alterações' : 'Cadastrar produto'}
        </button>

        {mode === 'edit' ? (
          <button type="button" className="btn-secondary" onClick={handleDelete} disabled={loading}>
            Excluir produto
          </button>
        ) : null}
      </div>
    </form>
  );
}
