export default function Footer() {
  return (
    <footer id="contato" className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-10 py-12 md:grid-cols-4">
        <div>
          <h3 className="text-lg font-bold">Aurora Femme</h3>
          <p className="mt-3 text-sm text-slate-600">
            Loja feminina com visual moderno, gerenciamento completo de produtos e experiência elegante em qualquer tela.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Atendimento</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>WhatsApp: (19) 99999-9999</li>
            <li>E-mail: contato@aurorafemme.com</li>
            <li>Campinas - SP</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Benefícios</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Frete grátis acima de R$ 599</li>
            <li>Parcelamento em até 6x</li>
            <li>5% de desconto no Pix</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Tecnologias</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Next.js</li>
            <li>Tailwind CSS</li>
            <li>Supabase Auth + Database</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
