import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import LoginImage from '../assets/img/login_image.svg'
import GoogleIcon from '../assets/img/google-logo.svg'
import {handleSaveOnLocalStorage, testEmail} from '../utils/utils'
import { handleUserLogin } from '../api/login'
import {MdOutlineVisibility, MdOutlineVisibilityOff, MdAlternateEmail, MdOutlineLock} from 'react-icons/md'
import Image from 'next/image'
import { EventProps } from '@App/utils/types'
import Link from 'next/link'
import { UserContext } from '@App/contexts/User'
import { useRouter } from 'next/router'
import { Button } from './Button/Button'


function LoginScreen() {
  const { setUser, isLoading, user } = useContext(UserContext)
  const router = useRouter()

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showErrorMsg, setShowErrorMsg] = useState<{email?: string, password?: string}>({email: '', password: ''})
  const [passType, setPassType] = useState('password')
  const [showPassword, setShowPassword] = useState(false)
  

  const handleLogin = async (e:EventProps) => {
    e.preventDefault()
    const error:{email?: string, password?: string} = {}

    const isEmailValid = testEmail(login)

    if(!isEmailValid) error.email = 'Please type a valid email'

    if (password === '') error.password = 'Password cannot be empty'

    if(Object.keys(error).length) {
      return setShowErrorMsg(error)
    }

    if (isEmailValid && password !== '') {
      const response= await handleUserLogin(login, password)
      const { error, data } = await response.data.userLogin

      if (error) {
        return setShowErrorMsg({password: error})
      }

      setUser(data)
      handleSaveOnLocalStorage('token', data.token)
      handleSaveOnLocalStorage('user', data.user)
      router.push('/start')
    }

  }

  const handleInputEmail = (e:EventProps) => {
    setShowErrorMsg({...showErrorMsg, email: ''})
    setLogin(e.target.value)
  }

  const handleInputPassword = (e:EventProps) => {
    setShowErrorMsg({...showErrorMsg, password: ''})
    setPassword(e.target.value)
  }

  return (
    <>
      {isLoading ? 
        <LoginContainer>
          <MainImageWrapper>
            <Image src={LoginImage} alt="Woman holding the world" />  
          </MainImageWrapper>
          <LoginWrapper>
            <LoadingWrapper>
              <LoadingText>
                <TextWithAnimation delay="100" color="#00BFA6">L</TextWithAnimation>
                <TextWithAnimation delay="200" color="#00BFA6">O</TextWithAnimation>
                <TextWithAnimation delay="300" color="#00BFA6">A</TextWithAnimation>
                <TextWithAnimation delay="400" color="#00BFA6">D</TextWithAnimation>
                <TextWithAnimation delay="500" color="#00BFA6">I</TextWithAnimation>
                <TextWithAnimation delay="600" color="#00BFA6">N</TextWithAnimation>
                <TextWithAnimation delay="700" color="#00BFA6">G</TextWithAnimation>


                <DotContainer>
                  <TextWithAnimation className="dot" delay="800" color="#00BFA6"></TextWithAnimation>
                  <TextWithAnimation className="dot" delay="900" color="#00BFA6"></TextWithAnimation>
                  <TextWithAnimation className="dot" delay="1000" color="#00BFA6"></TextWithAnimation>
                </DotContainer>
              </LoadingText>
            </LoadingWrapper>
          

          </LoginWrapper>
        </LoginContainer>
        : 
        (!user?.email && 
          <LoginContainer>
            <MainImageWrapper>
              <Image src={LoginImage} alt="Woman holding the world" />  
            </MainImageWrapper>


            <LoginWrapper>
              <h2>Login</h2>
              <LoginForm>

                <CustomInput>
                  <MdAlternateEmail />
                  <input 
                    id="login"
                    type="email" 
                    placeholder="Login" 
                    value={login} 
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

                <Link href="/forgot">
                  <ResetPasswordLink>Forgot your password?</ResetPasswordLink>
                </Link>

                <Button 
                  as="button" 
                  bg='#00BFA6' 
                  fontColor='#FFF' 
                  size={2} 
                  margin={'4.1rem 0 3.5rem'} 
                  onClick={(e:any)=> handleLogin(e)}>
                  Login
                </Button>

              </LoginForm>
            </LoginWrapper>

            <OrWrapper>OR</OrWrapper>

            <div className="google-btn-wrapper">
              <Button bg='#E6E6E6' fontColor='#000' size={1.4} margin={'5.6rem 0 2.2rem'}>
                <GoogleIconWrapper>
                  <Image src={GoogleIcon} alt="Google Logo" />
                </GoogleIconWrapper>
                <span>Login with Google</span>
              </Button>

            </div>

            <CreateAccountWrapper>
              New to exgPlanner? <Link href="/register"><a >Register</a></Link>
            </CreateAccountWrapper>

          </LoginContainer>
        )
      }
    </>
  )
}

export default LoginScreen




const LoginContainer = styled.div`
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
        color: #333;
        font-weight: 500;
    }
`

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
`

const ResetPasswordLink = styled.a`
    color: #00BFA6;
    align-self: flex-end;
    font-size: 1.4rem;
`

const GoogleIconWrapper = styled.div`
    position: absolute;
    left: 2.2rem;
`

const CustomInput = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 2.5rem;
    width: 100%;
    gap: .5rem;
    position: relative;
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
    right: 1rem;

    svg {
        font-size:2rem;
    }
`

const FormError = styled.div`
    color:#ff0033;
    font-size: 1.2rem;
`

const LoadingWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 10px;

  svg {
    font-size: 3rem;
  }

  p {
    display: flex;
  }
`

interface TextWithAnimationProps {
  delay: string | number
  color?: string
}

const TextWithAnimation = styled.span<TextWithAnimationProps>`
  animation: jump 1s infinite;
  animation-delay: ${props => props.delay}ms;
  -webkit-animation-delay: ${props => props.delay}ms;
  position: relative;
  font-size: 3rem;
  color: ${props => props.color || '#22303e'};

  &.dot {
    width: 8px;
    height: 8px;
    background: ${props => props.color || '#22303e'};
    display: flex;
    border-radius: 50%;
    margin: 0 2px 8px;
    
  }


  @keyframes jump {
    0%   {bottom: 0px;}
    20%  {bottom: 5px;}
    40%  {bottom: 0px;}
  }
`

const DotContainer = styled.div`
  display: flex;
  height: fit-content;
`

const LoadingText = styled.div`
  display: flex;
  align-items: flex-end;
`