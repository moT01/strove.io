import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Link } from 'gatsby'
import { isMobileOnly } from 'react-device-detect'

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

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
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

const StyledAnchor = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  min-width: 45%;
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
  margin-bottom: 0;
`

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
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
  border-radius: 1vh;
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

const AddProjectModals = ({ modalContent, setModalContent }) => {
  if (modalContent === 'AddGithubPrivatePermissions') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : '30vw'}
        height={isMobileOnly ? '70vh' : '30vh'}
      >
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
        <StyledLink to="pricing" primary onClick={() => setModalContent(false)}>
          Pricing
        </StyledLink>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithGithub') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : '30vw'}
        height={isMobileOnly ? '70vh' : '15vh'}
      >
        <Text>
          To clone this repository you have to log in with a Github account
        </Text>
        <StyledAnchor
          primary
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
          onClick={() => setModalContent(false)}
        >
          Login with Github
          <Github />
        </StyledAnchor>
      </Modal>
    )
  }

  if (modalContent === 'LoginWithGitlab') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : '30vw'}
        height={isMobileOnly ? '70vh' : '15vh'}
      >
        <Text>
          To clone this repository you have to log in with a Gitlab account
        </Text>
        <StyledAnchor
          primary
          href={`https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab`}
          onClick={() => setModalContent(false)}
        >
          Login with Gitlab
          <Gitlab />
        </StyledAnchor>
      </Modal>
    )
  }

  if (modalContent === 'AddGithubToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : '30vw'}
        height={isMobileOnly ? '70vh' : '15vh'}
      >
        <Text>
          To clone this repository you have to log in with a Github account. You
          are logged in with a Gitlab account
        </Text>
        <StyledAnchor
          primary
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&state=github`}
          onClick={() => setModalContent(false)}
        >
          Login with Github
          <Github />
        </StyledAnchor>
      </Modal>
    )
  }

  if (modalContent === 'AddGitlabToLogin') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : '30vw'}
        height={isMobileOnly ? '70vh' : '15vh'}
      >
        <Text>
          To clone this repository you have to log in with a Gitlab account. You
          are logged in with a Github account
        </Text>
        <StyledAnchor
          primary
          href={`https://gitlab.com/oauth/authorize?client_id=${GITLAB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=gitlab`}
          onClick={() => setModalContent(false)}
        >
          Login with Github
          <Gitlab />
        </StyledAnchor>
      </Modal>
    )
  }

  return (
    <Modal
      isOpen={!!modalContent}
      onRequestClose={() => setModalContent(false)}
      contentLabel={modalContent}
      ariaHideApp={false}
      width={isMobileOnly ? '70vw' : '30vw'}
      height={isMobileOnly ? '70vh' : '15vh'}
    >
      <Text>
        We have encountered an error while cloning your repositry. Please try
        again later.
      </Text>
      <Button primary onClick={() => setModalContent(false)}>
        Ok
      </Button>
    </Modal>
  )
}

export default AddProjectModals
