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

export default styled(Modal)`
  ${sizeProps};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => 'rgba(0, 0, 0, 0.1)'};
  border-width: 1px;
  border-style: solid;
  word-break: break-word;
  padding: 20px;
  box-shadow: 0 5px 10px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`
