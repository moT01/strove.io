import React, { useState, useCallback } from 'react'
import QueueAnim from 'rc-queue-anim'
import styled, { keyframes, css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'

import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'
import { selectors } from 'state'
import FullScreenLoader from 'components/fullScreenLoader'
import GetStarted from 'components/getStarted'
import Demo from 'assets/StroveDemo.mp4'
import demoPreview from 'assets/demoPreview.png'
import Logos from 'components/logos.js'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`

const SectionDivider = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
  width: 100%;
`

const SectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
`

const LeftSectionWrapper = styled(SectionWrapper)`
  width: 50%;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: 56px;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: 0.8px;
  width: 100%;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  font-size: 1.3rem;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;
  :focus {
    outline: 0;
  }
  &:disabled {
    opacity: 0.4;
  }
  ${props =>
    !props.disabled
      ? css`
          animation: ${ButtonFadeIn} 1s ease-out;
          cursor: pointer;
          &:hover {
            opacity: 1;
            box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
              0 9px 26px 0 rgba(174, 174, 186, 0.16);
          }
        `
      : css`
          cursor: not-allowed;
        `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: ${({ theme }) => theme.colors.c2};
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}
  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }
  input {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.c12};
    outline: 0;
    background: ${({ theme }) => theme.colors.c2};
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: 64px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }
  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;
    g {
      stroke: ${({ theme }) => theme.colors.c1};
    }
  }
  button {
    width: 156px;
    height: 56px;
    color: ${({ theme }) => theme.colors.c2};
    background: ${({ theme }) => theme.colors.c1};
    text-transform: uppercase;
    display: block;
    text-align: center;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0.8px;
    transition: opacity 0.2s;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    outline: none;
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
      `}
    ${props =>
      !props.disabled
        ? css`
            cursor: pointer;
            &:hover {
              opacity: 1;
              box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
                0 9px 26px 0 rgba(174, 174, 186, 0.16);
            }
          `
        : css`
            cursor: not-allowed;
          `}
  }
`

const StyledH2 = styled.h2`
  margin-bottom: 20px;
  font-size: 34px;
`

const StyledH3 = styled.h3`
  margin-bottom: 0;
  font-size: 28px;
`

const Video = styled.video`
  width: ${props => (props.isMobile ? '90vw' : 'calc(100% - 40px)')};
  margin-top: ${props => (props.isMobile ? '5vh' : '0')};
  outline: none;
`

const StyledModal = styled(Modal)`
  display: flex;
  height: auto;
  width: auto;
  position: fixed;
  animation: ${FadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
`

const StyledSectionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isSecondary }) =>
    !isSecondary &&
    css`
      min-height: 85vh;
    `}
  width: 100%;
  position: relative;

  ${({ isSecondary }) =>
    isSecondary &&
    css`
      background-color: ${({ theme }) => theme.colors.c1};
      color: ${({ theme }) => theme.colors.c2};
    `}

    padding: ${({ padding }) => padding};
    ${({ minHeight }) => css`
      min-height: ${minHeight};
    `};
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
  cursor: pointer;
  :focus {
    outline: none;
  }
`

const StyledTrialInfo = styled.ul`
  font-size: 13px;
  padding: 0;
  margin: 0;
  li {
    display: inline-block;
    margin-right: 8px;
    list-style: none;
    &:before {
      margin-right: 0.3em;
      content: '✔';
      color: ${({ theme }) => theme.colors.c1};
    }
  }
`

const StyledForm = styled(Form)`
  width: 100%;
`

const StyledInfo = styled.span`
  margin: 20px;
  color: ${({ theme }) => theme.colors.c13};
  font-size: 13px;
`

const StyledH1 = styled.h1`
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.c3};
  font-weight: 700;
  font-size: 50px;
`

const StyledQueueAnim = styled(QueueAnim)`
  width: 60%;
  max-width: 480px;
  margin: auto 20px;
  margin-bottom: auto;
  font-size: 20px;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const StyledProductDescription = styled.h4`
  font-weight: 500;
`

const StyledSmallText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0;
  ${({ isUpperCase }) => isUpperCase && 'text-transform: uppercase;'}
`

const StyledFeatureDescription = styled.span`
  font-size: 1rem;
  margin-bottom: 20px;
`

const StyledTechnologyDescriptionWrapper = styled.div`
  min-height: ${({ isMobile }) => (isMobile ? '150px' : '100px')};
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  g,
  path {
    stroke: ${({ theme }) => theme.colors.c2};
  }

  svg,
  path {
    fill: white;
  }
