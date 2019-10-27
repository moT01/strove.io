import React, { useState, memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Formik } from 'formik'
import { isMobile } from 'react-device-detect'

import AddProjectProvider from './addProjectProvider'
import AddEmptyProjectModal from './addEmptyProjectModal'

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

const AddProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${({ theme }) => theme.colors.c1};
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
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
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

const GetStarted = ({ addProject }) => {
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false)

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
      Don't have a link? Want to clone private repository?
      <Button
        primary
        mobile={isMobile}
        onClick={() => setAddProjectModalOpen(true)}
      >
        Create empty project
      </Button>
      <AddEmptyProjectModal
        handleClose={setAddProjectModalOpen}
        isOpen={addProjectModalOpen}
        addProject={addProject}
      />
    </AddProjectWrapper>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <GetStarted addProject={addProject} />}
  </AddProjectProvider>
))
