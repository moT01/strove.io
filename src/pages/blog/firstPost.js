import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Footer from 'components/footer'
import { SEO, Header } from 'components'

const TextWell = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  width: 60vw;
  margin: 40px 20px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: ${({ theme }) => theme.colors.c2};
  font-size: 20px;

  @media (max-width: 1366px) {
    width: 100%;
  }
`

const StyledH1 = styled.h1`
  letter-spacing: 0.6px;
`

const Legal = () => (
  <>
    <SEO title="Strove blog | Remote classes" />
    <Header />
    <TextWell>
      <StyledH1>Teaching code online</StyledH1>
      <Link to="/">Go back to the homepage</Link>
    </TextWell>
    <Footer />
  </>
)

export default memo(Legal)
