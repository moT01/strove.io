import React, { useState, useCallback } from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import BannerSVGAnim from './component/BannerSVGAnim'
import styled, { keyframes, css } from 'styled-components'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import { Icon } from 'antd'
import { isMobile } from 'react-device-detect'

import { selectors } from 'state'
import Loader from '../components/fullScreenLoader'
import GetStarted from '../components/getStarted'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
  width: ${props => (props.mobile ? '90%' : '45%')};
  min-width: 70px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  font-size: 1.3rem;
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
        transform: scale(1.1);
      }
    `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: ${props => (props.mobile ? 'column' : 'row')};
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

const StyledA = styled.a`
  margin: 0;
  text-decoration: none;
  color: inherit;
  font-size: 1.3rem;
`

const StyledModal = styled(Modal)`
  display: flex;
  height: auto;
  width: auto;
  top: 25%;
  left: 25%;
  position: fixed;
  animation: ${FadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: #0072ce;
  cursor: pointer;

  :focus {
    outline: none;
  }
`

const Banner = props => {
  const isLoading = useSelector(selectors.getLoading('user'))
  const [isModalVisible, setModalVisible] = useState(false)

  const closeModal = () => setModalVisible(false)

  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim
        className="banner-title-wrapper"
        type={props.isMobile ? 'bottom' : 'right'}
      >
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">SiliSky</h1>
        <p key="content">Code in clouds. One evironment for everyone.</p>
        <ButtonsWrapper mobile={isMobile}>
          <Button
            primary
            mobile={isMobile}
            disabled={isLoading}
            onClick={useCallback(() => setModalVisible(true))}
          >
            {isLoading ? (
              <Loader
                isFullScreen={false}
                color={'#ffffff'}
                height={'2.2rem'}
              />
            ) : (
              'Get started'
            )}
          </Button>
          <StyledModal
            isOpen={isModalVisible}
            onRequestClose={closeModal}
            ariaHideApp={false}
          >
            <StyledIcon
              type="close"
              onClick={useCallback(() => setModalVisible(false))}
            />
            <GetStarted closeModal={closeModal} />
          </StyledModal>
          <Button mobile={isMobile}>
            <StyledA href="mailto:contact@codengo.net?subject=Silisky demo&body=We'd love to get to know how we can help!%0D%0A%0D%0AWhen is it a good time to schedule a call?">
              Request a demo
            </StyledA>
          </Button>
        </ButtonsWrapper>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  )
}

export default Banner
