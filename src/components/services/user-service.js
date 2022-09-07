
// const backend_url = "http://192.168.3.20:3001/"
const backend_url = "https://e-commerce-bravesa-backend.herokuapp.com/"

const url_lista = "lista_usuarios"
const url_add = "adicionar_usuario"
const url_find = "encontrar_usuario"
const url_mod = "modificar_usuario"
const url_del = "deletar_usuario"

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

export async function adicionar_usuario(data){
  return await fetch(backend_url + url_add, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(data)
  })
  .then((resp) => {
    if(resp.ok === true){
      return true
    }else{
      return false
    }
  })
}

export async function encontrar_usuario(data){
  const user = {
    "email": data
  }
  return await fetch(backend_url + url_find, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(user)
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
  .then((resp) => {
    if(resp.ok === true){
      return true
    }else{
      return false
    }
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
  .then((resp) => {
    if(resp.ok === true){
      return true
    }else{
      return false
    }
  })
}
