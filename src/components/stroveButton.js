import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { isMobileOnly } from 'react-device-detect'

import { theme } from 'constants'
import { FullScreenLoader } from 'components'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`

const Button = styled.button`
  height: auto;
  min-width: 70px;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 5px;
  padding: 10px 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${keyframes`0%{opacity: 0;}100%{opacity${props => props.disabled ? '0.4' : '0.9'}}`} 0.5s ease-out;
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.colors.c1};
        transform: translateY(-1px);
      }
    `}
`
const StroveButton = (type, text, isLoading, isDisabled, isPrimary, onClick) => {
  return (
    <Button
      disabled={isDisabled || isLoading}
      primary={isPrimary}
      mobile={isMobileOnly}
      type={type}
      onClick={onClick}
    >
      {isLoading ? (
        <FullScreenLoader
          isFullScreen={false}
          color={'#ffffff'}
          height={'1.7rem'}
        />
      ) : (
        { text }
      )}
    </Button>
  )
}

export default memo(StroveButton)
