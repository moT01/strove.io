import React, { useState, memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Formik } from 'formik'
import { isMobile, isMobileOnly } from 'react-device-detect'

import AddProjectProvider from './addProjectProvider'
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

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const AddProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin-bottom: 0;
  height: auto;
  width: auto;
  min-width: 50vw;
  max-width: 100vw;
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
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
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
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
        transform: translateY(-1px);
      }
    `}
`

const ModalButton = styled(Button)`
  animation: ${FullFadeIn} 0.2s ease-out;
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
  text-align: center;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: #0072ce;
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;

  :focus {
    outline: none;
  }
`

const ModalText = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
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

const GetStarted = ({ addProject }) => {
  const [nameModal, setNameModal] = useState(false)
  const validateRepoLink = values => {
    let errors = {}

    if (!values.repoLink) {
      return errors
    } else if (values.repoLink && !values.repoLink.trim()) {
      errors.repoLink = 'No link provided'
      return errors
    } else if (
      !/.*(github|gitlab|bitbucket).(com|org)\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
        values.repoLink
      )
    ) {
      errors.repoLink = 'Invalid repository link'
      return errors
    }

    return errors
  }

  const validateProjectName = values => {
    let errors = {}

    if (!values.projectName) {
      return errors
    } else if (values.projectName && !values.projectName.trim()) {
      errors.projectName = 'Add name'
      return errors
    } else if (
      !/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/i.test(values.projectName)
    ) {
      errors.projectName = 'Invalid name'
      return errors
    }

    return errors
  }

  return (
    <AddProjectWrapper mobile={isMobile}>
      <Title mobile={isMobile}>
        Add project from Github, Gitlab or Bitbucket
      </Title>
      <Formik
        onSubmit={(values, actions) => {
          values.repoLink.trim() &&
            addProject({ link: values.repoLink.replace(/.git$/, '') })
          actions.setSubmitting(false)
        }}
        validate={validateRepoLink}
        render={props => (
          <GithubLinkForm onSubmit={props.handleSubmit}>
            <GithubLinkInput
              autoComplete="off"
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.repoLink}
              name="repoLink"
              placeholder={
                isMobile
                  ? 'Paste repo link here'
                  : 'https://github.com/evil-corp/worldDomination'
              }
            />
            <Button
              disabled={!props.values.repoLink || props.errors.repoLink}
              primary
              mobile={isMobile}
              type="submit"
            >
              Clone project
            </Button>

            <StyledErrors>{props.errors.repoLink}</StyledErrors>
          </GithubLinkForm>
        )}
      />
      Don't have a link? Want to clone private repository? Create an empty
      project
      <Button primary mobile={isMobile} onClick={() => setNameModal(true)}>
        Create empty project
      </Button>
      <Modal
        width={isMobileOnly ? '60vw' : '30vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={nameModal}
        onRequestClose={() => setNameModal(false)}
        contentLabel="Name project"
        ariaHideApp={false}
      >
        <ModalText>Add project's name</ModalText>
        <Formik
          onSubmit={(values, actions) => {
            setNameModal(false)
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
                placeholder={"Project's name"}
              />
              <Button
                disabled={!props.values.projectName || props.errors.projectName}
                primary
                mobile={isMobile}
                type="submit"
              >
                Create project
              </Button>

              <StyledErrors>{props.errors.repoLink}</StyledErrors>
            </GithubLinkForm>
          )}
        />
        <ModalButton onClick={() => setNameModal(false)}>Close</ModalButton>
      </Modal>
    </AddProjectWrapper>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <GetStarted addProject={addProject} />}
  </AddProjectProvider>
))
