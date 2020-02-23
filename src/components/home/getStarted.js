import React, { useState, memo } from 'react'

import { withRouter } from 'react-router-dom'

import {
  ButtonsWrapper,
  StyledInfo,
  StyledForm,
  EmailFormWrapper,
} from './styled'

const GetStarted = ({ history }) => {
  const dispatch = useDispatch()
  const [emailSent, setEmailSent] = useState(false)

  return (
    <ButtonsWrapper mobile={isMobileOnly}>
      <StroveButton
        height="56px"
        width="100%"
        fontSize="1.3rem"
        fontWeight="bold"
        isPrimary
        text="Get started"
        margin="0"
        letterSpacing="0.8px"
        onClick={() => history.push('/welcome/login')}
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
              <Field type="email" name="email" placeholder="Your Email"></Field>
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
  )
}

export default withRouter(memo(GetStarted))
