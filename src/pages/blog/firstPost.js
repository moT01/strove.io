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

const DateTime = styled.div`
  font-size: 0.83255rem;
  line-height: 1.75rem;
  display: block;
  margin-bottom: 1.75rem;
  margin-top: -1.4rem;
`

const Post = () => (
  <>
    <SEO title="Strove blog | Remote classes" />
    <Header />
    <TextWell>
      <StyledH1>Coding code online</StyledH1>
      <DateTime>March 30, 2020 • ☕️ 5 min read</DateTime>
      Before we decided to reach out to educators, I and my cofounder Peter paid a visit to University
      of Lodz to do a series of three coding workshops. I myself am a graduate
      but visiting the same classes as a teacher was a competely new experience.
      I felt excited and anxious at the same time; My promotor from a few years
      ago introduced me to her students, and then my job became observing and
      paying attention to every single detail while trying to make sure everyone
      was kind of able to keep it. It wasn't easy.
      <br />
      
      <Link to="/">Go back to the homepage</Link>
    </TextWell>
    <Footer />
  </>
)

export default memo(Post)
