import React, { useState } from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import BannerSVGAnim from './component/BannerSVGAnim'
import styled, { keyframes, css } from 'styled-components'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import { createSelector } from 'reselect'

import { selectors } from 'state'
import Loader from '../components/fullScreenLoader'
import GetStarted from '../components/getStarted'
import Templates from '../components/templates'

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
  font-size: 1.5rem;
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
        transform: scale(1.1);
      }
    `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const getUserName = selectors.getApiData('user', null, 'name')

const getUserPhoto = selectors.getApiData('user', null, 'photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const Banner = props => {
  const isLoading = useSelector(selectors.getLoading('user'))
  const user = useSelector(getUserData)
  const [isModalVisible, setModalVisible] = useState(false)

  const handleClick = () => setModalVisible(true)

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
        <ButtonsWrapper>
          {/* <GetStarted /> */}
          <Button primary disabled={isLoading} onClick={handleClick}>
            {isLoading ? (
              <Loader
                isFullScreen={false}
                color={'#ffffff'}
                height={'2.2rem'}
              />
            ) : (
              'Get started'
            )}
            <StyledModal
              isOpen={isModalVisible}
              onRequestClose={() => setModalVisible(false)}
              ariaHideApp={false}
            >
              <Templates />
            </StyledModal>
          </Button>
          <Button>Request demo</Button>
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
