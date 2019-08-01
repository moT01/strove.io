import React, { memo } from 'react'
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
const Post = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin: 15px;
  height: auto;
  width: 80vw;
`
const Paragraph = styled.p`
  text-decoration: none;
  font-size: 1.1rem;
`

const ExampleBlogPost = () => {
  return (
    <Layout>
      <Post>
        <SEO title="Silisky docs" />
        <Title>Welcome to SiliSky!</Title>
        <Paragraph>
          Say goodbye to 'it works on my machine' problem by coding in the same
          environment no matter the machine. All you need is a browser!
        </Paragraph>
      </Post>
      <Post>
        <SEO title="Silisky docs" />
        <Title>Code in all major programming languages</Title>
        <Paragraph>
          You can even use a particular language version. Need Python 2.7.3 for
          chemistry? We got you covered!
        </Paragraph>
      </Post>
      <Post>
        <SEO title="Silisky docs" />
        <Title>Don't lose time, one environment for the whole team</Title>
        <Paragraph>
          Once a project has been set up, any member can access it without
          needing to configure everything again
        </Paragraph>
      </Post>
      <Post>
        <SEO title="Silisky docs" />
        <Title>Silisky</Title>
        <Paragraph>
          online Docker and Visual Studio Code based programming environment and
          solution to 'it work's on my machine' problem. Copyright (c) 2019
          CodeNGo Inc.
        </Paragraph>
      </Post>
    </Layout>
  )
}

export default memo(ExampleBlogPost)
