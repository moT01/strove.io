import React, { useState, memo } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'

import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'
import StroveButton from 'components/stroveButton.js'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const StyledH6 = styled.h6`
  margin: 50px 20px 0;
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 50px;
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

  }
`

const StyledFormWrapper = styled.div`
  max-width: 480px;
  align-self: center;
  margin: auto;
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  max-width: 300px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0.9;

  svg {
    fill: ${({ theme, invert }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
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
      cursor: pointer;
      &:hover {
        opacity: 1;
        transform: translateY(-3px);
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.colors.c1};
      }
    `}
`

const StyledButtonsWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const StyledMadeWithStrove = styled.div``

const StyledFeatureWrapper = styled.div`
  width: 100vw;
  padding: 0 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  align-items: center;
  overflow: hidden;
`

const Technologies = () => {
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()

  return (
    <>
      <StyledFeatureWrapper>
        <StyledMadeWithStrove>
          Obviously, this app is made with Strove as well
        </StyledMadeWithStrove>
        <StyledButtonsWrapper>
          <StyledAnchor
            primary
            href="https://github.com/stroveio/strove.io-client"
            rel="noopener noreferrer"
            target="_blank"
          >
            Check our source
          </StyledAnchor>
          or, even better
          <StyledAnchor
            primary
            href="/#https://github.com/stroveio/strove.io-client"
            rel="noopener noreferrer"
            target="_blank"
          >
            Start editing
          </StyledAnchor>
        </StyledButtonsWrapper>
      </StyledFeatureWrapper>
      <StyledFormWrapper>
        <StyledH6>Be up to date with new deals and features!</StyledH6>
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
                variables: { email: values.email, isNewsletter: true },
                onSuccess: () => setEmailSent(true),
              })
            )
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
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
                  layout="form"
                  type="submit"
                  text="Subscribe to newsletter"
                  disabled={errors.email || !values.email}
                />
              </EmailFormWrapper>
              {emailSent && <StyledH6>Thank you!</StyledH6>}
            </Form>
          )}
        </Formik>
      </StyledFormWrapper>
    </>
  )
}

export default memo(Technologies)
