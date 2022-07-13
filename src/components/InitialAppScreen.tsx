import { useContext, useRef, useState } from 'react'
import { UserContext } from '@App/contexts/User'
import AppHeader from '@App/components/Logged/AppHeader'
import { Button } from '@App/components/Button/Button'
import styled from 'styled-components'
import { COINS, EventProps, InfosToSaveProps } from '@App/utils/types'
import {MdSave} from 'react-icons/md'
import { destinationOptions, DetinationProps } from '@App/utils/mockedData'
import Input from './Input/Input'
import { convertCoinToUSD } from '@App/utils/utils'
import { useCurrency } from '../contexts/Currency'
import { saveInfos } from '@App/api/info'

const InitialAppScreen = () => {
  const formRef = useRef<HTMLFormElement|null>(null)
  const { data } = useCurrency()

  const { user, isLoading } = useContext(UserContext)
  const { _id } = user

  const [destination, setDestionation] = useState<DetinationProps >(
    {country: destinationOptions[0].country, currency: destinationOptions[0].currency}
  )
  const [travelDate, setTravelDate] = useState('')
  const [currentBudget, setCurrentBudget] = useState('0')
  const [currentBudgetCurrency, setCurrentBudgetCurrency]  = useState(destinationOptions[0].currency)
  const [exchangeCost, setExchangeCost] = useState('0')
  const [totalCostCurrency, setTotalCostCurrency]  = useState(destinationOptions[0].currency)

  const [showForm, setShowForm] = useState(false)
  const [infoTosave, setInfoToSave] = useState({})

  const handleSubmitForm = async (e:EventProps) => {
    e.preventDefault()

    if(!_id) return

    const infos: InfosToSaveProps = {
      user: _id,
      country: destination.country,
      currentBudget: {
        value: currentBudgetCurrency === 'USD' ? 
          revertCoinFormat(currentBudget) : 
          convertCoinToUSD(revertCoinFormat(currentBudget), data?.exchange_rates[currentBudgetCurrency]),
        coin: currentBudgetCurrency
      },
      totalCost: {
        value: totalCostCurrency === 'USD' ? 
          revertCoinFormat(exchangeCost) : 
          convertCoinToUSD(revertCoinFormat(exchangeCost), data?.exchange_rates[totalCostCurrency]),
        coin: totalCostCurrency
      },
      travelDate, 
      expense: []
    }
  
    setInfoToSave(infos)
    const response = await saveInfos(infos)
    console.log(response)
    
  }

  const handleDestination = (e:EventProps) => {
    const selectedDestination = destinationOptions.find(destination=> e.target.value === destination.country)
    setDestionation(selectedDestination as DetinationProps)
    setCurrentBudgetCurrency(selectedDestination?.currency as string)
    setTotalCostCurrency(selectedDestination?.currency as string)
  }

  const formatCoin = (value:  string, currency: string) => {
    if (value === '0') {
      return value
    }

    if (Number(value) > 0) {
      const options = { style: 'currency', currency, currencyDisplay: 'narrowSymbol', maximumFractionDigits: 0}
      const formatedValue = new Intl.NumberFormat(undefined, options).format(Number(value))

      return formatedValue
    }
    return value
  }

  const revertCoinFormat = (value: string) => {

    if (value === '0') {
      return value
    }

    if (value) {
      const splittedValue = value.split(/\s/g)[1]
      const parsedValue = splittedValue && splittedValue.includes('.') ? splittedValue.replaceAll('.', '') : splittedValue
      return parsedValue
    }   

    return value
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
                min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                value={travelDate}
                onChange={(e)=> setTravelDate(e.target.value)}
              />
            </CustomInput>

            <CustomCurrencyInput>
              {destination.currency && 
              <select 
                name="currentBudgetCurrency"
                value={currentBudgetCurrency ? currentBudgetCurrency : destination.currency}
                onChange={(e:any)=> setCurrentBudgetCurrency(e.target.value)}
              >
                {COINS.map(coin => {
                  return (
                    <option value={coin} key={coin}>{coin}</option>
                  )
                })}
              </select>
              }
              <Input 
                name="currentBudget" 
                label="Your current budget" 
                type="text" 
                value={currentBudget}
                onFocus={(e)=> {setCurrentBudget(revertCoinFormat(e.target.value))}}
                onBlur={(e)=> setCurrentBudget(formatCoin(e.target.value, currentBudgetCurrency))}
                onChange={(e)=> {
                  e.target.value = e.target.value.replace(/\D+/g, '')
                  setCurrentBudget(e.target.value)
                }}
              />
            </CustomCurrencyInput>

            <CustomCurrencyInput>
              {destination.currency && 
              <select 
                name="totalCostCurrency"
                value={totalCostCurrency ? totalCostCurrency : destination.currency}
                onChange={(e:any)=> setTotalCostCurrency(e.target.value)}
              >
                {COINS.map(coin => {
                  return (
                    <option value={coin} key={coin}>{coin}</option>
                  )
                })}
              </select>
              }
              <Input 
                name="exchangeCost" 
                label="Total cost of exchange" 
                type="text" 
                value={exchangeCost}
                onFocus={(e)=> setExchangeCost(revertCoinFormat(e.target.value))}
                onBlur={(e)=> setExchangeCost(formatCoin(e.target.value, totalCostCurrency))}
                onChange={(e)=> {
                  e.target.value = e.target.value.replace(/\D+/g, '')
                  setExchangeCost(e.target.value)
                }}
              />
            </CustomCurrencyInput>

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
    padding: 4rem 2.2rem 2rem;
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

const CustomCurrencyInput = styled(CustomInput)`
  display: flex;

  input {
    padding-left: 6rem;
  }
  
  select { 
    position: absolute;
    bottom: 0;
    padding: 0.6rem 0;
    background: ${({theme}) => theme.colors.primary};
    color: ${({theme}) => theme.colors.white};
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0 !important;
    max-width: 46px;
    border-radius: 6px;
  }

`