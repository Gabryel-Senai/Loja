import './globals.css';

export const metadata = {
  title: 'Aurora Femme',
  description: 'Loja feminina moderna com Next.js, Tailwind e Supabase.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
