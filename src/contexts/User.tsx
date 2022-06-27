import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react'


interface UserProps {
    name: string | null
    email: string | null
    token: string | null
}

interface UserContextProps {
    user: UserProps 
    setUser: (user: UserProps) => void
}

interface UserProviderProps {
    children: ReactNode;
  }

export const UserContext = createContext({} as UserContextProps);

export const User = ({children}: UserProviderProps) => {
    const [user, setUser] = useState<UserProps>({name: null, email: null, token: null})

    const value = useMemo(()=> {
        return {
            user,
            setUser
        }
    }, [user])

  return (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
  )
}
