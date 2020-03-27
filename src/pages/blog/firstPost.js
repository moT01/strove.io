import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import Footer from 'components/footer'
import { SEO, Header } from 'components'

const TextWell = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  max-width: 640px;
  margin: 40px 20px;
  padding: 20px;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: ${({ theme }) => theme.colors.c2};
  font-size: 20px;
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
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
      <br />
      <Link to="/">Go back to the homepage</Link>
    </TextWell>
    <Footer />
  </>
)

export default memo(Legal)
