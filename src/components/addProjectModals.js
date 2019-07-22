import React, { useState } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'

import { selectors } from 'state'
import Modal from 'components/modal'
import { Github, Gitlab } from '../images/logos'

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

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
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

  ${'' /* :hover svg {
    fill: ${props => (props.invert ? '#ffffff' : '#0072ce')};
    cursor: pointer;
  } */}

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
  const user = useSelector(selectors.getUser)
  modalContent = 'LoginWithGithub'

  if (modalContent === 'AddGithubPrivatePermissions') {
    return (
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(false)}
        contentLabel={modalContent}
        ariaHideApp={false}
        width="30vw"
        height="30vh"
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
        width="30vw"
        height="30vh"
      >
        <Text>
          To clone this repository you have to log in with a github account
        </Text>
        <Button primary onClick={() => setModalContent(false)}>
          Login with Github
          <Github />
        </Button>
      </Modal>
    )
  }

  return (
    <>
      {modalContent === 'AddGithubPrivatePermissions' ? (
        <>
          <Modal
            isOpen={!!modalContent}
            onRequestClose={() => setModalContent(false)}
            contentLabel={modalContent}
            ariaHideApp={false}
            width="30vw"
            height="30vh"
          >
            <Text>
              We couldn't clone your repository. This may happen due to one of
              the following reasons:
            </Text>
            <StyledList>
              <li>The repository you are trying to clone is private</li>
              <li>
                You do not have access rights to the repository you are trying
                to reach
              </li>
              <li>Repository from the provided link does not exist</li>
            </StyledList>
            <Text>For more information check out pricing</Text>
            <StyledLink
              to="pricing"
              primary
              onClick={() => setModalContent(false)}
            >
              Pricing
            </StyledLink>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            isOpen={!!modalContent}
            onRequestClose={() => setModalContent(false)}
            contentLabel={modalContent}
            ariaHideApp={false}
            width="30vw"
            height="30vh"
          >
            <Text>
              We couldn't clone your repository. This may happen due to one of
              the following reasons:
            </Text>
            <StyledList>
              <li>The repository you are trying to clone is private</li>
              <li>
                You do not have access rights to the repository you are trying
                to reach
              </li>
              <li>Repository from the provided link does not exist</li>
            </StyledList>
            <Text>For more information check out pricing</Text>
            <StyledLink
              to="pricing"
              primary
              onClick={() => setModalContent(false)}
            >
              Pricing
            </StyledLink>
          </Modal>
        </>
      )}
    </>
  )
}

export default AddProjectModals
