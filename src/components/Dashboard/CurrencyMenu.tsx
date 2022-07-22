import { useCurrency } from '@App/contexts/Currency'
import { COINS } from '@App/utils/types'
import { changeBaseCurrency } from '@App/utils/utils'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Select from '../utils/Select'

const CurrencyMenu = () => {
  const {data} = useCurrency()
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [currencyValues, setCurrencyValues] = useState({})

  useEffect(() => {
    if(data) {
      const values = changeBaseCurrency(selectedCurrency, data.exchange_rates)
      setCurrencyValues(values)
    }
    
  },[data, selectedCurrency])

  
  
  return (
    <CurrencyWrapper>
      <CustomSelect currentValue={setSelectedCurrency} options={COINS} />

      <CoinPriceWrapper>
        {COINS.map(coin => {
          if (coin === selectedCurrency) return

          return <Coin key={coin}>{currencyValues && currencyValues[coin]} {coin}</Coin>
        })}
      </CoinPriceWrapper>
    </CurrencyWrapper>
  )
}

export default CurrencyMenu

const CurrencyWrapper = styled.div`
    background: #93BBFF;
    border-right: none;
    border-left: none;
    display: flex;
    width: 100%;
`

const CoinPriceWrapper = styled.div`
    border-right: none;
    border-left: none;
    display: grid;
    width: 100%;
    grid-template-columns: repeat(5, 1fr) ;
`

const Coin = styled.div`
    padding: .7rem .9rem;
    border: none;
    font-size: 1.1rem;
    font-weight: 600;
    color: #FFF;  
    border-right: 1px solid #f2f2f2;

    &:last-of-type {
      border-right: none;
    }
`

const CustomSelect = styled(Select)`
  background: #4285F4;
  color: #FFF;  
  font-size: 1.1rem;
  font-weight: 600;
`