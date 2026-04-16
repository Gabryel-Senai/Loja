import Header from '@/components/header';
import AdminSidebar from '@/components/admin-sidebar';

export default function AdminLayout({ children }) {
  return (
    <>
      <Header />
      <main className="container-page grid gap-6 py-8 lg:grid-cols-[280px_1fr]">
        <AdminSidebar />
        <div>{children}</div>
      </main>
    </>
  );
}
