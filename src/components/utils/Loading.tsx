import styled from 'styled-components'

const Loading = () => {
  return (
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
  )
}

export default Loading

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