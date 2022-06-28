import React, { createRef, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '@App/contexts/User'
import { handleGetUserToken } from '@App/utils/utils'
import AppHeader from '@App/components/Logged/AppHeader'
import { Button } from '@App/components/Button/Button'
import Link from 'next/link'
import styled from 'styled-components'
import { EventProps } from '@App/utils/types'
import {MdSave} from 'react-icons/md'
import { destinationOptions, DetinationProps } from '@App/utils/mockedData'
import Input from './Input/Input'

const InitialAppScreen = () => {
  const formRef = useRef<HTMLFormElement|null>(null)

  const [destination, setDestionation] = useState<DetinationProps >(
    {country: destinationOptions[0].country, currency: destinationOptions[0].currency}
  )
  const [currentBudget, setCurrentBudget] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [exchangeCost, setExchangeCost] = useState('')

  const [showForm, setShowForm] = useState(false)
  const { user } = useContext(UserContext)
  const [infoTosave, setInfoToSave] = useState({})
  const { name } = user

  const handleSubmitForm = (e:EventProps) => {
    e.preventDefault()
    const infos = {
      user: name,
      destination: destination.country,
      currentBudget,
      exchangeCost,
      travelDate
    }
    setInfoToSave(infos)

    console.log(infos)
  }

  const handleDestination = (e:EventProps) => {
    const selectedDestination = destinationOptions.find(destination=> e.target.value === destination.country)
    setDestionation(selectedDestination as DetinationProps)
  }

  return (
    <AppStartContainer>
      <AppHeader />
      <AppStartWrapper>
        <UserInformationWrapper>
          <h2>Let me know a little more about your plans</h2>
          {/* {user, country, currentBudget, expense, missing, travelDate} */}
          <InformationsForm onSubmit={(e:any)=> handleSubmitForm(e)} ref={formRef}>
              
            <CustomInput>
              <label htmlFor="destination">Destination</label>
              <select 
                name="destination"
                id="destination"
                value={destination.country}
                onChange={(e:any)=> handleDestination(e)}
              >
                {destinationOptions.map(destination => {
                  return <option key={destination.country} value={destination.country}>{destination.country}</option>
                })}
              </select>
            </CustomInput>

            <CustomInput>
              <Input 
                label="Travel date - if you don&apos;t have yet, fill with your goal" 
                name="travelDate" 
                type="date" 
                value={travelDate}
                onChange={(e)=> setTravelDate(e.target.value)}
              />
            </CustomInput>

            <CustomInput>
              {destination.currency && 
              <Currency className="currency" as="label" htmlFor="currentBudget">{destination.currency}</Currency>
              }
              <Input 
                name="currentBudget" 
                label="Your current budget" 
                type="number" 
                value={currentBudget}
                style={{paddingLeft: '5rem'}}
                onChange={(e)=> setCurrentBudget(e.target.value)}
              />
            </CustomInput>

            <CustomInput>
              {destination.currency && 
              <Currency className="currency" as="label" htmlFor="exchangeCost">{destination.currency}</Currency>
              }
              <Input 
                name="exchangeCost" 
                label="Total cost of exchange" 
                type="number" 
                value={exchangeCost}
                style={{paddingLeft: '5rem'}}
                onChange={(e)=> setExchangeCost(e.target.value)}
              />
            </CustomInput>

            <Button 
              as="button"
              bg='#00BFA6' 
              fontColor='#FFF' 
              size={2} 
              margin={'2.5rem 0 2rem'}
            > 
              <CustomMdSave />
              Save
            </Button>
          </InformationsForm>
        </UserInformationWrapper>
      </AppStartWrapper>
    </AppStartContainer>
  )
}

export default InitialAppScreen


const AppStartContainer = styled.div`
    min-height: 100vh;
`

const AppStartWrapper = styled.div`
    padding: 4rem 2.2rem;
`
const UserInformationWrapper = styled.div`
    h2 {
        font-size: 2rem;
        margin-bottom: 6rem;
        color: #333;
        font-weight: 500;
    }
`
const InformationsForm = styled.form`

`

const CustomMdSave = styled(MdSave)`
  margin-right: 1rem;
  font-size: 3rem;
`

const CustomInput = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
    width: 100%;
    gap: .5rem;
    position: relative;

    &:focus-within {
        svg {
            color: #00BFA6;
        }

        .currency {
          border-bottom: .1rem solid #00BFA6;
        }
    }

    svg {
        color: gray;
        font-size: 2.4rem;
    }

    label {
      margin-bottom: .5rem;
    }

    input, select {
        width: 100%;
        border: none;
        color: #333;
        border-bottom: .1rem solid rgba(0,0,0, .2);
        padding: .5rem 0;
        outline: none;

        
        &::placeholder {
            color: #c0c0c0;
        }

        &:focus {
            border-bottom: .1rem solid #00BFA6;
        }
    }

    
`

const Currency = styled.span`
    position: absolute;
    bottom: 0;
    padding: 0.6rem;
    background: lightgray;
    border-bottom: .1rem solid lightgray;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0 !important;

`