import styled from 'styled-components'
import { FaChevronCircleDown } from 'react-icons/fa'
import { useRef, useState } from 'react'
import { lighten } from 'polished'
import { DetinationProps } from '@App/utils/mockedData'

interface SelectProps {
    options: string[]
    // eslint-disable-next-line no-unused-vars
    currentValue: (value: string) => void
}

const Select = ({options, currentValue, ...props}: SelectProps) => {
  const selectRef = useRef<HTMLDivElement>(null)
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(options[0])
  
  const updateSelected = (value: string) => {
    setSelectedOption(value)
    currentValue(value)
    setShowOptions(false)
  }

  const optionWrapperSize = selectRef?.current?.getBoundingClientRect().width
  const bgColor = selectRef?.current ? getComputedStyle(selectRef?.current).backgroundColor : ''

  return (
    <SelectContainer>
      <SelectWrapper ref={selectRef} {...props} onClick={()=> setShowOptions(state => !state)}>
        {selectedOption}
        <CustomSelector />
      </SelectWrapper>
      {showOptions && 
      <OptionsWrapper width={optionWrapperSize} {...props}>
        {options.map(option =>  (
          <Option bgColor={bgColor} className={option === selectedOption ? 'active' : undefined } onClick={()=> updateSelected(option)} key={option}>{option}</Option>
        ))}
      </OptionsWrapper>
      }
      
    </SelectContainer>
  )
}

export default Select

const SelectContainer = styled.div`
`

const SelectWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .7rem .9rem;
`

const CustomSelector = styled(FaChevronCircleDown)`
    margin-left: 1.4rem;
    color: #E6E6E6;
    font-size: 1rem;
`

interface OptionsWrapperI {
    width?: string | number
}

const OptionsWrapper = styled.div<OptionsWrapperI>`
    width: ${props => props.width}px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
`

interface OptionStyleI {
    bgColor: string
}

const Option = styled.div<OptionStyleI>`
    padding: .7rem .9rem;   
    width: 100%;

    &.active {
        background: ${props => lighten(.1, props.bgColor)} ;
    }
`