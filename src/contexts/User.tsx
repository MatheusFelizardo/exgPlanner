/* eslint-disable no-unused-vars */
import { getUserDataByToken } from '@App/api/login'
import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import Router from 'next/router'
import { getInfoByUserId } from '@App/api/info'

interface UserProps {
  _id: string | null
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
  const [user, setUser] = useState<UserProps>({name: null, email: null, token: null, _id: null})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token:string|null = window.localStorage.getItem('token')

    const getUser = async(token: string) => {
      const response = await getUserDataByToken(token)
      const { data } = response.data.getUserByToken
      
      setUser(data)
      console.log(data)

      
      if(data) {
        const { data: infos } = await getInfoByUserId(data._id)
        console.log(infos)

        if (infos) {
          setTimeout(() => {
            Router.push('/dashboard')
            setIsLoading(false)
          }, 2000)

          return 
        }

        setTimeout(() => {
          Router.push('/start')
          setIsLoading(false)
        }, 2000)
      } else {
        setTimeout(() => {
          setIsLoading(false)
        }, 2000)
      }

      return
    }

    if(token) {
      getUser(token)
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
