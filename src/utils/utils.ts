export const testEmail = (email:string) => {
  const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi
  return regex.test(email)

}

export const handleSaveOnLocalStorage = (key:string, value:string) => {
  window.localStorage.setItem(key, value)
}

export const handleGetItemOnLocalStorage = (key:string) => {
  return window.localStorage.getItem(key)
}

export const handleRemoveItemFromLocalStorage = (key:string) => {
  return window.localStorage.removeItem(key)
}

export const convertCoinToUSD = (value: string, coin: number) => {
  const parsedValue = coin > 1 ? Number(value) / coin : Number(value) * coin
  
  return parsedValue.toFixed(2)
}