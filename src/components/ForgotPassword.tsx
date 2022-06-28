import { useEffect, useState } from 'react'
import styled from 'styled-components'
import LoginImage from '../assets/img/login_image.svg'

import {MdOutlineVisibility, MdOutlineVisibilityOff, MdAlternateEmail, MdOutlineLock} from 'react-icons/md'
import Image from 'next/image'
import { EventProps } from '@App/utils/types'
import Link from 'next/link'
import { Button } from './Button/Button'

const ForgotPassword = () => {

  const handleSubmit = (e:EventProps) => {
    e.preventDefault()
    console.log('Logic to recover email')
  }

  return (
    <ResetPasswordContainer>
      <BackToLoginWrapper>
        <Link href="/">
          <a>Back to Login</a>
        </Link>
      </BackToLoginWrapper>


      <ResetPasswordWrapper>
        <MainImageWrapper>
          <Image src={LoginImage} alt="Woman holding the world" />  
        </MainImageWrapper>


        <LoginWrapper>
          <h2>Forgot your password?</h2>
          <LoginForm>
                
            <ForgotMessage>
              Please fill your e-mail and we&apos;ll send you an email to recovery it.
            </ForgotMessage>

            <CustomInput>
              <MdAlternateEmail />
              <input 
                id="email"
                type="email" 
                placeholder="myemail@email.com" 
              />
            </CustomInput>
            
            <Button as="button" bg='#00BFA6' fontColor='#FFF' size={2} margin={'4.5rem 0'} onClick={(e:any)=> handleSubmit(e)}>Reset</Button>

          </LoginForm>
        </LoginWrapper>

        <OrWrapper>OR</OrWrapper>

        <CreateAccountWrapper>
          New to exgPlanner? <Link href="/register"><a >Register</a></Link>
        </CreateAccountWrapper>
      </ResetPasswordWrapper>
    </ResetPasswordContainer>
  )
}

export default ForgotPassword




const ResetPasswordContainer = styled.div`
    min-height: 100%;
`

const ResetPasswordWrapper = styled.div`
    padding: 0 2.2rem 2rem;
`

const CreateAccountWrapper = styled.div`
    text-align: center;
    margin-top:3.5rem;
    font-size: 1.4rem;
    a {
        font-size: inherit;
        color: #00BFA6;
    }
`

const ForgotMessage = styled.p`
    margin-bottom: 3rem;
`

const OrWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    font-size: 1.4rem;
    color: #909090;
    &:before {
        content: '';
        width: 15.6rem;
        height: .1rem;
        background: #909090;
    }
    &:after {
        content: '';
        width: 15.6rem;
        height: .1rem;
        background: #909090;
    }
`
const MainImageWrapper = styled.div`
   padding: 6.5rem 0 7.1rem;
    text-align: center;
`
const LoginWrapper = styled.div`
    h2 {
        font-size: 3rem;
        margin-bottom: 3rem;
        color: #333;
        font-weight: 500;
    }
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

const BackToLoginWrapper = styled.div`
    height: 5rem;
    width: 100%;
    background: #b00f47;
    

    a {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        color: #FFF;
        font-size: 1.8rem;
    }
`


const CustomInput = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;
    width: 100%;
    gap: .5rem;

    &:focus-within {
        svg {
            color: #00BFA6;
        }
    }

    svg {
        color: gray;
        font-size: 2.4rem;

        
        
    }

    input {
        width: 100%;
        border: none;
        color: #333;
        border-bottom: .1rem solid rgba(0,0,0, .2);
        padding: .5rem;
        outline: none;

        
        &::placeholder {
            color: #c0c0c0;
        }

        &:focus {
            border-bottom: .1rem solid #00BFA6;
        }
    }
`
