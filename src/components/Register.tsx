import { ReactElement, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LoginImage from '../assets/img/login_image.svg'

import {MdOutlineVisibility, MdOutlineVisibilityOff, MdAlternateEmail, MdOutlineLock, MdPerson, MdLogout} from 'react-icons/md'
import Image from 'next/image'
import { EventProps } from '@App/utils/types'
import Link from 'next/link'
import { handleSaveOnLocalStorage, testEmail } from '../utils/utils'
import { handleUserLogin, signUp } from '@App/api/login'
import { Button } from './Button/Button'
import { useRouter } from 'next/router'
import { UserContext } from '@App/contexts/User'

interface UserLoginProps {
    email?: string | ReactElement
    password?: string
    name?:string
}

const Register = () => {

  const { setUser } = useContext(UserContext)
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState<UserLoginProps>({name: '', email: '', password: ''})
  const [passType, setPassType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (e:EventProps) => {
    e.preventDefault()
    const error:{name?: string, email?: string, password?: string} = {}

    const isEmailValid = testEmail(email)

    if(!isEmailValid) error.email = 'Please type a valid email'

    if (password === '') error.password = 'Password cannot be empty'
    if (name === '') error.name = 'Name cannot be empty'

    if(Object.keys(error).length) {
      return setShowErrorMsg(error)
    }

    if (isEmailValid && password !== '') {
      const response = await signUp(name,email, password)
      const { error, data } = await response.data.signUp
            
      if (error) {
        const element = <span>{error}. If you forgot your password <Link href="/forgot"><a>click here.</a></Link></span>

        return setShowErrorMsg({email: element})
      }

      setUser(data)

      const newUserData = await handleUserLogin(data.login, password)
      handleSaveOnLocalStorage('token', newUserData.token)
      handleSaveOnLocalStorage('user', newUserData.user)
      
      router.push('/start')
    }
  }

  const handleInputEmail = (e:EventProps) => {
    setShowErrorMsg({...showErrorMsg, email: ''})
    setEmail(e.target.value)
  }
  const handleInputPassword = (e:EventProps) => {
    setShowErrorMsg({...showErrorMsg, password: ''})
    setPassword(e.target.value)
  }
  const handleInputName = (e:EventProps) => {
    setShowErrorMsg({...showErrorMsg, name: ''})
    setName(e.target.value)
  }

  return (
    <CreateAccountContainer>
      <BackToLoginWrapper>
        <Link href="/">
          <a>Back to Login</a>
        </Link>
      </BackToLoginWrapper>
        
      <CreateAccountWrapper>
        <MainImageWrapper>
          <Image src={LoginImage} alt="Woman holding the world" />  
        </MainImageWrapper>
            
        <LoginWrapper>
          <h2>Create account</h2>
          <LoginForm>
            
            <CreateAccountMessage>
              Please fill all fields to create your account.
            </CreateAccountMessage>

            <CustomInput>
              <MdPerson />
              <input 
                id="name"
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={handleInputName} 
              />
            </CustomInput>
            {showErrorMsg.name && <FormError>{showErrorMsg.name}</FormError> }

            <CustomInput>
              <MdAlternateEmail />
              <input 
                id="login"
                type="email" 
                placeholder="Email"  
                value={email} 
                onChange={handleInputEmail} 
              />
            </CustomInput>
            {showErrorMsg.email && <FormError>{showErrorMsg.email}</FormError> }

            <CustomInput>
              <MdOutlineLock />
              <input 
                id="password" 
                type={passType} 
                placeholder="Password" 
                value={password} 
                onChange={handleInputPassword} 
              />
              { 
                password ? 
                  showPassword ? 
                    <PasswordIconWrapper>
                      <MdOutlineVisibility onClick={()=> {
                        setShowPassword(state => !state) 
                        setPassType('password')}
                      }/> 
                    </PasswordIconWrapper> : 
                    <PasswordIconWrapper>
                      <MdOutlineVisibilityOff onClick={()=> {
                        setShowPassword(state => !state)
                        setPassType('text')
                      }} /> 
                    </PasswordIconWrapper>
                  : null
              }
            </CustomInput>
            {showErrorMsg.password && <FormError>{showErrorMsg.password}</FormError> }

            <Button 
              as="button" 
              bg='#00BFA6' 
              fontColor='#FFF' 
              size={2} 
              margin={'4.5rem 0 2rem'} 
              onClick={(e:any)=> handleRegister(e)}
            > 
              Create account
            </Button>

          </LoginForm>
        </LoginWrapper>
      </CreateAccountWrapper>
    </CreateAccountContainer>
  )
}

export default Register

const CreateAccountContainer = styled.div`
    min-height: 100vh;
`

const CreateAccountWrapper = styled.div`
    padding: 0 2.2rem;
`

const CreateAccountMessage = styled.p`
    margin-bottom: 0.5rem;
`
const MainImageWrapper = styled.div`
    margin: 6.5rem auto 7.1rem;
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
const CustomInput = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 2.5rem;
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
const PasswordIconWrapper = styled.div`
    position: absolute;
    right: 2.4rem;

    svg {
        font-size:2rem;
    }
`
const FormError = styled.div`
    color:#ff0033;
    font-size: 1.2rem;

    span, a {
        color:#333;
        font-size: 1.2rem;
    }

    a {
        color: #00BFA6;
    }

`
