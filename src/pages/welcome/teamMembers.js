import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Formik, FieldArray } from 'formik'
import { withRouter } from 'react-router-dom'
import * as Yup from 'yup'

import { StroveButton, InviteMembersForm } from 'components'
import { selectors } from 'state'
import { ADD_MEMBER } from 'queries'
import { mutation, updateOrganizations } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validationSchema = Yup.object().shape({
  emails: Yup.array()
    .of(Yup.string().email())
    .required('No emails to invite')
    .min(1, 'No emails to invite'),
})

const EmailsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EnvButtonsWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: center;
`

const TableWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 0 10px;
`

const AddButton = styled.button`
  height: 30px;
  text-align: center;
  align-self: flex-end;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  background: none;
  border: none;
`

const TeamMembers = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  return (
    <OnboardingContainer>
      <>
        <Title>Who else is working on your team?</Title>
        <InviteMembersForm />
        <SkipForNow onClick={() => history.push('/welcome/helloThere')}>
          Skip for now
        </SkipForNow>
      </>
    </OnboardingContainer>
  )
}

export default memo(withRouter(TeamMembers))
