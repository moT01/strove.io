import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validationSchema = Yup.object().shape({
  organization: Yup.object().shape({
    profile_name: Yup.string()
      .min(4, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Required'),
  }),
})

const OrganizationName = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <Title>What's the name of your company or organization?</Title>
        <Formik
          initialValues={{
            organization: { profile_name: '' },
          }}
          validationSchema={validationSchema}
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
                    errors?.organization?.profile_name ||
                    !values.organization?.profile_name
                  }
                  navigateTo="/welcome/teamName"
                />
                {errors?.organization && (
                  <TextToLeft>{errors?.organization?.profile_name}</TextToLeft>
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

export default memo(withRouter(OrganizationName))
