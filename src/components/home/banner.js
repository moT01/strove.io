import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { useDispatch } from 'react-redux'
import Modal from 'react-modal'
import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'

import { theme } from 'consts'
import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'
import { GetStarted, Logos, TrialInfo, StroveButton } from 'components'

import {
  FadeIn,
  StyledModal,
  StyledCellHeader,
  StyledSectionWrapper,
  StyledIcon,
} from './styled'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const SectionDivider = styled.div`
  display: flex;
  flex-direction: ${({ isMobile, flexDirection }) =>
    flexDirection || (isMobile ? 'column' : 'row')};
  align-items: center;
  height: 100%;
  width: 100%;
  max-width: 1200px;
`

const SectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  padding: ${({ padding }) => padding || '0'};
`

const SmallSectionWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  max-width: 440px;
  max-height: 440px;
  padding: ${({ padding }) => padding || '0'};
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
`

const StyledH2 = styled.h2`
  margin: 0;
  font-size: 40px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  color: ${({ color, theme }) => color || theme.colors.c2};
`

const StyledH3 = styled.h3`
  margin: 0;
  font-size: 32px;
  width: 100%;
  text-align: center;
  color: ${({ color, theme }) => color || theme.colors.c26};
`

const Video = styled.video`
  width: ${props => (props.isMobile ? '90vw' : 'calc(100% - 40px)')};
  margin-top: ${props => (props.isMobile ? '5vh' : '0')};
  outline: none;
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
  font-size: 40px;
`

const StyledHeadingSection = styled.div`
  max-width: 520px;
  margin: auto 20px;
  margin-bottom: auto;
  font-size: 20px;

  @media (max-width: 767px) {
    width: 100%;
  }
`

const StyledProductDescription = styled.h4`
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  color: ${({ theme, color }) => color || theme.colors.c26};
`

const StyledSmallText = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin: 20px 0;
  ${({ isUpperCase }) => isUpperCase && 'text-transform: uppercase;'}
`

const StyledFeatureDescription = styled.div`
  font-size: 1rem;
  margin-bottom: 20px;
  width: 100%;
  text-align: left;
  color: ${({ color, theme }) => color || theme.colors.c26};
`

const StyledTechnologyDescriptionWrapper = styled.div`
  min-height: ${({ isMobile }) => (isMobile ? '150px' : '100px')};
  display: flex;
  flex-direction: column;
  margin: 20px 20px 0;
  max-width: 800px;
  color: ${({ color, theme }) => color || theme.colors.c2};
`

const StyledGrid = styled.div`
  display: grid;
  grid-gap: 10px;
  background-color: ${({ theme }) => theme.colors.c3};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  border-top: 1px solid white;
`

const StyledCell = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  margin: 20px;
`

const IconContainer = styled.div`
  margin: auto 10px;
  width: 40px;
  height: auto;

  @media (max-width: 960px) {
    flex-shrink: 0;
  }
`

const StyledHeaderText = styled.div`
  margin: 0 10px 5px 10px;
  text-align: left;
`

const Illustration = styled.img`
  margin: 0 20px;
  width: 50%;
  height: 50%;
  max-width: 520px;
`

const defaultTechnologyDescription =
  'Strove.io represents each environment as a Docker container built from a shared image. This lets you code in seconds, on any computer and forget that `it works on my machine` issue ever existed.'

