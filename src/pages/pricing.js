import React, { useState, memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import StripeCheckout from 'react-stripe-checkout'
import { isMobileOnly, isTablet } from 'react-device-detect'
import { useSelector, useDispatch } from 'react-redux'

import { BUY_SUBSCRIPTION } from 'queries'
import { mutation } from 'utils'
import SEO from 'components/seo'
import Layout from 'components/layout'
import { C } from 'state'
import Modal from 'components/modal'
import { Github } from 'images/logos'
import { selectors } from 'state'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3vh;
  animation: ${ButtonFadeIn} 0.3s ease-out;

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
  box-shadow: 0 1.1vh 1.1vh -1.5vh ${props => (props.team ? '#ffffff' : '#0072ce')};
  transition: all 0.2s ease;

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.3vh 1.3vh -1.3vh ${props => (props.team ? '#ffffff' : '#0072ce')};
        transform: translateY(-3px);
      }
    `}

  @media (max-width: 1366px) {
    box-shadow: 0 1.2vh 1.2vh -1.5vh ${props => (props.team ? '#ffffff' : '#0072ce')};
  }
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 100%;
  max-width: 300px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  svg {
    fill: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    width: 2.2vh;
    height: auto;
    margin-left: 5px;
  }

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        transform: translateY(-3px);
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
      }
    `}
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.team ? '#0072ce' : '#ffffff')};
  margin-left: ${props => (props.team ? '-3vw' : 0)};
  margin-top: ${props => (props.team ? '9vh' : 0)};
  z-index: ${props => (props.team ? -1 : 0)};
  border-radius: 5px;
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

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 12px;
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  text-align: center;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.mobile === 'mobile'
      ? '85%'
      : props.mobile === 'tablet'
      ? '60%'
      : '45%'};
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
  const [modalVisible, setModalVisible] = useState(false)
  const incomingProjectRepoLink = useSelector(
    selectors.incomingProject.getRepoLink
  )
  const incomingProject = useSelector(selectors.incomingProject.getProjectData)

  console.log('incomingProjectRepoLink', incomingProjectRepoLink)
  console.tab('incomingProject', incomingProject)

  const githubHref = incomingProjectRepoLink
    ? `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,repo&state=github#${incomingProjectRepoLink}`
    : `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,repo&state=github`

  const device = isMobileOnly ? 'mobile' : isTablet ? 'tablet' : 'computer'
  const queryToken = ({ id }) => {
    if (id) {
      dispatch(
        mutation({
          name: 'buySubscription',
          storeKey: 'subscription',
          mutation: BUY_SUBSCRIPTION,
          variables: { tokenId: id },
          onSuccess: data => {
            setModalVisible(true)
            console.log('Subscription', data)
          },
          onSuccessDispatch: [
            ({ buySubscription }) => ({
              type: C.api.FETCH_SUCCESS,
              payload: { storeKey: 'subscription', data: buySubscription },
            }),
          ],
        })
      )
    }
  }

  return (
    <>
      <Modal
        isOpen={!!modalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentLabel={'Activate Pro plan'}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '45vh' : '30vh'}
        zIndex={99}
      >
        <ModalWrapper>
          <Text>
            To take full advantage of pro plan and to be able to clone private
            repositories you need to log in with private repo access permission
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={githubHref}
              onClick={() => setModalVisible(false)}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <Button onClick={() => setModalVisible(false)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
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
                <Button disabled>
                  <ButtonText team>Already subscribed</ButtonText>
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
    </>
  )
}

export default memo(PricingPage)
