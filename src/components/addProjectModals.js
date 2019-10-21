import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'gatsby'
import { isMobileOnly, isTablet } from 'react-device-detect'
import { useDispatch } from 'react-redux'

import Modal from './modal'
import { Github, Gitlab, Bitbucket } from 'images/logos'
import { actions } from 'state'
import modal from './modal'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
const BITBUCKET_CLIENT_ID = process.env.BITBUCKET_CLIENT_ID
const REDIRECT_URI = process.env.REDIRECT_URI

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
  color: #0072ce;
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

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  min-width: 70px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  svg {
    fill: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
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
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
      }
    `}
`

const StyledAnchor = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 100%;
  max-width: 300px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  svg {
    fill: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
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
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
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
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  font-size: 0.9rem;
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
        transform: translateY(-3px);
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
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
  color: #0072ce;
  margin: 10px 0 10px 0;
  text-align: center;
`

const AddEmptyProjectModal = ({
  isOpen,
  closeModal,
  modalContent,
  addProject,
  device,
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
        <Button primary onClick={addProject}>
          Ok
        </Button>
        <Button onClick={closeModal}>Cancel</Button>
      </ButtonsWrapper>
    </ModalWrapper>
  </Modal>
)

const AddProjectModals = ({
  modalContent,
  setModalContent,
  projectsLimit,
  addProject,
}) => {
  const device = isMobileOnly ? 'mobile' : isTablet ? 'tablet' : 'computer'
  const dispatch = useDispatch()

  const closeModal = () => {
    setModalContent(null)
    dispatch(actions.incomingProject.removeIncomingProject())
  }

  if (modalContent === 'AddEmptyProject') {
    return (
      <AddEmptyProjectModal
        closeModal={closeModal}
        isOpen={!!modalContent}
        modalContent={modalContent}
        addProject={addProject}
        device={device}
      />
    )
  }

  if (modalContent === 'LoginWithGithub') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
              onClick={() => setModalContent(null)}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithGitlab') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab`}
              onClick={() => setModalContent(null)}
            >
              Login with Gitlab
              <Gitlab />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithBitbucket') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket`}
              onClick={() => setModalContent(null)}
            >
              Login with Bitbucket
              <Bitbucket />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'AddGithubToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
              onClick={closeModal}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'AddGitlabToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab`}
              onClick={closeModal}
            >
              Login with Gitlab
              <Gitlab />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'AddBitbucketToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
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
              href={`https://bitbucket.org/site/oauth2/authorize?client_id=${BITBUCKET_CLIENT_ID}&response_type=code&state=bitbucket`}
              onClick={closeModal}
            >
              Login with Bitbucket
              <Bitbucket />
            </StyledAnchor>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'ProjectsLimitExceeded') {
    return (
      <Modal
        isOpen={!!modalContent}
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
            account. To do so visit our pricing section.
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledLink to="pricing" primary onClick={closeModal}>
              Pricing
            </StyledLink>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'AnotherActiveProject') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={closeModal}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '47vh' : '25vh'}
      >
        <ModalWrapper>
          <Text>
            One of your projects is currently active. You have to stop it before
            adding a new one. You can do that in your dashboard.
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledLink to="app/dashboard" primary onClick={closeModal}>
              Ok
            </StyledLink>
            <Button onClick={closeModal}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  if (modalContent === 'PrivateRepo') {
    return (
      <AddEmptyProjectModal
        closeModal={closeModal}
        isOpen={!!modalContent}
        modalContent={modalContent}
        addProject={addProject}
      />
    )
  }

  if (modalContent === 'UnableToClone') {
    return (
      <AddEmptyProjectModal
        closeModal={closeModal}
        isOpen={!!modalContent}
        modalContent={modalContent}
        addProject={addProject}
      />
    )
  }

  if (modalContent?.includes('TryAgainLater')) {
    return (
      <Modal
        isOpen={!!modalContent}
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
            <Button primary onClick={closeModal}>
              Ok
            </Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
    )
  }

  return null
}

export default memo(AddProjectModals)
