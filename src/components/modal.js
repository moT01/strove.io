import { memo } from 'react'
import Modal from 'react-modal'
import styled, { keyframes, css } from 'styled-components/macro'

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
    ${props.minWidth && `min-width: ${props.minWidth}`}
  `

export default memo(styled(Modal)`
  ${sizeProps};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  border: none;
  padding: 20px;
  box-shadow: 0 15px 15px -15px ${({ theme }) => theme.colors.c4};
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
`)
