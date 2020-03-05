import React, { memo } from 'react'
import styled, { css } from 'styled-components/macro'

import { StroveButton } from 'components'
import { StyledH1 } from './styled'

const StyledCTAWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
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
  margin-bottom: 20px;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledButtonWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 20px;
  margin: 100px 0;
`

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

const Technologies = () => (
  <>
    <StyledCTAWrapper>
      <StyledButtonWrapper>
        <StyledH1>Choose a better way to get your ideas out there</StyledH1>
        <StroveButton
          isGetStarted
          isPrimary
          margin="20px 0"
          text="Get started"
          fontWeight="bold"
        />
      </StyledButtonWrapper>
    </StyledCTAWrapper>
  </>
)

export default memo(Technologies)
