/* eslint-disable no-unused-vars */
import { CurrencyProps } from '@App/utils/types';
import { CURRENCY_KEY } from 'env';
import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query';


interface CurrencyContextProps {
    data: any
    isLoading: boolean
    error: unknown
}

interface CurrencyProviderProps {
    children?: ReactNode;
  }

export const CurrencyContext = createContext({} as CurrencyContextProps);

export const Currency = ({children}: CurrencyProviderProps) => {

  const { data, isLoading, error } = useQuery('currency', async () => {
    const response = await fetch(`https://exchange-rates.abstractapi.com/v1/live/?api_key=${CURRENCY_KEY}&base=USD`)
    return await response.json()
  }, 
  { staleTime: 1000 * 60 * 60 * 12 } // 12 hours
  )
  
  const value = useMemo(()=> {
    return {
      data,
      isLoading,
      error
    }
  }, [data, isLoading, error])

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useCurrency = () => {
  const { data, isLoading, error } =  useContext(CurrencyContext)
  return { data, isLoading, error } as {data: CurrencyProps, isLoading: boolean, error: boolean }
}