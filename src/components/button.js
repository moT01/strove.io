import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'

import { theme } from 'constants'

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 70px;
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
  animation: ${FadeIn} 0.5s ease-out;
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
const Button = (buttonText, isLoading) => {
  return (
    <Button
      disabled={!props.values.projectName || props.errors.projectName}
      primary
      mobile={isMobileOnly}
      type="submit"
    >
      {isLoading ? (
                <FullScreenLoader
                  isFullScreen={false}
                  color={'#ffffff'}
                  height={'1.7rem'}
                />
              ) : (
                'Get started'
              )}
    </Button>
  )
}

export default memo(Button)
