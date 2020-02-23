import React, { useState, memo } from 'react'
import styled, { css } from 'styled-components/macro'
import { useDispatch } from 'react-redux'
import isEmail from 'validator/lib/isEmail'

import GetStartedButton from './getStartedButton'

const StyledButtonWrapper = styled.div`
  width: 100vw;
  align-self: center;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.c27};
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  max-width: 300px;
  margin: 5px;
  padding: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 10px 10px -15px ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0.9;

  svg {
    fill: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 22px;
    height: auto;
    margin-left: 5px;
  }

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      cursor: pointer;
      &:hover {
        opacity: 1;
        transform: translateY(-3px);
        box-shadow: 0 12px 12px -13px ${({ theme }) => theme.colors.c1};
      }
    `}
`

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledMadeWithStrove = styled.div``

const StyledFeatureWrapper = styled.div`
  width: 100vw;
  padding: 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  align-items: center;
  overflow: hidden;
`

const Technologies = () => {
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()

  return (
    <>
      <StyledFeatureWrapper>
        <StyledMadeWithStrove>
          Obviously, this app is made with Strove as well
        </StyledMadeWithStrove>
        <StyledButtonsWrapper>
          <StyledAnchor
            primary
            href="https://github.com/stroveio/strove.io-client"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check our source
          </StyledAnchor>
          or, even better
          <StyledAnchor
            primary
            href="/#https://github.com/stroveio/strove.io-client"
            rel="noopener noreferrer"
            target="_blank"
          >
            Start editing
          </StyledAnchor>
        </StyledButtonsWrapper>
      </StyledFeatureWrapper>
      <StyledButtonWrapper>
        <GetStartedButton margin="100px 0" />
      </StyledButtonWrapper>
    </>
  )
}

export default memo(Technologies)
