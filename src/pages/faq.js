/* eslint-disable */
import React from 'react'
import styled from 'styled-components'

import SEO from 'components/seo'
import Layout from 'components/layout'

const TextWell = styled.div`
  ${'' /* align-self: center; */}
  color: black;
  height: auto;
  width: 60vw;
  margin: 3vw 7.5vw 0 7.5vw;
  padding: 3vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: white;
  ${'' /* border: 1px solid slategrey; */}
`

const FAQ = () => {
  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>FAQ</TextWell>
    </Layout>
  )
}
/* eslint-enable */

export default FAQ