`

const defaultTechnologyDescription =
  'Strove.io represents each environment as a Docker container built from a shared image. This lets you code in seconds, on any computer and forget that `it works on my machine` issue ever existed.'

const Banner = () => {
  const isLoading = useSelector(selectors.api.getLoading('user'))
  const [isModalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const closeModal = () => setModalVisible(false)
  const [emailSent, setEmailSent] = useState(false)
  const [technologyDescription, setTechnologyDescription] = useState(
    defaultTechnologyDescription
  )
  const handleHoverIn = logo => setTechnologyDescription(logo)

  return (
    <>
      <StyledSectionWrapper padding="50px 0 0">
        <StyledQueueAnim type={isMobileOnly ? 'bottom' : 'right'}>
          <StyledH1>Bring your ideas to life</StyledH1>
          <StyledProductDescription>
            Strove.io gives you <b>instant</b> environment to <b>learn</b>,{' '}
            <b>build</b> and <b>collaborate</b> no matter the language. All you
            need is a browser.
          </StyledProductDescription>
          <ButtonsWrapper mobile={isMobileOnly}>
            <Button
              primary
              mobile={isMobileOnly}
              disabled={isLoading}
              onClick={useCallback(() => setModalVisible(true))}
            >
              {isLoading ? (
                <FullScreenLoader
                  isFullScreen={false}
                  color={'#ffffff'}
                  height={'1.7rem'}
                />
              ) : (
                'Get started'
              )}
            </Button>
            <StyledTrialInfo>
              <li>Free for non-commercial use</li>
            </StyledTrialInfo>
            <StyledInfo>Or, if you're a corporate user:</StyledInfo>
            <Formik
              initialValues={{
                email: '',
              }}
              validate={validate}
              onSubmit={values => {
                dispatch(
                  mutation({
                    name: 'sendEmail',
                    context: null,
                    mutation: SEND_EMAIL,
                    variables: { email: values.email, isDemo: true },
                    onSuccess: () => setEmailSent(true),
                  })
                )
              }}
            >
              {({ errors, touched, values }) => (
                <StyledForm>
                  <EmailFormWrapper
                    disabled={errors.email || !values.email}
                    isMobile={isMobileOnly}
                  >
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                    ></Field>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        fill-rule="evenodd"
                        stroke="#9CA2B4"
                        stroke-width="2"
                      >
                        <path d="M2 4h20v16H2z"></path>
                        <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                      </g>
                    </svg>
                    <button
                      type="submit"
                      isDisabled={values.email && errors.email && touched.email}
                    >
                      Request demo
                    </button>
                  </EmailFormWrapper>
                  <StyledTrialInfo>
                    <li>Free 14-day Demo</li>
                    <li>No credit card needed</li>
                    <li>No setup</li>
                  </StyledTrialInfo>
                  {emailSent && (
                    <StyledInfo>Thank you, we'll get in touch soon!</StyledInfo>
                  )}
                </StyledForm>
              )}
            </Formik>
          </ButtonsWrapper>
        </StyledQueueAnim>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="50px 0 0">
        <SectionWrapper>
          <StyledSmallText isUpperCase>
            <upperCase>What is strove?</upperCase>
          </StyledSmallText>
          <StyledH2>
            Strove brings ready in seconds, pre-configured and remote dev environment.
          </StyledH2>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="20px 0 50px">
        <SectionWrapper isSecondary>
          <Logos handleHoverIn={handleHoverIn} />
          <StyledTechnologyDescriptionWrapper isMobile={isMobileOnly}>
            <StyledSmallText>{technologyDescription}</StyledSmallText>
          </StyledTechnologyDescriptionWrapper>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="0 0 50px">
        <SectionDivider isMobile={isMobile}>
          <SectionWrapper isMobile={isMobile}>
            <LeftSectionWrapper isMobile={isMobile}>
              <StyledH3>Focus on what's important</StyledH3>
              <StyledFeatureDescription>
                Start coding in seconds, no setup needed
              </StyledFeatureDescription>
              <StyledH3>Code on any computer, anywhere</StyledH3>
              <StyledFeatureDescription>
                Don't lose your progress, even when switching computers
              </StyledFeatureDescription>
              <StyledH3>Use worlds most popular coding editor</StyledH3>
              <StyledFeatureDescription>
                Get the best coding experience with Visual Studio Code support
              </StyledFeatureDescription>
            </LeftSectionWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <Video isMobile={isMobile} controls poster={demoPreview}>
              <source src={Demo} type="video/mp4"></source>
            </Video>
          </SectionWrapper>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledModal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        ariaHideApp={false}
        isMobile={isMobileOnly}
      >
        {!isMobile && (
          <StyledIcon
            type="close"
            onClick={useCallback(() => setModalVisible(false))}
          />
        )}
        <GetStarted closeModal={closeModal} />
      </StyledModal>
    </>
  )
}
export default Banner
