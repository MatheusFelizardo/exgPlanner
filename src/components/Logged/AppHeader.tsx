import { UserContext } from '@App/contexts/User'
import { handleRemoveUserToken } from '@App/utils/utils'
import Link from 'next/link'
import React, { useContext } from 'react'
import { MdLogout, MdPerson } from 'react-icons/md'
import styled from 'styled-components'

const AppHeader = () => {
  const { user } = useContext(UserContext)
  const { name } = user

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
                    <a onClick={handleRemoveUserToken}>
                        <MdLogout />
                    </a>
                </Link>
            </LogoutWrapper>
        </InitialHeader>
  )
}

export default AppHeader


const InitialHeader = styled.div`
    height: 6rem;
    width: 100%;
    background: #b00f47;
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
        color: #FFF;
    }
    svg {
        font-size: 2rem;
        color: #fff;
    }
`
const HeaderItem = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    span {
        color: #FFF;
        margin-top: .3rem;
    }
    svg {
        font-size:3rem;
        color: #fff;
    }
`
const LogoutWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: .5rem;
    span {
        color: #FFF;
        font-size: 1.4rem;
    }
    svg {
        font-size: 2.6rem;
        color: #fff;
    }
`