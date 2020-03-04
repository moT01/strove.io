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

const EnvsWrapper = styled(Setting)`
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
  height: 35px;
  width: 100%;
`

const StyledField = styled(Field)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.c1};
  height: 100%;
  width: 100%;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: scroll;
`

const RemoveButton = styled.button`
  width: 30px;
  height: 30px;
  text-align: center;
  box-shadow: inset 0px 1px 0px 0px #cf866c;
  background: linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
  background-color: #d0451b;
  border-radius: 100%;
  border: 1px solid #942911;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #854629;
  :hover {
    background: linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
    background-color: #bc3315;
  }
  :active {
    position: relative;
    top: 1px;
  }
`

const AddButton = styled.button`
  height: 30px;
  text-align: center;
  box-shadow: inset 0px 1px 0px 0px #9acc85;
  background: linear-gradient(to bottom, #74ad5a 5%, #68a54b 100%);
  background-color: #74ad5a;
  border: 1px solid #3b6e22;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  :hover {
    background: linear-gradient(to bottom, #68a54b 5%, #74ad5a 100%);
    background-color: #68a54b;
  }
  :active {
    position: relative;
    top: 1px;
  }
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
  const [envVariables, setEnvVariables] = useState([
    { name: 'Var one', value: 'random string' },
    { name: 'What is love?', value: `Baby don't hurt me` },
  ])

  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  const handleEnvSubmit = envs => {
    console.log(envs)
  }

  return (
    <OnboardingContainer>
      <>
        <Title>Who else is working on your team?</Title>
        <SectionTitle>Environment variables</SectionTitle>
        <SettingWrapper>
          <Formik
            initialValues={{
              envs: envVariables,
            }}
            validate={validatePort}
            render={({ values }) => (
              <StyledForm>
                <EnvsWrapper>
                  <FieldArray
                    name="envs"
                    render={arrayHelpers => (
                      <>
                        <TableWrapper>
                          <Table>
                            {values.envs.map((env, index) => (
                              <TableRow key={index}>
                                <StyledField
                                  isFirst={index === 0}
                                  name={`envs.${index}.value`}
                                />
                                <RemoveButton
                                  type="button"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  -
                                </RemoveButton>
                              </TableRow>
                            ))}
                          </Table>
                          <AddButton
                            type="button"
                            onClick={() => {
                              // values.envs[values.envs.length - 1].name !== '' &&
                              //   values.envs[values.envs.length - 1].value !==
                              //     '' &&
                              arrayHelpers.push({ name: '', value: '' })
                            }}
                          >
                            + Add another
                          </AddButton>
                        </TableWrapper>
                      </>
                    )}
                  />
                </EnvsWrapper>
                <EnvButtonsWrapper>
                  <StroveButton
                    isPrimary
                    type="submit"
                    text="Save"
                    width="100%"
                    height="2rem"
                    padding="0.3rem"
                    onClick={() =>
                      handleEnvSubmit(
                        values.envs.filter(
                          env => env.value !== '' && env.name !== ''
                        )
                      )
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
