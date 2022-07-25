import styled from 'styled-components'
import Image, { StaticImageData } from 'next/image'

interface VideoLinkProps {
    img: StaticImageData
    text: string
    link: string
}

const VideoLink = ({img, text, link}: VideoLinkProps) => {
  return (
    <VideoWrapper>
      <VideoThumb>
        <Image src={img} alt={text} />
      </VideoThumb>

      <VideoTextWrapper>
        <VideoText>{text}</VideoText>
        <VideoBtn href={link} target="_blank">Go to video</VideoBtn>
      </VideoTextWrapper>

    </VideoWrapper>
  )
}

export default VideoLink

const VideoWrapper = styled.div`
    background: #fff;
`

const VideoTextWrapper = styled.div`
    padding: .4rem .8rem;
    display: flex;
    flex-direction: column;
`

const VideoThumb = styled.picture`
    width: 100%;
`
const VideoText = styled.span`
    font-size: 1rem;
    margin-bottom: 1.6rem;
`
const VideoBtn = styled.a`
    font-size: 1rem;
    background: #00BFA6;
    padding: .4rem 4.4rem;
    color: #fff;
`