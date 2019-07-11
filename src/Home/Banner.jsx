import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import BannerSVGAnim from './component/BannerSVGAnim'
import styled, { keyframes } from 'styled-components'
import GetStarted from '../components/getStarted'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

const StyledA = styled.a`
  margin: 0;
  text-decoration: none;
  color: inherit;
  line-height: 1.5;
  font-size: 20px;
`

const Banner = props => {
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
          <GetStarted />
          <Button>
            <StyledA href="mailto:no-one@snai1mai1.com?subject=Silisky demo">
              Request a demo
            </StyledA>
            {/* < style={{ margin: 0 }}>/p> */}
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
