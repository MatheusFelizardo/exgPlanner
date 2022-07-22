import { UserContext } from '@App/contexts/User'
import { handleRemoveItemFromLocalStorage } from '@App/utils/utils'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MdLogout, MdPerson } from 'react-icons/md'
import styled from 'styled-components'

const AppHeader = () => {
  const { user, setUser, initialUserObject } = useContext(UserContext)
  const { name } = user

  const handleLogout = () => {
    handleRemoveItemFromLocalStorage('token')
    setUser(initialUserObject)
  }

  return (
    <InitialHeader>
      <HeaderItemWrapper>
        <HeaderItem>
          <MdPerson />
          <span>{name}</span>

        </HeaderItem>

      </HeaderItemWrapper>

      <LogoutWrapper>
        <Link href="/">
          <a onClick={handleLogout}>
            <MdLogout />
          </a>
        </Link>
      </LogoutWrapper>
    </InitialHeader>
  )
}

export default AppHeader


const InitialHeader = styled.div`
    height: 6.7rem;
    width: 100%;
    background: #F2F2F2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
`

const HeaderItemWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    span {
        color: #333;
    }
    svg {
        font-size: 2rem;
        color: #333;
    }
`
const HeaderItem = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    span {
        color: #333;
        margin-top: .3rem;
    }
    svg {
        font-size:3rem;
        color: #333;
    }
`
const LogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    span {
        color: #333;
        font-size: 1.4rem;
    }
    svg {
        font-size: 2.6rem;
        color: #333;
    }
`