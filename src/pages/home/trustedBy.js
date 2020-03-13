import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { StyledH3 } from './styled'
import { FccLogo, UlLogo } from 'components/svgs'
import { theme } from 'consts'

const StyledWrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.c27};
  padding: 50px;
  margin: 0;
`

const LogosWrapper = styled(StyledWrapper)`
  flex-direction: row;
  justify-content: space-between;
  width: 40%;
  padding: 10px;
`

const TrustedBy = () => (
  <StyledWrapper>
    <StyledH3 color={theme.colors.c3}>Trusted by</StyledH3>
    <LogosWrapper>
      <FccLogo />
      <UlLogo />
    </LogosWrapper>
  </StyledWrapper>
)

export default memo(TrustedBy)
