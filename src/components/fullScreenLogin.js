import React, { memo } from 'react'
import styled from 'styled-components'
import { createSelector } from 'reselect'

import { selectors } from 'state'
import { loginOptions } from 'constants'
import { Layout, StroveButton } from 'components'

const MenuWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-style: solid;
  background-color: ${({ theme, invert }) =>
    invert ? theme.colors.c2 : theme.colors.c1};
  z-index: 3;
  position: relative;
`

const Text = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  font-weight: 300;
  line-height: 1;
  @media (max-width: 767px) {
    font-size: 1.4rem;
  }
  :hover {
    color: ${({ theme }) => theme.colors.c3};
    cursor: pointer;
  }
`

const OptionText = styled(Text)`
  font-weight: 300;
  :hover {
    color: ${({ theme }) => theme.colors.c2};
  }
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

const LoginDropdown = () => {
  return (
    <Layout>
      <Wrapper>
        <MenuWrapper invert>
          {loginOptions.map(item => (
            <StyledButton isPrimary key={item.label}>
              <>
                {item.icon}
                <OptionText invert>{item.label}</OptionText>
              </>
            </StyledButton>
          ))}
        </MenuWrapper>
      </Wrapper>
    </Layout>
  )
}

export default memo(LoginDropdown)
