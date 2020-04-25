import React, { memo, useState } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { createSelector } from 'reselect'
import Downshift from 'downshift'
import { useDispatch, useSelector } from 'react-redux'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { loginOptions } from 'consts'
import { persistor } from '../../wrapper'
import StroveLogo from 'images/stroveReversed.png'

import DropdownMenuWrapper from './dropdownMenuWrapper'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60vw;
  border: 1px solid ${({ theme }) => theme.colors.c1};
  border-radius: 2px;
  background: ${({ theme }) => theme.colors.c2};
`

const Text = styled.div`
  font-size: 16px;
  margin: 0;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  line-height: 1;
  padding: 6px;
  :hover {
    color: ${({ theme }) => theme.colors.c3};
    cursor: pointer;
  }
`

const AuthText = styled(Text)`
  border: 1px solid white;
  border-radius: 6px;
  border-width: 1px;
  :hover {
    cursor: pointer;
    border-color: black;
  }
`

const OptionText = styled(Text)`
  :hover {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const StyledModal = styled(Modal)`
  display: flex;
  height: auto;
  width: auto;
  position: fixed;
  animation: ${FadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
  :overlay {
    background-color: rgba(255, 255, 255, 0);
  }
`

const LoginModal = ({ loginModal, closeModal }) => {
  return (
    <StyledModal
      style={{ overlay: { backgroundColor: 'rgba(255, 255, 255, 0)' } }}
      width={isMobileOnly && '80vw'}
      mindWidth="40vw"
      height={isMobileOnly ? '30vh' : '20vh'}
      isOpen={loginModal}
      onRequestClose={closeModal}
      contentLabel="Warning"
      ariaHideApp={false}
    >
      <Wrapper>
        <OptionText>Hi</OptionText>
      </Wrapper>
    </StyledModal>
  )
}
export default memo(LoginModal)
