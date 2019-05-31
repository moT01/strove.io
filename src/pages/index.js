/* eslint-disable */
import React from "react"
import styled, { css } from 'styled-components';
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Icon from "../components/icon"

const IconContainer = styled.div`
  transition: 0.3s ease background-color;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  width: 128px;
  height: 128px;


  @media (max-width: 800px) {
    flex-shrink: 0;
    width: 96px;
    height: 96px;

    svg {
      width: 60px;
      height: 60px;
    }


  }`

  const ScrollAtMobile = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-around;
  min-width: 100%;

  @media (max-width: 800px) {
    justify-content: flex-start;
    overflow-x: scroll;
  }`

class IndexPage extends React.Component {
  render() {
    return (
  <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <ScrollAtMobile>
      <IconContainer>
      <Image />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
    </ScrollAtMobile>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
    )
  }
}
/* eslint-enable */
export default IndexPage