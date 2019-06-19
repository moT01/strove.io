/* eslint-disable */
import React from "react"
import styled, { keyframes } from "styled-components"

import SEO from "../components/seo"
import Layout from "../components/layout"

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3vh;
  animation: ${FadeIn} 1s ease-out;

  @media (max-width: 1366px) {
    flex-direction: column;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 75%;
  margin: 15px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.team ? "#ffffff" : "#0072ce")};
  border-width: 1px;
  border-style: solid;
  color: ${props => (!props.team ? "#ffffff" : "#0072ce")};
  border-radius: 1vh;
  border-color: ${props => (props.team ? "#ffffff" : "#0072ce")};
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${props => (props.team ? "#ffffff" : "#0072ce")};
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.team ? "#0072ce" : "#ffffff")};
  margin-left: ${props => (props.team ? "-3vw" : 0)};
  margin-top: ${props => (props.team ? "9vh" : 0)};
  z-index: ${props => (props.team ? 1 : 2)};
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;

  height: 70vh;
  width: 40vw;
  @media (max-width: 1366px) {
    width: 70vw;
    height: auto;
  }
`

const PricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 45%;
  height: 90%;
  @media (max-width: 1366px) {
    width: 90%;
    height: auto;
  }
`
const PricingSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
  @media (max-width: 1366px) {
    flex-direction: column;
  }
`

const Feature = styled.p`
  color: ${props => (!props.team ? "#0072ce" : "#ffffff")};
  font-size: 1.7vh;
  margin-top: 0.7vh;
  margin-bottom: 0.7vh;
`
const PlanTitle = styled.h1`
  margin: 10px;
  font-size: 4vh;
  color: ${props => (!props.team ? "#0072ce" : "#ffffff")};
`
const Contact = styled(PlanTitle)`
  font-size: 2.5vh;
  width: 75%;
`
const Price = styled(PlanTitle)`
  font-size: 6vh;
`
const PlanSubTitle = styled(PlanTitle)`
  font-size: 2vh;
`
const PlanDesc = styled(Feature)`
  font-size: 1.5vh;
`
const CardTitle = styled(PlanTitle)`
  font-size: 3vh;
`

class PricingPage extends React.Component {
  render() {
    return (
      <Layout>
        <SEO title="Pricing" />
        <CardsWrapper>
          <Card>
            <CardTitle>Individuals</CardTitle>
            <PricingSection>
              <PricingWrapper>
                <PlanTitle>Free</PlanTitle>
                <PlanDesc>The basic plan for individual developers</PlanDesc>
                <Price>$0</Price>
                <PlanSubTitle>Per month</PlanSubTitle>
                <Feature>Public repositories</Feature>
                <Feature>HDD and RAM shared with other users</Feature>
                <Feature>No commercial use</Feature>
                <Button>
                  <PlanSubTitle team>Choose free plan</PlanSubTitle>
                </Button>
              </PricingWrapper>
              <PricingWrapper>
                <PlanTitle>Pro</PlanTitle>
                <PlanDesc>Plan for professionals</PlanDesc>
                <Price>$25</Price>
                <PlanSubTitle>Per month</PlanSubTitle>
                <Feature>Private and Public repositories</Feature>
                <Feature>10 GBs of hard drive</Feature>
                <Feature>Commerial use</Feature>
                <Button>
                  <PlanSubTitle team>Choose Pro</PlanSubTitle>
                </Button>
              </PricingWrapper>
            </PricingSection>
          </Card>
          <Card team>
            <CardTitle team>Teams</CardTitle>
            <PricingSection>
              <PricingWrapper>
                <PlanTitle team>Enterprise</PlanTitle>
                <PlanDesc team>
                  Plan aimed for developer teams and companies
                </PlanDesc>
                <Contact team>Contact Sales for pricing</Contact>
                <Feature team>Private and Public repositories</Feature>
                <Feature team>
                  RAM, hard drive and speeed adjusted to teams needs
                </Feature>
                <Feature team>Commercial use</Feature>

                <Feature team>Priority support</Feature>

                <Button team>
                  <PlanSubTitle>Choose Enterprise</PlanSubTitle>
                </Button>
              </PricingWrapper>
            </PricingSection>
          </Card>
        </CardsWrapper>
      </Layout>
    )
  }
}
/* eslint-enable */

export default PricingPage
