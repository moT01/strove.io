import React, { memo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Formik, Field, FieldArray } from 'formik'
import Select from 'react-select'

import Modal from './modal'
import StroveButton from 'components/stroveButton.js'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledErrors = styled.span`
  color: ${({ theme }) => theme.colors.c5};
`

const StyledInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-align: left;
  font-size: 1rem;
  padding: 0.5vh 0;
  animation: ${FadeIn} 0, 5s ease-out;

  :focus {
    outline: none;
  }
`

const Text = styled.p`
  width: 80%;
  color: ${({ theme }) => theme.colors.c1};
  text-align: left;
  font-size: 1rem;
  padding: 0.5vh 0;
  margin: 0px;
  animation: ${FadeIn} 0, 5s ease-out;

  :focus {
    outline: none;
  }
`

const SectionTitle = styled.h2`
  align-self: flex-start;
  color: ${({ theme }) => theme.colors.c1};
  text-align: left;
  font-size: 1rem;
  padding: 0.5vh 0;
  margin: 0px;
  animation: ${FadeIn} 0, 5s ease-out;

  :focus {
    outline: none;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
  align-item: flex-start;
`

const HorizontalDivider = styled.div`
  width: 100%;
  height: 0px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-top-style: solid;
  opacity: 0.4;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EnvButtonsWrapper = styled(ColumnWrapper)`
  width: 20%;
  justify-content: flex-start;
  align-items: center;
`

const TableWrapper = styled(ColumnWrapper)`
  width: 80%;
  justify-content: flex-start;
  align-items: flex-start;
`

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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

const TableCell = styled.div`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.c1};
  height: 100%;
  width: ${props => (props.isRight ? '70%' : '30%')};
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: ${props => (props.isFirst ? 'solid' : 'none')}
    ${props => (props.isRight ? 'solid' : 'none')} solid solid;

  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: scroll;
`

const StyledField = styled(Field)`
  display: flex;
  flex-direction: row;
  color: ${({ theme }) => theme.colors.c1};
  height: 100%;
  width: ${props => (props.isRight ? '70%' : '30%')};
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: ${props => (props.isFirst ? 'solid' : 'none')}
    ${props => (props.isRight ? 'solid' : 'none')} solid solid;

  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow-x: scroll;
`

const DropdownWrapper = styled.div`
  width: 100%;
  flex-direction: row;
`

const StyledSelect = styled(Select)`
  width: ${props => (props.isLang ? '60%' : '20%')};
  color: ${({ theme }) => theme.colors.c1};
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
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
  width: 30px;
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

const DeployModal = ({ isOpen, setModalVisible }) => {
  const [editMode, setEditMode] = useState(null)
  const [envVariables, setEnvVariables] = useState([
    { name: 'Var one', value: 'random string' },
    { name: 'What is love?', value: `Baby don't hurt me` },
  ])
  const [languages, setLanguages] = useState([
    {
      value: 'Node.js',
      version: ['13.3.0', '13.2.9', '13.2.8'],
      label: 'Node.js',
    },
    { value: 'Python', version: ['1', '2', '3', '4'], label: 'Python' },
  ])

  const [selectedLanguage, setSelectedLanguage] = useState(null)
  const [selectedVersion, setSelectedVersion] = useState(null)

  const handleLanguageChange = selectedOption =>
    setSelectedLanguage(selectedOption)

  const handleVersionChange = selectedOption =>
    setSelectedVersion(selectedOption)

  const handleSave = () => {
    setEditMode(null)
  }

  const handleSaveAndClose = () => {
    setEditMode(null)
    setModalVisible(false)
  }

  const handleDiscard = () => {
    setEditMode(null)
    setModalVisible(false)
  }

  const handleEnvSubmit = envs => {
    setEditMode(null)
    setEnvVariables(envs)
  }

  console.log('SelectedLanguage', selectedLanguage, Boolean(selectedLanguage))

  return (
    <Modal
      width={isMobileOnly ? '90vw' : '60vw'}
      height={isMobileOnly ? '40vh' : '20vh'}
      isOpen={isOpen}
      contentLabel="Name project"
      ariaHideApp={false}
    >
      <HorizontalDivider />
      <SectionTitle>Ports</SectionTitle>
      {editMode === 'port' ? (
        <SettingWrapper>
          <Formik
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
            }}
            validate={validatePort}
            render={props => (
              <StyledForm onSubmit={props.handleSubmit}>
                <Setting>
                  <StyledInput
                    autoComplete="off"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.port}
                    name="port"
                    placeholder={isMobile ? 'Env value' : 'Env value'}
                  />
                  <StroveButton
                    isPrimary
                    type="submit"
                    text="Submit"
                    width="20%"
                    height="2rem"
                    padding="0.3rem"
                    onClick={() => setEditMode(false)}
                  />
                </Setting>
                <StyledErrors>{props.errors.port}</StyledErrors>
              </StyledForm>
            )}
          />
        </SettingWrapper>
      ) : (
        <SettingWrapper>
          <Setting>
            <Text>This is the setting value</Text>
            <StroveButton
              isPrimary
              type="submit"
              text="Edit"
              width="20%"
              height="2rem"
              padding="0.3rem"
              onClick={() => setEditMode('port')}
            />
          </Setting>
        </SettingWrapper>
      )}
      <HorizontalDivider />
      <SectionTitle>Environment variables</SectionTitle>
      {editMode === 'env' ? (
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
                                  name={`envs.${index}.name`}
                                />
                                <StyledField
                                  isRight
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
                            +
                          </AddButton>
                        </TableWrapper>
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
                            onClick={() => setEditMode(null)}
                          />
                        </EnvButtonsWrapper>
                      </>
                    )}
                  />
                </EnvsWrapper>
              </StyledForm>
            )}
          />
        </SettingWrapper>
      ) : (
        <EnvsWrapper>
          <TableWrapper>
            <Table>
              {envVariables.map((item, index) => (
                <TableRow>
                  <TableCell isFirst={index === 0}>{item.name}</TableCell>
                  <TableCell isRight isFirst={index === 0}>
                    {item.value}
                  </TableCell>
                </TableRow>
              ))}
            </Table>
          </TableWrapper>
          <StroveButton
            isPrimary
            type="submit"
            text="Edit"
            width="20%"
            height="2rem"
            padding="0.3rem"
            onClick={() => setEditMode('env')}
          />
        </EnvsWrapper>
      )}
      <HorizontalDivider />
      <SectionTitle>Build command</SectionTitle>
      {editMode === 'buildCommand' ? (
        <SettingWrapper>
          <Formik
            onSubmit={(values, actions) => {
              actions.setSubmitting(false)
            }}
            validate={validatePort}
            render={props => (
              <StyledForm onSubmit={props.handleSubmit}>
                <Setting>
                  <StyledInput
                    autoComplete="off"
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.port}
                    name="port"
                    placeholder={isMobile ? 'Env value' : 'Env value'}
                  />
                  <StroveButton
                    isPrimary
                    type="submit"
                    text="Submit"
                    width="20%"
                    height="2rem"
                    padding="0.3rem"
                    onClick={() => setEditMode(false)}
                  />
                </Setting>
                <StyledErrors>{props.errors.port}</StyledErrors>
              </StyledForm>
            )}
          />
        </SettingWrapper>
      ) : (
        <SettingWrapper>
          <Setting>
            <Text>This is the setting value</Text>
            <StroveButton
              isPrimary
              type="submit"
              text="Edit"
              width="20%"
              height="2rem"
              padding="0.3rem"
              onClick={() => setEditMode('buildCommand')}
            />
          </Setting>
        </SettingWrapper>
      )}
      <HorizontalDivider />
      <SectionTitle>Language</SectionTitle>
      <DropdownWrapper>
        <StyledSelect
          isLang
          value={selectedLanguage}
          onChange={handleLanguageChange}
          options={languages}
        />
        <StyledSelect
          isDisabled={() => Boolean(selectedLanguage)}
          value={selectedVersion}
          onChange={handleVersionChange}
          options={selectedLanguage}
        />
      </DropdownWrapper>
      <HorizontalDivider />
      <Setting>
        <StroveButton
          text="Save changes"
          isPrimary
          onClick={() => handleSave()}
          width="25%"
        />
        <StroveButton
          text="Save and close"
          isPrimary
          onClick={() => handleSaveAndClose()}
          width="25%"
        />
        <StroveButton
          text="Discard and close"
          onClick={() => handleDiscard()}
          width="25%"
        />
      </Setting>
    </Modal>
  )
}

export default memo(DeployModal)
