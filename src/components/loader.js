import React from 'react'
import styled, { keyframes } from 'styled-components'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Cog } from '../images/svg'
import { Silisky } from '../images/logos'

const SpinToWin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 93vh;
  width: 100vw;
`

const LoaderContainer = styled(LoaderWrapper)`
  width: 20vw;
  height: auto;
  animation: ${SpinToWin} 3s linear infinite;
`

const LogoContainer = styled.div`
  width: 8vw;
  position: absolute;
  z-index: 4;
`

const Loader = props => (
  <LoaderWrapper>
    {console.log('props', props)}
    <LoaderContainer>
      <Cog fill="#0072ce" />
      <LogoContainer>
        <Silisky style={{ width: '100%', height: 'auto' }} />
      </LogoContainer>
    </LoaderContainer>
  </LoaderWrapper>
)

export default Loader

export const fluidImage = graphql`
  fragment fluidImage on File {
    childImageSharp {
      fluid(maxWidth: 1000, quality: 80) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const pageQuery = graphql`
  query {
    imageTwo: file(relativePath: { eq: "siliskyLogoHollow.png" }) {
      ...fluidImage
    }
  }
`
