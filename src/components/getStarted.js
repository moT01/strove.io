import React, { useState, memo } from 'react'
import styled from 'styled-components/macro'
import { Formik } from 'formik'
import { isMobile } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

import AddProjectProvider from './addProjectProvider'
import AddEmptyProjectModal from './addEmptyProjectModal'
import StroveButton from 'components/stroveButton.js'

const AddProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-width: 50vw;
  max-width: 100vw;
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: ${({ theme }) => theme.colors.c1};
  margin: 3px 3px 3px 0;
  text-align: center;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 10px 10px -15px ${({ theme }) => theme.colors.c1};
  text-align: center;
  font-size: 1rem;
  padding: 5px 0;

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
  margin: 20px 0 0;
`

const StyledErrors = styled.span`
  color: ${({ theme }) => theme.colors.c5};
`

const StyledActiveProjectInfo = styled.div`
  font-size: 20px;
`

const PrivateRepoSuggestion = styled.div`
  font-size: 16px;
  margin: 5px;
`

const validateRepoLink = values => {
  let errors = {}
  const repoLink = values.repoLink
  const isShhLink = repoLink.includes('git@') && repoLink.includes('.git')

  if (!repoLink) {
    return errors
  } else if (repoLink && !repoLink.trim()) {
    errors.repoLink = 'No link provided'
    return errors
  } else if (
    !/.*(github|gitlab|bitbucket).(com|org)\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
      repoLink
    ) &&
    !isShhLink
  ) {
    errors.repoLink = 'Invalid repository link'
    return errors
  }

  return errors
}

const GetStarted = ({ addProject, teamId }) => {
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false)
  const handleClose = () => setAddProjectModalOpen(false)
  const currentProject = useSelector(selectors.api.getCurrentProject)

  return (
    <AddProjectWrapper mobile={isMobile}>
      {currentProject ? (
        <StyledActiveProjectInfo>
          Stop your current poject before adding a new one
        </StyledActiveProjectInfo>
      ) : (
        <>
          <Title mobile={isMobile}>Add project from Github or Gitlab</Title>
          <Formik
            onSubmit={(values, actions) => {
              values.repoLink.trim() &&
                addProject({ link: values.repoLink, teamId })
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
                <StroveButton
                  isDisabled={!props.values.repoLink || props.errors.repoLink}
                  isPrimary
                  type="submit"
                  text="Clone project"
                  width="30%"
                  margin="15px 0 0"
                  minWidth="200px"
                />

                <StyledErrors>{props.errors.repoLink}</StyledErrors>
              </GithubLinkForm>
            )}
          />
          <PrivateRepoSuggestion>
            Don't have a link? Want to clone private repository?
          </PrivateRepoSuggestion>
          <StroveButton
            isPrimary
            onClick={() => setAddProjectModalOpen(true)}
            text="Create empty project"
            width="30%"
            minWidth="200px"
          />
          <AddEmptyProjectModal
            handleClose={handleClose}
            isOpen={addProjectModalOpen}
            addProject={addProject}
            teamId={teamId}
          />
        </>
      )}
    </AddProjectWrapper>
  )
}

export default memo(({ teamId, organization }) => (
  <AddProjectProvider organization={organization}>
    {({ addProject }) => <GetStarted addProject={addProject} teamId={teamId} />}
  </AddProjectProvider>
))
