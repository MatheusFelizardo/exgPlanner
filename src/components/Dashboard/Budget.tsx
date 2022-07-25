import styled from 'styled-components'
import { FaPlusCircle } from 'react-icons/fa'
import { CurrencyMenuProps } from 'pages/dashboard'

const Budget = ({selectedCurrency}:CurrencyMenuProps) => {

  return (
    <BudgetContainer>
      <BudgetHeader>
        <BudgetTotal>
          <span>Total budget</span>
          <span>{selectedCurrency} 3800.00</span>
        </BudgetTotal>
        <AddBudgetBtn>
          <span>add budget</span>
          <FaPlusCircle />
        </AddBudgetBtn>
      </BudgetHeader>

      <BudgetInfoContainer>
        <BudgetInfoWrapper>
          <BudgetInfoTitle>Current budget</BudgetInfoTitle>

          <BudgetInfoValueWrapper>
            <BudgetInfoBtn style={{background: '#00BFA6'}}>{selectedCurrency}</BudgetInfoBtn>
            <BudgetInfoValue style={{color: '#00BFA6'}}>2600.00</BudgetInfoValue>
          </BudgetInfoValueWrapper>

        </BudgetInfoWrapper>

        <BudgetInfoWrapper>
          <BudgetInfoTitle>Missing budget</BudgetInfoTitle>

          <BudgetInfoValueWrapper>
            <BudgetInfoBtn style={{background: '#EA4335'}}>{selectedCurrency}</BudgetInfoBtn>
            <BudgetInfoValue style={{color: '#EA4335'}}>2300.00</BudgetInfoValue>
          </BudgetInfoValueWrapper>
        </BudgetInfoWrapper>
      </BudgetInfoContainer>
    </BudgetContainer>
  )
}

export default Budget

const BudgetContainer = styled.div`
  background: #f2f2f2;
`
const BudgetHeader = styled.div`
    display: flex;
    align-items: center;
    gap: .4rem;
    padding: .4rem 0;
`
const BudgetTotal = styled.div`
    width: 100%;
    padding: 1rem 1.6rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;

    span {
      color: #2F2E41;
      font-weight: 600;

      &:first-of-type {
        font-size: 10px;
      }

      &:last-of-type {
        font-size: 14px;
      }

    }
`
const AddBudgetBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #FFF;
    background: #00BFA6;
    border: none;
    min-width: 118px;
    padding: 1rem 1.6rem;
    align-self: stretch;
    cursor: pointer;
    span {
        font-size: 1rem;
    }
`

const BudgetInfoContainer = styled.div`
  display: flex;
  padding-bottom: .4rem;
  gap: .4rem;
  background: #f2f2f2;
`

const BudgetInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #FFF;
  width: 100%;
  padding: .8rem 0;
`
const BudgetInfoValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const BudgetInfoTitle = styled.p`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 1.6rem;
`

const BudgetInfoBtn = styled.div`
  padding: .4rem .8rem;
  color: #FFF;
  font-size: 1.6rem;
  font-weight: 600;
  margin-right: .8rem;
`

const BudgetInfoValue = styled.span`
  font-size: 2rem;
  font-weight: 600;
`