"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { getProductById } from "@/services/products"

export default function Checkout() {
  const searchParams = useSearchParams()
  const produtoId = searchParams.get("produto")

  const [produto, setProduto] = useState(null)
  const [cep, setCep] = useState("")
  const [rua, setRua] = useState("")
  const [bairro, setBairro] = useState("")
  const [cidade, setCidade] = useState("")
  const [uf, setUf] = useState("")
  const [numero, setNumero] = useState("")
  const [loadingProduto, setLoadingProduto] = useState(false)

  useEffect(() => {
    if (produtoId) {
      loadProduct(produtoId)
    }
  }, [produtoId])

  async function loadProduct(id) {
    try {
      setLoadingProduto(true)
      const data = await getProductById(id)
      setProduto(data)
    } catch (error) {
      console.error("Erro ao carregar produto do checkout:", error)
    } finally {
      setLoadingProduto(false)
    }
  }

  async function buscarCep(value) {
    const cepLimpo = value.replace(/\D/g, "")
    setCep(value)

    if (cepLimpo.length !== 8) return

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`)
      const data = await res.json()

      if (data.erro) {
        alert("CEP não encontrado")
        return
      }

      setRua(data.logradouro || "")
      setBairro(data.bairro || "")
      setCidade(data.localidade || "")
      setUf(data.uf || "")
    } catch (error) {
      console.error("Erro ao buscar CEP:", error)
    }
  }

  return (
    <main className="min-h-screen bg-[#f5f7fb] p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm font-semibold text-slate-600 hover:text-rose-500"
          >
            ← Voltar para a loja
          </Link>

          <Link
            href="/login"
            className="text-sm font-semibold text-slate-600 hover:text-rose-500"
          >
            Login
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h1 className="mb-2 text-3xl font-black">Finalizar Compra</h1>
            <p className="mb-6 text-slate-500">
              Preencha seu endereço para continuar.
            </p>

            <div className="grid gap-4">
              <input
                type="text"
                placeholder="CEP"
                value={cep}
                onChange={(e) => buscarCep(e.target.value)}
                className="rounded-xl border p-3"
              />

              <input
                type="text"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                className="rounded-xl border p-3"
              />

              <input
                type="text"
                placeholder="Número"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
                className="rounded-xl border p-3"
              />

              <input
                type="text"
                placeholder="Bairro"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                className="rounded-xl border p-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  className="rounded-xl border p-3"
                />

                <input
                  type="text"
                  placeholder="UF"
                  value={uf}
                  onChange={(e) => setUf(e.target.value)}
                  className="rounded-xl border p-3"
                />
              </div>

              <button className="mt-4 rounded-full bg-slate-950 py-3 font-semibold text-white transition hover:bg-rose-500">
                Continuar para pagamento
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h2 className="mb-4 text-2xl font-black">Resumo do pedido</h2>

            {loadingProduto && (
              <p className="text-slate-500">Carregando produto...</p>
            )}

            {!loadingProduto && !produto && (
              <p className="text-slate-500">
                Nenhum produto selecionado ainda.
              </p>
            )}

            {!loadingProduto && produto && (
              <div className="space-y-4">
                <img
                  src={produto.imagem_url || "https://placehold.co/600x800?text=Produto"}
                  alt={produto.nome || "Produto"}
                  className="h-80 w-full rounded-2xl object-cover"
                />

                <div>
                  <h3 className="text-xl font-black">{produto.nome}</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {produto.categoria || "Moda feminina"}
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Produto</span>
                    <span>R$ {Number(produto.preco || 0).toFixed(2)}</span>
                  </div>

                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Frete</span>
                    <span>A calcular</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t pt-4 text-lg font-black">
                    <span>Total</span>
                    <span>R$ {Number(produto.preco || 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}