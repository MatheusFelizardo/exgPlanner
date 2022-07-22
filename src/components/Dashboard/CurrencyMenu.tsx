import { COINS } from '@App/utils/types'
import { useState } from 'react'
import styled from 'styled-components'
import Select from '../utils/Select'

const CurrencyMenu = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('')
  
  return (
    <CurrencyWrapper>
      <CustomSelect currentValue={setSelectedCurrency} options={COINS} />

      <CoinPriceWrapper>
        {COINS.map(coin => {
          if (coin === selectedCurrency) return

          return <Coin key={coin}>1.15 {coin}</Coin>
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
    font-size: 1rem;
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
  font-size: 1rem;
  font-weight: 600;
`