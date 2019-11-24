import React, { memo } from 'react'
import { navigate } from 'gatsby'
import { useSelector } from 'react-redux'
import styled, { css, keyframes } from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { StroveButton, AddProjectProvider, GlobalStyles } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams, getWindowPathName } from 'utils'

const getToken = selectors.api.getUserField('siliskyToken')

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
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

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
`

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const Wrapper = styled.div`
  display: flex;
  height: 97vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledButton = styled(StroveButton)`
  height: 60px;
  width: 300px;
  > svg {
    fill: ${({ theme }) => theme.colors.c2};
    width: 30px;
    height: 30px;
    margin-right: 8px;
  }
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  height: 60px;
  width: 300px;
  margin: 5px;
  padding: 0.5vh;
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
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  svg {
    fill: ${({ invert, theme }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 2.2vh;
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
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        transform: translateY(-1px);
        box-shadow: 0 1.1vh 1.1vh -1.2vh ${({ theme }) => theme.colors.c1};
      }
    `}
`

/* Todo: Add embed only loading screen */
const EmbedWrapper = () => {
  const token = useSelector(getToken)

  // const searchParams = getWindowSearchParams()
  // const projectUrl = searchParams.get('projectUrl')

  // if (!token && getWindowPathName() !== `/embed/`) {
  //   // If users is not logged in, redirect to the embed main page.
  //   navigate('/embed/')
  // }

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <MenuWrapper invert>
          {/* <StyledButton isPrimary>
            <LoginText invert>Login to start coding</LoginText>
          </StyledButton> */}
          <StyledAnchor primary>
            <LoginText invert>Login to start coding</LoginText>
          </StyledAnchor>
        </MenuWrapper>
      </Wrapper>
    </ThemeProvider>
  )
}

export default memo(EmbedWrapper)
