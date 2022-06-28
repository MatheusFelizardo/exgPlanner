import styled from "styled-components";

interface CustomButtonProps {
    bg?: string
    fontColor?: string
    size?: number | string
    margin?: number | string
}

export const Button = styled.div<CustomButtonProps>`
    position: relative;
    background: ${props => props.bg};
    width: 100%;
    height: 5rem;
    border-radius: .8rem;
    color: ${props => props.fontColor};
    border: none;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-size: ${props => props.size}rem;

    margin: ${props => props.margin};
`