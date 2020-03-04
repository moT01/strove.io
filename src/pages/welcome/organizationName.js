import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validate = values => {
  const regex = new RegExp(/^[a-zA-Z0-9_]+$/)
  let errors = {}

  if (!values.organization?.profile_name) {
    errors.organization = 'Name is empty'
  }

  if (!regex.test(values.organization?.profile_name)) {
    errors.organization = 'Name should only contain letters and numbers'
  }

  if (
    values.organization?.profile_name &&
    values.organization?.profile_name?.length < 4
  ) {
    errors.organization = 'Name is too short'
  }

  return errors
}

const OrganizationName = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <Title>What's the name of your company or organization?</Title>
        <Formik
          initialValues={{
            name: '',
          }}
          validate={validate}
          onSubmit={values => {
            dispatch(
              mutation({
                name: 'renameOrganization',
                mutation: RENAME_ORGANIZATION,
                variables: {
                  newName: values.organization?.profile_name,
                  organizationId: myOrganizations[0]?.id,
                },
              })
            )
          }}
        >
          {({ errors, values }) => (
            <>
              <StyledForm>
                <FormField
                  type="text"
                  name="organization[profile_name]"
                  placeholder="Your company or organization name"
                ></FormField>
                <StroveButton
                  margin="20px 0 10px"
                  isPrimary
                  text="Next"
                  isGetStarted
                  disabled={
                    errors?.organization || !values.organization?.profile_name
                  }
                  navigateTo="/welcome/teamName"
                />
                {errors?.organization && (
                  <TextToLeft>{errors?.organization}</TextToLeft>
                )}
              </StyledForm>
              <SkipForNow onClick={() => history.push('/welcome/teamName')}>
                Skip for now
              </SkipForNow>
            </>
          )}
        </Formik>
      </>
    </OnboardingContainer>
  )
}

export default memo(OrganizationName)
