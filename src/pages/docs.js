import React from 'react'
import styled from 'styled-components'

import SEO from 'components/seo'
import Layout from 'components/layout'

export const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  line-height: 1.2;
  margin-bottom: 1rem;
`

const ExampleBlogPost = () => {
  return (
    <Layout>
      <SEO title="Silisky docs" />
      <Title>Docs</Title>
    </Layout>
  )
}

export default ExampleBlogPost
