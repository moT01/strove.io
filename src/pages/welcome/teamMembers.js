import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Formik, Field, FieldArray } from 'formik'
import Select from 'react-select'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { ADD_MEMBER } from 'queries'
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

const SectionTitle = styled.h2`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.c1};
  text-align: left;
  font-size: 1rem;
  padding: 0.5vh 0;
  margin: 0px;
  :focus {
    outline: none;
  }
`

const Setting = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
`

const emailsWrapper = styled(Setting)`
  align-items: flex-start;
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

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2vh 0 0;
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

const validatePort = values => {
  let errors = {}
  const port = values.port

  if (!port) {
    errors.port = 'This field is required. Please provide the information'
    return errors
  } else if (!/[0-9]{4}/g.test(port)) {
    errors.port = 'Invalid port format'
    return errors
  }

  return errors
}

const OrganizationName = ({ history }) => {
  const [envVariables, setEnvVariables] = useState(['', ''])

  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  const handleSubmit = emails => {
    console.log(emails)
  }

  return (
    <OnboardingContainer>
      <>
        <Title>Who else is working on your team?</Title>
        <SettingWrapper>
          <Formik
            initialValues={{ emails: ['', ''] }}
            validate={validatePort}
            render={({ values }) => (
              <StyledForm>
                <emailsWrapper>
                  <FieldArray
                    name="emails"
                    render={arrayHelpers => (
                      <>
                        <TableWrapper>
                          <Table>
                            {values.emails.map((env, index) => (
                              <TableRow key={index}>
                                <FormField
                                  type="email"
                                  placeholder="name@example.com"
                                  name={`emails.${index}.value`}
                                />
                              </TableRow>
                            ))}
                          </Table>
                          <AddButton
                            type="button"
                            onClick={() => {
                              arrayHelpers.push('')
                            }}
                          >
                            + Add another
                          </AddButton>
                        </TableWrapper>
                      </>
                    )}
                  />
                </emailsWrapper>
                <EnvButtonsWrapper>
                  <StroveButton
                    isPrimary
                    type="submit"
                    text="Save"
                    width="100%"
                    height="2rem"
                    padding="0.3rem"
                    onClick={() =>
                      handleSubmit(values.emails.filter(email => email.value))
                    }
                  />
                  <StroveButton
                    type="submit"
                    text="Cancel"
                    width="100%"
                    height="2rem"
                    padding="0.3rem"
                  />
                </EnvButtonsWrapper>
              </StyledForm>
            )}
          />
        </SettingWrapper>
      </>
    </OnboardingContainer>
  )
}

export default memo(OrganizationName)
