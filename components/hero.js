import Link from 'next/link';

export default function Hero() {
  return (
    <section className="bg-hero text-white">
      <div className="container-page grid min-h-[560px] items-center gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
            Nova coleção feminina 2026
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Sua loja de roupas com visual elegante, gestão simples e experiência premium.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">
            Layout futurista, cards com destaque ao passar o mouse, catálogo responsivo e painel administrativo para cadastrar, editar e controlar preços, estoque e status dos produtos.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#produtos" className="btn-primary">
              Ver produtos
            </Link>
            <Link href="/admin" className="btn-secondary border-white/20 bg-white/10 text-white hover:border-white/40 hover:text-white">
              Painel da loja
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            'Frete grátis acima de R$ 599',
            '6x sem juros',
            'Desconto no Pix',
            'Troca facilitada'
          ].map((item) => (
            <div key={item} className="rounded-[28px] border border-white/15 bg-white/10 p-6 backdrop-blur-xl">
              <p className="text-lg font-bold">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
