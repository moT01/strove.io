import { memo } from 'react'
import Modal from 'react-modal'
import styled, { keyframes, css } from 'styled-components'

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const sizeProps = props =>
  css`
    ${props.width && `width: ${props.width}`};
  `

export default memo(styled(Modal)`
  ${sizeProps};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${({ theme }) => theme.colors.c1};
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`)
