/* eslint-disable */
import React from 'react'
import styled, { keyframes } from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'
import { BUY_SUBSCRIPTION } from 'queries'
import { useDispatch } from 'react-redux'
import { mutation } from 'utils'

import SEO from 'components/seo'
import Layout from 'components/layout'

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
  background-color: ${props => (props.team ? '#ffffff' : '#0072ce')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (!props.team ? '#ffffff' : '#0072ce')};
  border-radius: 4px;
  border-color: ${props => (props.team ? '#ffffff' : '#0072ce')};
  box-shadow: 0 1.1vh 1.1vh -1.5vh ${props =>
    props.team ? '#ffffff' : '#0072ce'};
  transition: all 0.2s ease;

  &:hover {
        opacity: 1;
        box-shadow: 0 1.3vh 1.3vh -1.3vh ${props =>
          props.team ? '#ffffff' : '#0072ce'};
        transform: translateY(-3px);
      }
  }

  @media (max-width: 1366px) {
    box-shadow: 0 1.2vh 1.2vh -1.5vh ${props =>
      props.team ? '#ffffff' : '#0072ce'};
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.team ? '#0072ce' : '#ffffff')};
  margin-left: ${props => (props.team ? '-3vw' : 0)};
  margin-top: ${props => (props.team ? '9vh' : 0)};
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
    width: 80vw;
    height: auto;
  }
`

const PricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  width: 45%;
  height: 80%;

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

  span {
    width: 75%;
  }
`

const Feature = styled.p`
  color: ${props => (!props.team ? '#0072ce' : '#ffffff')};
  font-size: 1.7vh;
  margin-top: 0.7vh;
  margin-bottom: 0.7vh;
`
const PlanTitle = styled.h1`
  margin: 10px;
  font-size: 4vh;
  color: ${props => (!props.team ? '#0072ce' : '#ffffff')};
  font-weight: 500;
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
const ButtonText = styled(PlanTitle)`
  font-size: 1rem;
`
const PlanDesc = styled(Feature)`
  font-size: 1.5vh;
`
const CardTitle = styled(PlanTitle)`
  font-size: 3vh;
`

const StripeButton = styled(Button)`
  margin: 15px 0;
  width: 100%;
`

const PricingPage = () => {
  const dispatch = useDispatch()
  const queryToken = ({ id }) => {
    console.log(id)
    if (id) {
      dispatch(
        mutation({
          name: 'buySubscription',
          storeKey: 'user',
          mutation: BUY_SUBSCRIPTION,
          variables: { tokenId: id },
          onSuccessDispatch: [
            subscriptionId => ({
              type: 'FETCH_SUCCESS',
              payload: { data: subscriptionId, storeKey: 'user' },
            }),
          ],
        })
      )
    }
  }

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
              <Feature>1,25 - 2 GB of Ram</Feature>
              <Feature>No commercial use</Feature>
              <Button>
                <ButtonText team>Choose free plan</ButtonText>
              </Button>
            </PricingWrapper>
            <PricingWrapper>
              <PlanTitle>Pro</PlanTitle>
              <PlanDesc>Plan for professionals</PlanDesc>
              <Price>$39.99</Price>
              <PlanSubTitle>Per month</PlanSubTitle>
              <Feature>Private and Public repositories</Feature>
              <Feature>4 GB of RAM</Feature>
              <Feature>Commerial use</Feature>
              <StripeCheckout
                amount={3999}
                description="SiliSky"
                image="https://i.imgur.com/2IE6t8u.png"
                locale="en"
                name="SiliSky.com"
                stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
                token={queryToken}
                allowRememberMe={false}
              >
                <StripeButton>
                  <ButtonText team>Choose Pro</ButtonText>
                </StripeButton>
              </StripeCheckout>
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
                <ButtonText>Choose Enterprise</ButtonText>
              </Button>
            </PricingWrapper>
          </PricingSection>
        </Card>
      </CardsWrapper>
    </Layout>
  )
}
/* eslint-enable */

export default PricingPage
