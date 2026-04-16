import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';

export default function ProductCard({ product }) {
  return (
    <article className="card-product group">
      <div className="relative overflow-hidden rounded-[24px] bg-slate-100">
        <Image
          src={product.image_url}
          alt={product.name}
          width={800}
          height={1000}
          className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800">
          {product.category}
        </div>
      </div>

      <div className="space-y-3 px-2 pb-2 pt-5">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-2xl font-black text-slate-900">{formatPrice(product.price)}</p>
            <p className="text-sm text-slate-500">Estoque: {product.stock}</p>
          </div>
          <Link href={`/produto/${product.slug}`} className="btn-secondary px-4 py-2 text-sm">
            Ver mais
          </Link>
        </div>
      </div>
    </article>
  );
}
