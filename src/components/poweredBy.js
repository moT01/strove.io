import React, { memo } from 'react'
import styled from 'styled-components'

import { Strove } from 'images/logos'
import { theme } from 'constants'

const StroveLogoWrapper = styled.div`
  font-size: 21px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 1;

  svg {
    margin-top: 5px;
    margin-right: 3px;
    height: 21px;
    fill: ${({ theme }) => theme.colors.c1};
  }
`

const PoweredByText = styled.div`
  font-size: 15px;
  text-align: center;
  font-style: italic;
  margin-top: 8px;
`

const PoweredBy = () => {
  return (
    <>
      <PoweredByText>Powered by:</PoweredByText>
      <StroveLogoWrapper>
        <Strove fill={theme.colors.c1} />
        Strove.io
      </StroveLogoWrapper>
    </>
  )
}

export default memo(PoweredBy)
