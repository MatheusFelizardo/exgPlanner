const endpoint = 'http://localhost:3333/api'

export const handleUserLogin = async (user: string, password: string) => {
  const query = `mutation{userLogin(email: "${user}" password: "${password}") {ok error data {name,email,token}}}`
    
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
  const query = `mutation{getUserByToken(token: "${token}") {ok error data {name, email, token}}}`

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