const Banner = () => {
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
      <StyledSectionWrapper padding={isMobileOnly ? '20px' : '50px'}>
        <StyledHeadingSection type={isMobileOnly ? 'bottom' : 'right'}>
          <StyledH1>Cloud alternative for software development</StyledH1>
          <StyledProductDescription>
            Manage team. Write, run and share code, all in one place
          </StyledProductDescription>
          <ButtonsWrapper mobile={isMobileOnly}>
            <StroveButton
              height="56px"
              width="100%"
              fontSize="1.3rem"
              fontWeight="bold"
              isPrimary
              text="Get started"
              letterSpacing="0.8px"
              onClick={() => setModalVisible(true)}
            />
            <TrialInfo>
              <li>Free demo</li>
              <li>No credit card needed</li>
              <li>No setup</li>
            </TrialInfo>
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
              {({ errors, values }) => (
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
                        fillRule="evenodd"
                        stroke="#9CA2B4"
                        strokeWidth="2"
                      >
                        <path d="M2 4h20v16H2z"></path>
                        <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                      </g>
                    </svg>
                    <StroveButton
                      type="submit"
                      layout="form"
                      text="Request demo"
                      disabled={errors.email || !values.email}
                    />
                  </EmailFormWrapper>
                  {emailSent && (
                    <StyledInfo>Thank you, we'll get in touch soon!</StyledInfo>
                  )}
                </StyledForm>
              )}
            </Formik>
          </ButtonsWrapper>
        </StyledHeadingSection>
        {!isMobileOnly && (
          <Illustration
            src={require('assets/illustration.png')}
            alt="illustration"
            width="50%"
            height="50%"
          />
        )}
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        background={theme.colors.c2}
        padding={`20px ${isMobile ? '20px' : '25%'}`}
      >
        <SectionDivider flexDirection="column">
          <IconContainer>
            <Icon
              type="code-o"
              style={{ fontSize: '26px', color: theme.colors.c3 }}
            />
          </IconContainer>
          <StyledH3 color={theme.colors.c3}>Developers First</StyledH3>
          <StyledProductDescription color={theme.colors.c26}>
            Strove is the platform made by programmers for programmers. We made
            sure that Strove resembles local environment as closely as possible
            while adding cloud-related productivity benefits on top of it.
          </StyledProductDescription>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="20px" background="white">
        <SectionDivider isMobile={isMobile}>
          <SectionWrapper isMobile={isMobile} padding="20px 10px">
            <SmallSectionWrapper isMobile={isMobile}>
              <StyledCell>
                <StyledCellHeader>
                  <StyledH2 color={theme.colors.c3}>Save time</StyledH2>
                </StyledCellHeader>
                <StyledProductDescription>
                  Save hours to days per developer by running code in seconds
                  from anywhere
                </StyledProductDescription>
              </StyledCell>
            </SmallSectionWrapper>
          </SectionWrapper>
          <SectionWrapper padding="20px 10px">
            <img
              src={require('assets/editorPresentation.png')}
              alt="editor presentation"
            />
          </SectionWrapper>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="50px 20px 50px"
        background="black"
      >
        <SectionDivider isMobile={isMobile}>
          <SectionWrapper isMobile={isMobile} padding="20px 10px">
            <SectionWrapper isMobile={isMobile}>
              <img
                src={require('assets/dashboardPresentation.png')}
                alt="dashboard presentation"
              />
            </SectionWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <SmallSectionWrapper padding="20px 10px">
              <StyledCell>
                <StyledCellHeader>
                  <StyledH2>More effective collaboration</StyledH2>
                </StyledCellHeader>
                <StyledProductDescription>
                  Spend more time on what matters by reducing managing
                  permissions or sharing environment to a single click
                </StyledProductDescription>
              </StyledCell>
            </SmallSectionWrapper>
          </SectionWrapper>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="0 20px 20px"
        background={theme.colors.c3}
      >
        <StyledGrid>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="clock-circle" />
              </IconContainer>
              <StyledHeaderText>Give focus a chance</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              There's a lot of time and work needed to make code work on local
              machines. Choosing cloud environment lets team do their actual job
              from the get go.
            </StyledFeatureDescription>
          </StyledCell>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="bug" />
              </IconContainer>
              <StyledHeaderText>Debug less</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              Say goodbye to 'It works on my machine' issue. The code will work
              the same for all team members, no matter the machine or operating
              system.
            </StyledFeatureDescription>
          </StyledCell>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="cloud-sync" />
              </IconContainer>
              <StyledHeaderText>Development, organized</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              Unlike in the past, sharing the environment with anyone in the
              team can be done with a single click.
            </StyledFeatureDescription>
          </StyledCell>
        </StyledGrid>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="50px 20px 0">
        <SectionWrapper>
          <StyledSmallText isUpperCase>What is strove?</StyledSmallText>
          <StyledH3 color={theme.colors.c2}>
            Strove brings ready in seconds, pre-configured cloud servers to
            write, run, build and manage software remotely
          </StyledH3>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledSectionWrapper isSecondary padding="20px">
        <SectionWrapper isSecondary>
          <Logos handleHoverIn={handleHoverIn} />
          <StyledTechnologyDescriptionWrapper isMobile={isMobileOnly}>
            <StyledSmallText>{technologyDescription}</StyledSmallText>
          </StyledTechnologyDescriptionWrapper>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledModal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        ariaHideApp={false}
        isMobile={isMobileOnly}
      >
        {!isMobile && (
          <StyledIcon type="close" onClick={() => setModalVisible(false)} />
        )}
        <GetStarted closeModal={closeModal} />
      </StyledModal>
    </>
  )
}
export default Banner
