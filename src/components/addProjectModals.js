import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'gatsby'
import { isMobileOnly, isTablet } from 'react-device-detect'

import Modal from 'components/modal'
import { Github, Gitlab } from 'images/logos'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITLAB_CLIENT_ID = process.env.GITLAB_CLIENT_ID
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
  margin-left: 2%;
  margin-bottom: 12px;
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  text-align: center;
`

const ModalWrapepr = styled.div`
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

const StyledList = styled.ul`
  margin: 0 0 0 4vw;
  color: #0072ce;
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

const AddProjectModals = ({ modalContent, setModalContent, projectsLimit }) => {
  const device = isMobileOnly ? 'mobile' : isTablet ? 'tablet' : 'computer'
  // const incomingProject = useSelector(selectors.incomingProject.getProjectData)

  if (modalContent === 'AddGithubPrivatePermissions') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '80vw' : isTablet ? '60vw' : '30vw'}
        height={isMobileOnly ? '80vh' : '35vh'}
      >
        <ModalWrapepr>
          <Text>
            We couldn't clone your repository. This may happen due to one of the
            following reasons:
          </Text>
          <StyledList>
            <li>The repository you are trying to clone is private</li>
            <li>
              You do not have access rights to the repository you are trying to
              reach
            </li>
            <li>Repository from the provided link does not exist</li>
          </StyledList>
          <Text>For more information check out pricing</Text>
          <ButtonsWrapper mobile={device}>
            <StyledLink
              to="pricing"
              primary
              onClick={() => setModalContent(null)}
            >
              Pricing
            </StyledLink>
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithGithub') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '30vh' : '20vh'}
      >
        <ModalWrapepr>
          <Text>
            To clone this repository you have to log in with a Github account
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledAnchor
              primary
              href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github `}
              onClick={() => setModalContent(null)}
            >
              Login with Github
              <Github />
            </StyledAnchor>
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithGitlab') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '30vh' : '20vh'}
      >
        <ModalWrapepr>
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
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'AddGithubToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '37vh' : '20vh'}
      >
        <ModalWrapepr>
          <Text>
            To clone this repository you have to log in with a Github account.
            You are logged in with a Gitlab account
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
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'AddGitlabToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '37vh' : '20vh'}
      >
        <ModalWrapepr>
          <Text>
            To clone this repository you have to log in with a Gitlab account.
            You are logged in with a Github account
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
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'ProjectsLimitExceeded') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '47vh' : '25vh'}
      >
        <ModalWrapepr>
          <Text>
            You have exceeded your projects limit. You can create up to{' '}
            {projectsLimit} projects. To increase the limit you can upgrade your
            account. To do so visit our pricing section.
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledLink
              to="pricing"
              primary
              onClick={() => setModalContent(null)}
            >
              Pricing
            </StyledLink>
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  if (modalContent === 'AnotherActiveProject') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '47vh' : '25vh'}
      >
        <ModalWrapepr>
          <Text>
            One of your projects is currently active. You have to stop it before
            adding a new one. You can do that in your dashboard.
          </Text>
          <ButtonsWrapper mobile={device}>
            <StyledLink
              to="app/dashboard"
              primary
              onClick={() => setModalContent(null)}
            >
              Ok
            </StyledLink>
            <Button onClick={() => setModalContent(null)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapepr>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={!!modalContent}
      onRequestClose={() => setModalContent(null)}
      contentLabel={modalContent}
      ariaHideApp={false}
      width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
      height={isMobileOnly ? '33vh' : '20vh'}
    >
      <ModalWrapepr>
        <Text>
          We have encountered an error while cloning your repository. Please try
          again later.
        </Text>
        <ButtonsWrapper mobile={device}>
          <Button primary onClick={() => setModalContent(null)}>
            Ok
          </Button>
        </ButtonsWrapper>
      </ModalWrapepr>
    </Modal>
  )
}

export default memo(AddProjectModals)
