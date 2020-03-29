import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { StroveButton } from 'components'
import { StyledH1 } from './styled'

const StyledCTAWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 20px;

  ::before {
    content: "";
    position: absolute;
    cursor: pointer;
    width: 800px;
    height: 400px;
    background: ${({ theme }) => theme.colors.c2};
    background-repeat: no-repeat;
    background-image: url(${require('../../assets/map.png')});
    opacity: 0.1;
}

  /* &:after
   {
    content: '';
    background: url(image.jpg);
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
    background: ${({ theme }) => theme.colors.c2};
    background-repeat: no-repeat;
    background-color: rgba(240, 240, 240, 0.1);
    background-image: url(${Map});
    opacity: 0.2;
    content: "blah";
  } */
`

const StyledButtonWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 20px;
  margin: 100px 0;
`

const CTA = () => (
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
)

export default memo(CTA)
