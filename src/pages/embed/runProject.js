import React, { memo } from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'

import { theme } from 'constants'
import { StroveButton, AddProjectProvider, GlobalStyles } from 'components'
import { getWindowSearchParams } from 'utils'

const MenuWrapper = styled.div`
  padding: 20px;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
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

const Run = ({ addProject }) => {


  // Todo: This does not work on some browsers, use a consistent approach
  const searchParams = getWindowSearchParams()
  const repoUrl = searchParams.get('repoUrl')
  // .slice(0, 7) + getRepoUrl().slice(6)

  const onClick = () => {
    addProject({ link: repoUrl })
  }

  return (
    <Wrapper>
      <MenuWrapper invert>
        <StyledButton isPrimary onClick={onClick}>
          <LoginText invert>Run with Strove</LoginText>
        </StyledButton>
      </MenuWrapper>
    </Wrapper>
  )
}

/*
  Repo are passed via repoLink parameter.
  For example, to open strove website use:
  https://strove.io/embed/runProject/?repoUrl=https://github.com/stroveio/strove.io
*/
export default memo(() => (
  <ThemeProvider theme={theme}>
    <AddProjectProvider>
      {({ addProject }) => <Run addProject={addProject} />}
    </AddProjectProvider>
    <GlobalStyles />
  </ThemeProvider>
))
