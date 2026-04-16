# Aurora Femme - Loja feminina com Next.js + Tailwind + Supabase

Projeto completo em JavaScript, com:

- vitrine responsiva
- login com Supabase Auth
- painel administrativo
- CRUD de produtos
- controle de papéis (`admin`, `editor`, `customer`)
- banco de dados no Supabase

## 1) Tecnologias

- Next.js 14
- Tailwind CSS
- Supabase
- JavaScript

## 2) Estrutura de pastas

```bash
loja-feminina-nextjs/
├─ app/
│  ├─ admin/
│  │  ├─ produtos/
│  │  │  ├─ novo/page.js
│  │  │  └─ [id]/editar/page.js
│  │  ├─ layout.js
│  │  └─ page.js
│  ├─ login/page.js
│  ├─ produto/[slug]/page.js
│  ├─ globals.css
│  ├─ layout.js
│  ├─ not-found.js
│  └─ page.js
├─ components/
│  ├─ admin-sidebar.js
│  ├─ footer.js
│  ├─ header.js
│  ├─ hero.js
│  ├─ login-form.js
│  ├─ logout-button.js
│  ├─ product-card.js
│  ├─ product-form.js
│  └─ product-grid.js
├─ lib/
│  ├─ constants.js
│  ├─ supabase-browser.js
│  ├─ supabase-server.js
│  └─ utils.js
├─ supabase/
│  └─ schema.sql
├─ .env.example
├─ jsconfig.json
├─ middleware.js
├─ next.config.mjs
├─ package.json
├─ postcss.config.js
└─ tailwind.config.js
```

## 3) Como rodar no VSCode

### Passo 1 - baixar dependências

No terminal da pasta do projeto:

```bash
npm install
```

### Passo 2 - criar projeto no Supabase

1. Acesse o Supabase.
2. Crie um projeto.
3. Vá em **Project Settings > API**.
4. Copie:
   - `Project URL`
   - `anon public key`

### Passo 3 - configurar `.env.local`

Crie um arquivo chamado `.env.local` na raiz:

```env
NEXT_PUBLIC_SUPABASE_URL=cole_aqui_a_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=cole_aqui_a_chave
```

### Passo 4 - criar tabelas

1. Abra o **SQL Editor** no Supabase.
2. Cole o conteúdo de `supabase/schema.sql`.
3. Execute.

### Passo 5 - rodar projeto

```bash
npm run dev
```

Depois abra no Chrome:

```bash
http://localhost:3000
```

## 4) Como criar o primeiro admin

1. Abra `/login`
2. Clique em **Criar conta**
3. Faça seu cadastro
4. No Supabase, abra o SQL Editor e rode:

```sql
update public.profiles
set role = 'admin'
where id = (
  select id from auth.users where email = 'SEU_EMAIL_AQUI'
);
```

## 5) Regras de acesso

- `customer`: apenas visualiza
- `editor`: cria e edita produtos
- `admin`: cria, edita e exclui

## 6) Observações importantes

- As imagens estão usando URLs externas do Unsplash.
- Para produção, o ideal é subir imagens no Storage do Supabase.
- O painel `/admin` só abre para `admin` e `editor`.
- O CRUD está pronto para cadastro, edição e exclusão.

## 7) Próximas melhorias que você pode pedir

- carrinho
- favoritos
- cupons
- filtro por categoria
- upload de imagem pelo Supabase Storage
- dashboard com gráficos
- pedido por WhatsApp
