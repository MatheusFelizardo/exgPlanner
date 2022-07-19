import React from 'react'
import styled from 'styled-components'

const CurrencyMenu = () => {
  return (
    <CurrencyWrapper>
      <CurrencySelector>
        <option value="USD">USD</option>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
      </CurrencySelector>
    </CurrencyWrapper>
  )
}

export default CurrencyMenu

const CurrencyWrapper = styled.div`
    background: #93BBFF;
    border: 1px solid #FFF;
    border-right: none;
    border-left: none;
`

const CurrencySelector = styled.select`
    width: 69px;
    height: 20px;
    background: #4285F4;
    border: none;
    font-size: 1rem;
    color: #FFF;

    option {
        width: 69px;
    }
`