
// const backend_url = "http://192.168.3.20:3001/"
const backend_url = "https://e-commerce-bravesa-backend.herokuapp.com/"

const url_lista = "mostrar_carrinho"
const url_add = "adicionar_item"
const url_mod = "modificar_item"
const url_del = "deletar_item"
const url_del_car = "deletar_carrinho"

const headersOptions = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS'
}

export async function mostrar_carrinho(data){
  return await fetch(backend_url + url_lista, {
    method: 'POST',
    headers: headersOptions,
    mode: 'cors',
    body: JSON.stringify(data)
  })
  .then((resp) => resp.json())
  .then((apiData) => {
    return apiData
  })
}

export async function adicionar_item(data){
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

export async function modificar_item(data){
  return await fetch(backend_url + url_mod, {
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

export async function deletar_item(data){
  return await fetch(backend_url + url_del, {
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

export async function deletar_carrinho(data){
  const product = {
    "id_produto": data
  }
  return await fetch(backend_url + url_del_car, {
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
