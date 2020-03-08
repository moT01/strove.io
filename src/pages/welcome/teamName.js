import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { withRouter } from 'react-router-dom'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_TEAM } from 'queries'
import { mutation, updateOrganizations } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validationSchema = Yup.object().shape({
  team: Yup.object().shape({
    team_name: Yup.string()
      .min(4, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Required'),
  }),
})

const TeamName = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()
  console.log('teamId', myOrganizations[0]?.teams[0]?.id)
  return (
    <OnboardingContainer>
      <>
        <Title>What's the name of your team?</Title>
        <Formik
          initialValues={{
            name: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            dispatch(
              mutation({
                name: 'renameTeam',
                mutation: RENAME_TEAM,
                variables: {
                  newName: values.team?.team_name,
                  teamId: myOrganizations[0]?.teams[0]?.id,
                },
                onSuccessDispatch: updateOrganizations,
                // onSuccess: () => history.push('/welcome/teamMembers'),
              })
            )
          }}
        >
          {({ errors, values }) => (
            <>
              <StyledForm>
                {console.log('teamName', values.team?.team_name)}
                <FormField
                  type="text"
                  name="team[team_name]"
                  placeholder="Your team name"
                ></FormField>
                <StroveButton
                  type="submit"
                  margin="20px 0 10px"
                  isPrimary
                  text="Next"
                  // isGetStarted
                  disabled={errors?.team?.team_name || !values.team?.team_name}
                />
                {errors?.nam && (
                  <TextToLeft>{errors?.team?.team_name}</TextToLeft>
                )}
              </StyledForm>
              <SkipForNow onClick={() => history.push('/app/dashboard')}>
                Skip for now
              </SkipForNow>
            </>
          )}
        </Formik>
      </>
    </OnboardingContainer>
  )
}

export default memo(withRouter(TeamName))
