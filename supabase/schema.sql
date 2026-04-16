-- Execute este arquivo no SQL Editor do Supabase

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('admin', 'editor', 'customer')),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null,
  description text not null,
  image_url text not null,
  price numeric(10,2) not null default 0,
  compare_price numeric(10,2),
  stock integer not null default 0,
  sizes text[] not null default array['P','M','G']::text[],
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'customer'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
  before update on public.products
  for each row execute procedure public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.products enable row level security;

-- PERFIS
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- PRODUTOS: leitura pública
create policy "products_public_read"
on public.products
for select
using (true);

-- PRODUTOS: admin/editor podem inserir
create policy "products_insert_admin_editor"
on public.products
for insert
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
  )
);

-- PRODUTOS: admin/editor podem atualizar
create policy "products_update_admin_editor"
on public.products
for update
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
  )
)
with check (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role in ('admin', 'editor')
  )
);

-- PRODUTOS: somente admin pode excluir
create policy "products_delete_admin"
on public.products
for delete
using (
  exists (
    select 1
    from public.profiles
    where profiles.id = auth.uid()
      and profiles.role = 'admin'
  )
);

insert into public.products (name, slug, category, description, image_url, price, compare_price, stock, sizes, featured, active)
values
  (
    'Vestido Aurora',
    'vestido-aurora',
    'Vestidos',
    'Vestido sofisticado com caimento leve e visual elegante para ocasiões especiais.',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80',
    289.90,
    329.90,
    12,
    array['P','M','G'],
    true,
    true
  ),
  (
    'Blusa Sienna',
    'blusa-sienna',
    'Blusas',
    'Blusa moderna com toque fashion e acabamento confortável para o dia a dia.',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80',
    199.90,
    239.90,
    18,
    array['P','M','G','GG'],
    true,
    true
  ),
  (
    'Calça Francesca',
    'calca-francesca',
    'Calças',
    'Calça feminina de alfaiataria com proposta contemporânea e visual refinado.',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80',
    349.90,
    null,
    9,
    array['P','M','G'],
    true,
    true
  ),
  (
    'Camisa Luna',
    'camisa-luna',
    'Blusas',
    'Camisa premium com textura elegante e presença marcante para compor looks modernos.',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80',
    259.90,
    299.90,
    15,
    array['PP','P','M','G'],
    false,
    true
  )
on conflict (slug) do nothing;

-- Depois de criar seu primeiro usuário pelo site, rode esta linha trocando o e-mail:
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'seu-email@exemplo.com');
