import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import {
  Title,
  FormField,
  StyledForm,
  SkipForNow,
  TextToLeft,
  Details,
} from './styled'

const HelloThere = ({ history }) => {
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <div>
          <Title>Hello there!</Title>
          <Details>
            Strove is an alternative for local software development
          </Details>
        </div>
        <SkipForNow onClick={() => history.push('/app/dashboard')}>
          Go to my dashboard
        </SkipForNow>
      </>
    </OnboardingContainer>
  )
}

export default memo(HelloThere)
