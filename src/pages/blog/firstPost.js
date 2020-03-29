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
      Is there a character that could even possibly EVEN TOUCH Madara Uchiha?
      Let alone defeat him. And I'm not talking about Edo Tensei Uchiha Madara.
      I'm not talking about Gedou Rinne Tensei Uchiha Madara either. Hell, I'm
      not even talking about Juubi Jinchuuriki Gedou Rinne Tensei Uchiha Madara
      with the Eternal Mangekyou Sharingan and Rinnegan doujutsus (with the
      rikodou abilities and being capable of both Amateratsu and Tsukuyomi
      genjutsu), equipped with his Gunbai, a perfect Susano'o, control of the
      juubi and Gedou Mazou, with Hashirama Senju's DNA implanted in him so he
      has mokuton kekkei genkai and can perform yin yang release ninjutsu while
      being an expert in kenjutsu and taijutsu.
      <Link to="/">Go back to the homepage</Link>
    </TextWell>
    <Footer />
  </>
)

export default memo(Post)
