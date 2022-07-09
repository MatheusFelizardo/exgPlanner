/* eslint-disable no-unused-vars */
import { getUserDataByToken } from '@App/api/login'
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import Router from 'next/router'

interface UserProps {
    name: string | null
    email: string | null
    token: string | null
}

interface UserContextProps {
    user: UserProps 
    setUser: (user: UserProps) => void
    isLoading: boolean
}

interface UserProviderProps {
    children?: ReactNode;
  }

export const UserContext = createContext({} as UserContextProps);

export const User = ({children}: UserProviderProps) => {
  const [user, setUser] = useState<UserProps>({name: null, email: null, token: null})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async(token: string) => {
      const response = await getUserDataByToken(token)
      const { data } = response.data.getUserByToken

      setUser(data)
    }
    const token:string|null = window.localStorage.getItem('token')

    if(token) {
      getUser(token)
      setTimeout(() => {
        // adjust this logic later will go to /start only if the user never fill the fields on this page.
        // else will go to dashboard
        Router.push('/start')
        setIsLoading(false)
      }, 2000)
    } else {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }
    
  }, [])

  const value = useMemo(()=> {
    return {
      user,
      setUser,
      isLoading
    }
  }, [user, isLoading])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
