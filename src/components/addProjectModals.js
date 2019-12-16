import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { isMobileOnly, isTablet } from 'react-device-detect'
import { useDispatch } from 'react-redux'

import AddingEmptyProjectModal from './addEmptyProjectModal.js'
import Modal from './modal'
import { Github, Gitlab, Bitbucket } from 'components/svgs'
import { actions } from 'state'
import StroveButton from 'components/stroveButton.js'
import { getWindowPathName, handleStopProject } from 'utils'

const REACT_APP_GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID
const REACT_APP_GITLAB_CLIENT_ID = process.env.REACT_APP_GITLAB_CLIENT_ID
const REACT_APP_BITBUCKET_CLIENT_ID = process.env.REACT_APP_BITBUCKET_CLIENT_ID
const REACT_APP_REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI

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
const Text = styled.p`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 1rem;
  margin-bottom: 12px;
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  text-align: center;
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledAnchor = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 100%;
  max-width: 300px;
  margin: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${({ primary, theme }) =>
    primary ? theme.colors.c2 : theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 1vh 1vh -1.5vh ${({ theme }) => theme.colors.c1};
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  svg {
    fill: ${({ invert, theme }) =>
      !invert ? theme.colors.c2 : theme.colors.c1};
    width: 2.2vh;
    height: auto;
    margin-left: 5px;
  }

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
        transform: translateY(-3px);
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.colors.c1};
      }
    `}
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  min-width: 70px;
  margin: 5px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.c1 : theme.colors.c2};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
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
        transform: translateY(-3px);
        box-shadow: 0 1.2vh 1.2vh -1.3vh ${({ theme }) => theme.colors.c1};
      }
    `}
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.mobile === 'mobile'
      ? '85%'
      : props.mobile === 'tablet'
      ? '60%'
      : '45%'};
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: ${({ theme }) => theme.colors.c1};
  margin: 10px 0 10px 0;
  text-align: center;
`

const AddEmptyProjectModal = ({
  isOpen,
  closeModal,
  modalContent,
  device,
  setModalContent,
}) => (
  <Modal
    isOpen={!!isOpen}
    onRequestClose={closeModal}
    contentLabel={modalContent}
    ariaHideApp={false}
    width={isMobileOnly ? '80vw' : isTablet ? '60vw' : '30vw'}
    height={isMobileOnly ? '75vh' : '33vh'}
  >
    <ModalWrapper>
      <Title>Looks like you are trying to clone a private repository!</Title>
      <Text>
        We will create an empty project for you - if your permissions are
        correct you will be able to clone the repository using https git clone
        from the terminal.
      </Text>
      <ButtonsWrapper mobile={device}>
        <StroveButton
          isPrimary
          onClick={() => {
            closeModal()
            setModalContent('AddingEmptyProjectOpen')
          }}
          text="Ok"
        />
        <StroveButton onClick={closeModal} text="Cancel" />
      </ButtonsWrapper>
    </ModalWrapper>
  </Modal>
)

const AddProjectModals = ({
  modalContent,
  setModalContent,
  projectsLimit,
  addProject,
  currentProjectId,
}) => {
  const device = isMobileOnly ? 'mobile' : isTablet ? 'tablet' : 'computer'
  const dispatch = useDispatch()
  const closeModal = () => {
    setModalContent(null)
    dispatch(actions.incomingProject.removeIncomingProject())
  }
  const isEmbed = getWindowPathName().includes('embed')

  return (
    <>
      <AddEmptyProjectModal
        closeModal={closeModal}
        isOpen={
          modalContent === 'AddEmptyProject' || modalContent === 'UnableToClone'
        }
        modalContent={modalContent}
        addProject={addProject}
        device={device}
        setModalContent={setModalContent}
      />

      <Modal
        isOpen={modalContent === 'LoginWithGithub'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height="30vh"
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Github account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
              onClick={() => setModalContent(null)}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'LoginWithGitlab'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height="30vh"
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Gitlab account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://gitlab.com/oauth/authorize?client_id=${REACT_APP_GITLAB_CLIENT_ID}&REACT_APP_REDIRECT_URI=${REACT_APP_REDIRECT_URI}&response_type=code&state=gitlab`}
              onClick={() => setModalContent(null)}
            >
              Login with Gitlab
              <Gitlab />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'LoginWithBitbucket'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height="30vh"
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Bitbucket account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://bitbucket.org/site/oauth2/authorize?client_id=${REACT_APP_BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket`}
              onClick={() => setModalContent(null)}
            >
              Login with Bitbucket
              <Bitbucket />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'AddGithubToLogin'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '37vh' : '20vh'}
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Github account.
            You are logged in with a Gitlab account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
              onClick={closeModal}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'AddGitlabToLogin'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '37vh' : '20vh'}
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Gitlab account.
            You are logged in with a Github account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://gitlab.com/oauth/authorize?client_id=${REACT_APP_GITLAB_CLIENT_ID}&REACT_APP_REDIRECT_URI=${REACT_APP_REDIRECT_URI}&response_type=code&state=gitlab`}
              onClick={closeModal}
            >
              Login with Gitlab
              <Gitlab />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'AddBitbucketToLogin'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '37vh' : '20vh'}
      >
        <ModalWrapper>
          <Text>
            To clone this repository you have to log in with a Bitbucket
            account. You are logged in with a Github account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://bitbucket.org/site/oauth2/authorize?client_id=${REACT_APP_BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket`}
              onClick={closeModal}
            >
              Login with Bitbucket
              <Bitbucket />
            </StyledAnchor>
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'ProjectsLimitExceeded'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '47vh' : '25vh'}
      >
        <ModalWrapper>
          <Text>
            You have exceeded your projects limit. You can create up to{' '}
            {projectsLimit} projects. To increase the limit you can upgrade your
            account my mailing us at contact@strove.io.
          </Text>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent === 'AnotherActiveProject'}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '47vh' : '25vh'}
      >
        <ModalWrapper>
          {isEmbed ? (
            <Text>
              Before starting new project you have to stop your currently
              running project. That means you may lose all unsaved progress. Are
              you sure you want to stop your active project?
            </Text>
          ) : (
            <Text>
              One of your projects is currently active. You have to stop it
              before adding a new one. You can do that in your dashboard.
            </Text>
          )}
          <ButtonsWrapper mobile={device}>
            {isEmbed ? (
              <StroveButton
                primary
                onClick={() => {
                  handleStopProject({ id: currentProjectId, dispatch })
                  closeModal()
                }}
                text="Confirm"
                padding="10px"
                maxWidth="150px"
              />
            ) : (
              <StyledLink to="/app/dashboard" primary onClick={closeModal}>
                Ok
              </StyledLink>
            )}
            <StroveButton onClick={closeModal} text="Close" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <Modal
        isOpen={modalContent?.includes('TryAgainLater')}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '33vh' : '20vh'}
      >
        <ModalWrapper>
          <Text>
            {modalContent === 'TryAgainLaterButGitlabIsToBlame'
              ? `We have encountered an error while cloning your repository from Gitlab. Please
          try again later.`
              : `We have encountered an error while cloning your repository. Please
          try again later.`}
          </Text>
          <ButtonsWrapper mobile={device}>
            <StroveButton primary onClick={closeModal} text="Ok" />
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>

      <AddingEmptyProjectModal
        handleClose={closeModal}
        addProject={addProject}
        isOpen={modalContent === 'AddingEmptyProjectOpen'}
      />
    </>
  )
}

export default memo(AddProjectModals)
