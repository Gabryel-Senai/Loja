import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-soft">
        <h1 className="text-4xl font-black">Página não encontrada</h1>
        <p className="mt-4 text-slate-500">A rota que você tentou abrir não existe ou foi removida.</p>
        <Link href="/" className="btn-primary mt-6">
          Voltar para a home
        </Link>
      </div>
    </main>
  );
}
