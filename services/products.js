import { supabase } from "@/lib/supabaseClient"

export async function getProducts() {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("ativo", true)

  if (error) {
    console.error("Erro Supabase:", error)
    throw error
  }

  return data
}

export async function getProductById(id) {
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Erro ao buscar produto:", error)
    throw error
  }

  return data
}

export async function createProduct(product) {
  const { data, error } = await supabase
    .from("produtos")
    .insert([product])
    .select()

  if (error) throw error
  return data
}

export async function updateProduct(id, product) {
  const { data, error } = await supabase
    .from("produtos")
    .update(product)
    .eq("id", id)
    .select()

  if (error) throw error
  return data
}

export async function deleteProduct(id) {
  const { error } = await supabase
    .from("produtos")
    .delete()
    .eq("id", id)

  if (error) throw error
}