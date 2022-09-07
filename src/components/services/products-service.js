
// const backend_url = "http://192.168.3.20:3001/"
const backend_url = "https://e-commerce-bravesa-backend.herokuapp.com/"

const url_lista = "lista_produtos"
const url_add = "adicionar_produto"
const url_find = "encontrar_produto"
const url_mod = "modificar_produto"
const url_del = "deletar_produto"

const headersOptions = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS'
}

export async function lista_produtos(){
  return await fetch(backend_url + url_lista, {
    method: 'GET',
    headers: headersOptions,
    mode: 'cors'
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}

export async function adicionar_produto(data){
  const product = {
    "id_produto": data
  }
  return await fetch(backend_url + url_add, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(product)
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}

export async function encontrar_produto(data){
  const product = {
    "id_produto": data
  }
  return await fetch(backend_url + url_find, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(product)
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}

export async function modificar_produto(data){
  const product = {
    "id_produto": data
  }
  return await fetch(backend_url + url_mod, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(product)
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}

export async function deletar_produto(data){
  const product = {
    "id_produto": data
  }
  return await fetch(backend_url + url_del, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(product)
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}