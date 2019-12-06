import React, { memo, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Formik } from 'formik'

import Modal from './modal'
import StroveButton from 'components/stroveButton.js'

const StyledErrors = styled.span`
  color: ${({ theme }) => theme.colors.c5};
`
const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;

  :focus {
    outline: none;
  }
`

const PortsForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2vh 0 0;
`

const SettingSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
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
  const [height, setHeight] = useState()
  const [editMode, setEditMode] = useState()
  return (
    <Modal
      width={isMobileOnly ? '90vw' : '60vw'}
      height={isMobileOnly ? '40vh' : '20vh'}
      isOpen={isOpen}
      contentLabel="Name project"
      ariaHideApp={false}
    >
      <Formik
        onSubmit={(values, actions) => {
          console.log('Hi values', values)
          actions.setSubmitting(false)
        }}
        validate={validatePort}
        render={props => (
          <PortsForm onSubmit={props.handleSubmit}>
            <SettingSection>
              <GithubLinkInput
                autoComplete="off"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.port}
                name="port"
                placeholder={isMobile ? 'Env value' : 'Env value'}
              />
              <StroveButton
                isDisabled={!props.values.port || props.errors.port}
                isPrimary
                type="submit"
                text="Submit"
                width="20%"
                height="2rem"
                minWidth="200px"
                padding="0.3rem"
              />

              <StyledErrors>{props.errors.port}</StyledErrors>
            </SettingSection>
          </PortsForm>
        )}
      />
      <SettingSection>
        <StroveButton
          text="Save changes"
          isPrimary
          onClick={() => setModalVisible(false)}
          width="25%"
        />
        <StroveButton
          text="Save and close"
          isPrimary
          onClick={() => setModalVisible(false)}
          width="25%"
        />
        <StroveButton
          text="Discard and close"
          onClick={() => setModalVisible(false)}
          width="25%"
        />
      </SettingSection>
    </Modal>
  )
}

export default memo(DeployModal)
