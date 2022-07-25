import { Budget } from "./types"

export interface DetinationProps {
  country: string
  currency: string
}

export const destinationOptions:DetinationProps[] = [
  {
    country: "United States",
    currency: "USD"
  },
  {
    country: "Canada",
    currency: "CAD"
  },
  {
    country: "Ireland",
    currency: "EUR"
  },
  {
    country: "France",
    currency: "EUR"
  },
  {
    country: "United Kingdom",
    currency: "GBP"
  },
  {
    country: "Australia",
    currency: "AUD"
  },
]

export const mockedBudgets =[
  {
    name: 'Visa',
    description: 'Adding value needed to ireland visa',
    value: '400.00',
  },
  {
    name: 'Deposit',
    description: 'Buying dolar',
    value: '900.00',
    increment: true
  },
  {
    name: 'Clothes',
    description: 'Value to buy clothes after arrive',
    value: '600.00'
  },
  {
    name: 'Deposit',
    description: 'Buying dolar',
    value: '950.00',
    increment: true
  },
  {
    name: 'Deposit',
    description: 'Buying dolar',
    value: '600.00',
    increment: true
  },
  {
    name: 'Rent',
    description: 'First month rent',
    value: '800.00'
  }
]