/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { getUserDataByToken } from '@App/api/login'
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import Router from 'next/router'
import { getInfoByUserId } from '@App/api/info'
import { InfosToSaveProps } from '@App/utils/types'

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
    checkIfHasInfoSaved: (user: string) => Promise<{data: InfosToSaveProps}>
    redirectToDashboard: () => void
    redirectToStartPage: () => void
    initialUserObject: UserProps
}

interface UserProviderProps {
    children?: ReactNode;
  }

export const UserContext = createContext({} as UserContextProps);

export const User = ({children}: UserProviderProps) => {
  const initialUserObject = {name: null, email: null, token: null, _id: null}
  const [user, setUser] = useState<UserProps>(initialUserObject)
  const [isLoading, setIsLoading] = useState(true)

  const checkIfHasInfoSaved = async(id: string) => {
    if (!id) return 
    
    const { data } = await getInfoByUserId(id)
    
    return data
  }

  const redirectToDashboard = useCallback(():void => {
    setTimeout(() => {
      Router.push('/dashboard')
      setIsLoading(false)
    }, 2000)
  }, [])

  const redirectToStartPage = useCallback(():void => {
    setTimeout(() => {
      Router.push('/start')
      setIsLoading(false)
    }, 2000)
  }, [])

  useEffect(() => {
    const token:string|null = window.localStorage.getItem('token')

    const getUser = async(token: string) => {
      const response = await getUserDataByToken(token)
      const { data } = response.data.getUserByToken
      setUser(data)

      
      if(data) {
        const info = await checkIfHasInfoSaved(data._id)
        if (info) {
          redirectToDashboard()
          return 
        }

        redirectToStartPage()
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
      isLoading,
      redirectToDashboard,
      redirectToStartPage,
      checkIfHasInfoSaved,
      initialUserObject
    }
  }, [user, isLoading])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
