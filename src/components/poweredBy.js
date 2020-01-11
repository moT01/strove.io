import React, { memo } from 'react'
import styled from 'styled-components/macro'

import strove from 'images/strove.png'

const StroveLogoWrapper = styled.div`
  font-size: 21px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  line-height: 1;
`

const StyledImage = styled.img`
  width: 25px;
  height: 25px;
  margin: 0 5px;
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
        <StyledImage src={strove} alt="logo" />
        Strove.io
      </StroveLogoWrapper>
    </>
  )
}

export default memo(PoweredBy)
