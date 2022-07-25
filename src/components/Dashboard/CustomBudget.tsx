import { CurrencyMenuProps } from 'pages/dashboard'
import React, { useState } from 'react'
import styled from 'styled-components'
import { FaInfoCircle } from 'react-icons/fa'
import { Budget } from '@App/utils/types'
import { mockedBudgets } from '@App/utils/mockedData'

const CustomBudget = ({selectedCurrency}:CurrencyMenuProps) => {

  const [showTooltip, setShowTooltip] = useState(false)
  const budgets: Budget[] = mockedBudgets

  return (
    <CustomBudgetWrapper>
      <CustomBudgetTitle>
        <span>Your custom budget</span>
        <FaInfoCircle onClick={()=> setShowTooltip(state => !state)}/>
        {showTooltip && 
        <Tooltip>
          <p>Here will show your custom budget, added to complement your initial informated budget.</p>
          <p>You can delete if necessary, but for now you can not edit these budgets.</p>
          <p>If necessary to edit, please remove the budget and add another one.</p>
        </Tooltip>}
      </CustomBudgetTitle>

      <TableWrapper>
        <TableHeader>
          <span>Name</span>
          <span>Description</span>
          <span>Value</span>
        </TableHeader>

        {budgets.length > 0 && budgets.map((budget, index) => {
          if (budget.increment) {
            return (
              <TablePositive key={index}>
                <span>{budget.name}</span>
                <span>{budget.description}</span>
                <span>{budget.value}</span>
              </TablePositive>
            )
          }
          return (
            <TableNegative key={index}>
              <span>{budget.name}</span>
              <span>{budget.description}</span>
              <span>{budget.value}</span>
            </TableNegative>
          )
        })}

      </TableWrapper>
     
    </CustomBudgetWrapper>
  )
}

export default CustomBudget

export const CustomBudgetWrapper = styled.div`
    padding: 3.2rem 1.6rem 1.6rem;
    position: relative;
`
export const CustomBudgetTitle = styled.div`
    display: flex;

    span {
        font-size: 1.4rem;
        font-weight: 600;
    }

    svg {
        margin-left: .4rem;
        font-size: 1.2rem;
    }
`
export const Tooltip = styled.div`
    background: #333;
    padding: .4rem;
    position: absolute;
    max-width: 70%;
    left: 10%;
    top: -4.5rem;
    p {
        color: #fff;
        font-size: 1rem;
    }
`
const TableWrapper = styled.div`
    margin-top: 1.6rem;
`

const TableHeader = styled.div`
    display: grid;
    grid-template-columns: 20% 1fr 15%;
    gap: .4rem;
    margin-bottom: .4rem;
    span {
        padding: .4rem .8rem;
        background: #f6f6f6;
        font-size: 1rem;
        font-weight: 600;
    }
`

const TablePositive = styled(TableHeader)`
    span {
        background: #A1E1B2;
    }
`

const TableNegative = styled(TableHeader)`
    span {
        background: #F7AFA9;
    }
`