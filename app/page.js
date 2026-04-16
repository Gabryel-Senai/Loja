"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { getProducts } from "@/services/products"
import AuthButton from "@/components/AuthButton"

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      setLoading(true)
      setError("")
      const data = await getProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error("Erro ao carregar produtos:", err)
      setError("Não foi possível carregar os produtos.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-white/30 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <Link href="/" className="block">
            <h1 className="text-2xl font-black tracking-tight text-slate-950 md:text-3xl">
              Aurora Femme
            </h1>
            <p className="text-xs uppercase tracking-[0.28em] text-rose-500 md:text-sm">
              Moda feminina sofisticada
            </p>
          </Link>

          <nav className="hidden gap-8 md:flex">
            <a
              href="#inicio"
              className="text-sm font-medium text-slate-600 transition hover:text-rose-500"
            >
              Início
            </a>
            <a
              href="#colecao"
              className="text-sm font-medium text-slate-600 transition hover:text-rose-500"
            >
              Coleção
            </a>
            <a
              href="#beneficios"
              className="text-sm font-medium text-slate-600 transition hover:text-rose-500"
            >
              Benefícios
            </a>
            <Link
              href="/checkout"
              className="text-sm font-medium text-slate-600 transition hover:text-rose-500"
            >
              Checkout
            </Link>
          </nav>

          <AuthButton />
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.14),_transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
          <div className="flex flex-col justify-center">
            <span className="mb-4 inline-flex w-fit rounded-full border border-rose-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-rose-500 shadow-sm">
              Nova coleção
            </span>

            <h2 className="max-w-xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              Elegância moderna para mulheres que gostam de marcar presença.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 md:text-lg">
              Descubra peças femininas com estilo sofisticado, caimento impecável
              e visual marcante para o dia a dia ou ocasiões especiais.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#colecao"
                className="rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-rose-500"
              >
                Ver coleção
              </a>

              <Link
                href="/login"
                className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:scale-105 hover:border-rose-300 hover:text-rose-500"
              >
                Criar conta
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-[28px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80"
                alt="Moda feminina"
                className="h-full min-h-[260px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>

            <div className="mt-10 overflow-hidden rounded-[28px] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                alt="Coleção feminina"
                className="h-full min-h-[260px] w-full object-cover transition duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="beneficios" className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            ["Frete grátis", "Acima de R$ 299,00"],
            ["Parcele em até 6x", "Sem juros no cartão"],
            ["5% de desconto", "Pagando no Pix"],
            ["Troca garantida", "Mais segurança na compra"],
          ].map(([title, subtitle]) => (
            <div
              key={title}
              className="rounded-[26px] border border-white/50 bg-white/80 p-5 shadow-md backdrop-blur"
            >
              <h3 className="text-base font-black text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="colecao" className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-rose-500">
              Produtos
            </p>
            <h3 className="mt-2 text-3xl font-black text-slate-950 md:text-4xl">
              Nossa vitrine
            </h3>
          </div>

          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Uma seleção de peças femininas com visual moderno, detalhes elegantes
            e um layout pensado para destacar cada produto.
          </p>
        </div>

        {loading && (
          <div className="rounded-[28px] bg-white p-6 shadow-md">
            Carregando produtos...
          </div>
        )}

        {error && (
          <div className="rounded-[28px] bg-red-100 p-6 text-red-700 shadow-md">
            {error}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="rounded-[28px] bg-white p-6 shadow-md">
            <p className="text-lg font-bold">Nenhum produto encontrado.</p>
            <p className="mt-2 text-slate-500">
              O site abriu corretamente, mas ainda não há produtos visíveis para listar.
            </p>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[30px] border border-white/60 bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.imagem_url || "https://placehold.co/600x800?text=Produto"}
                    alt={product.nome || "Produto"}
                    className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-500 shadow">
                    {product.categoria || "Moda"}
                  </div>
                </div>

                <div className="p-5">
                  <h4 className="text-xl font-black text-slate-950">
                    {product.nome || "Sem nome"}
                  </h4>

                  <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">
                    Peça selecionada para uma composição feminina elegante e moderna.
                  </p>

                  <div className="mt-5 flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-black text-slate-950">
                        R$ {Number(product.preco || 0).toFixed(2)}
                      </p>
                      <p className="mt-1 text-sm text-slate-400">
                        Estoque: {product.estoque ?? 0}
                      </p>
                    </div>

                    <Link
                      href={`/checkout?produto=${product.id}`}
                      className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                    >
                      Comprar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <footer
        id="contato"
        className="mt-12 border-t border-white/50 bg-white/70 backdrop-blur-xl"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4 md:px-6">
          <div>
            <h4 className="text-2xl font-black text-slate-950">Aurora Femme</h4>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Moda feminina sofisticada com presença digital moderna e elegante.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
              Navegação
            </h5>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <a href="#inicio" className="hover:text-rose-500">Início</a>
              <a href="#colecao" className="hover:text-rose-500">Coleção</a>
              <a href="#beneficios" className="hover:text-rose-500">Benefícios</a>
              <Link href="/login" className="hover:text-rose-500">Login</Link>
              <Link href="/checkout" className="hover:text-rose-500">Checkout</Link>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
              Atendimento
            </h5>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-500">
              <p>WhatsApp: (19) 99999-9999</p>
              <p>Email: contato@aurorafemme.com</p>
              <p>Campinas - SP</p>
            </div>
          </div>

          <div>
            <h5 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800">
              Novidades
            </h5>
            <p className="mt-4 text-sm leading-6 text-slate-500">
              Receba tendências, lançamentos e promoções da loja.
            </p>
            <div className="mt-4 flex gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-rose-400"
              />
              <button className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}