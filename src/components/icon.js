/* eslint-disable */
import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
// import Image from "./image"


  const Icon = () => (
    <StaticQuery
    query={graphql`
      query {
        placeholderImage: file(relativePath: { eq: "gatsby-icon.png" }) {
          childImageSharp {
            fluid(maxWidth: 600) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => <Img fluid={data.placeholderImage.childImageSharp.fluid} style={{width: '100%' }} />}
  />
  )
/* eslint-enable */
  export default Icon