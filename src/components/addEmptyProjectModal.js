import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Formik } from 'formik'
import { isMobileOnly } from 'react-device-detect'

import Modal from './modal'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 70px;
  margin: 5px;
  padding: 10px 30px;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.colors.c1};
        transform: translateY(-1px);
      }
    `}
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: ${({ theme }) => theme.colors.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
  text-align: center;
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

const GithubLinkForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2vh 0 0;
`

const StyledErrors = styled.span`
  color: red;
`

const validateProjectName = values => {
  let errors = {}

  if (values.projectName && !values.projectName.trim()) {
    errors.projectName = 'Add name'
    return errors
  } else if (values.projectName.length > 100) {
    errors.projectName = 'Name too long'
    return errors
  }

  return errors
}

const AddEmptyProjectModal = ({ handleClose, isOpen, addProject }) => (
  <Modal
    width={isMobileOnly ? '60vw' : '30vw'}
    height={isMobileOnly ? '40vh' : '20vh'}
    isOpen={isOpen}
    onRequestClose={() => handleClose()}
    contentLabel="Name project"
    ariaHideApp={false}
  >
    <Title mobile={isMobileOnly}>Add project's name</Title>
    <Formik
      onSubmit={(values, actions) => {
        handleClose()
        addProject({ name: values.projectName.trim() })
        actions.setSubmitting(false)
      }}
      validate={validateProjectName}
      render={props => (
        <GithubLinkForm onSubmit={props.handleSubmit}>
          <GithubLinkInput
            autoComplete="off"
            type="text"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.projectName}
            name="projectName"
            placeholder={'Name'}
          />
          <Button
            disabled={!props.values.projectName || props.errors.projectName}
            primary
            mobile={isMobileOnly}
            type="submit"
          >
            Create project
          </Button>
          <StyledErrors>{props.errors.projectName}</StyledErrors>
        </GithubLinkForm>
      )}
    />
  </Modal>
)

export default memo(AddEmptyProjectModal)
