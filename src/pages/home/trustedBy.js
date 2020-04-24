import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'

import { StyledH3 } from './styled'
import { FccLogo, UlManagementLogo } from 'components/svgs'
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
  flex-direction: ${isMobileOnly ? 'column' : 'row'};
  justify-content: space-between;
  width: ${isMobileOnly ? 'auto' : '50%'};
  padding: 10px;
  margin-top: 20px;
`

const TrustedBy = () => (
  <StyledWrapper>
    <StyledH3 color={theme.colors.c3}>Trusted by</StyledH3>
    <LogosWrapper>
      <img
        decoding="async"
        alt="logoOfLodz"
        height="80px"
        src={require('assets/logoOfLodz.png')}
        style={{ marginRight: '20px' }}
      />
      <FccLogo />
      <UlManagementLogo />
    </LogosWrapper>
  </StyledWrapper>
)

export default memo(TrustedBy)
