import { InfosToSaveProps } from "@App/utils/types"
import { endpoint } from "."

export const saveInfos = async ({user, country, currentBudget, expense, totalCost, travelDate}: InfosToSaveProps  ) => {
  const query =  `mutation{
    saveInfo(
      user:"${user}", 
      country: "${country}", 
      currentBudget: {
        value: "${currentBudget.value}", 
        coin: "${currentBudget.coin}", 
      }, 
      expense: ${expense && expense.length > 0 ? expense : '[]'}, 
      totalCost: {
        value: "${totalCost.value}",
        coin: "${totalCost.coin}"
      }, 
      travelDate: "${travelDate}") {
      ok error data {
        _id, country, currentBudget{value, coin}, expense{type,value,description}, totalCost{value,coin}, travelDate
      }
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

export const getInfoByUserId = async (userId: string) => {
  const query = `mutation{
    getInfoByUserId(id: "${userId}") {
        ok error data {
          _id, country, currentBudget{value, coin}, expense{type,value,description}, totalCost{value,coin}, travelDate
        }
      }
    }
  `

  const api = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({query})
  })
  
  const { data } = await api.json()
  const response = data.getInfoByUserId

  return response
}