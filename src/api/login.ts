import { endpoint } from "."

export const handleUserLogin = async (user: string, password: string) => {
  const query = `mutation{userLogin(email: "${user}" password: "${password}") {ok error data {_id, name,email,token}}}`
    
  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })

  const response = await data.json()
  return response
}

export const signUp = async (name: string, user: string, password: string) => {
  const query = `mutation{signUp(name: "${name}" email: "${user}" password: "${password}" ) {ok error data{name,email,password}}}`

  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })

  const response = await data.json()

  return response
}

export const getUserDataByToken = async(token: string) => {
  const query = `mutation{getUserByToken(token: "${token}") {ok error data {_id, name, email, token}}}`

  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })

  const response = await data.json()
  return response
}

export const handleUserById = async (id: string) => {
  const query = `query {
    user(id: "${id}") {
      name, email
    }
  }`
    
  const data = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })

  const response = await data.json()
  return response
}
