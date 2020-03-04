import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const HelloThere = ({ history }) => {
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <Title>Hello there!</Title>
        <Title>Strove is an alternative for local software development</Title>
        <SkipForNow onClick={() => history.push('/app/dashboard')}>
          Go to my dashboard
        </SkipForNow>
      </>
    </OnboardingContainer>
  )
}

export default memo(HelloThere)
