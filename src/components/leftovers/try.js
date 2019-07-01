import React from 'react'
import styled from 'styled-components'
import BackgroundImage from 'gatsby-background-image'
import { StaticQuery, graphql } from 'gatsby'

const SectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`

const Try = () => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "sky.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid
      return (
        <BackgroundImage
          Tag="section"
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          <SectionWrapper>
            <h1>Try now!</h1>
            <p>
              SiliSky allows to work with all of the most popular programming
              languages. Click and see for yourself
            </p>
          </SectionWrapper>
        </BackgroundImage>
      )
    }}
  />
)
export default Try
