import { endpoint } from "."

export const saveInfo = async (user: string, country: string, currentBudget: string, expenses: string[], totalCost: string, travelDate: string  ) => {
  const query =  `mutation{
    saveInfo(
      user:"${user}", 
      country: "${country}", 
      currentBudget: "${currentBudget}", 
      expense: "${expenses}", 
      totalCost: "${totalCost}", 
      travelDate: "${travelDate}") {
      ok error data {
        _id, country, currentBudget, expense, totalCost, travelDate
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