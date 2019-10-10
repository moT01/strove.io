import React, { useState, memo } from 'react'
import { Parallax } from 'rc-scroll-anim'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { SmallCloud, MediumCloud, BigCloud } from 'components'
import { Icon } from 'antd'
import { VSCode } from 'images/logos'
import styled, { css } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
// import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'

import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'
import { selectors } from 'state'

const { TweenOneGroup } = TweenOne

const featuresCN = [
  {
    title: 'Run projects straight in the browser',
    content: 'No setup needed',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/aLQyKyUyssIUhHTZqCIb.svg',
    color: '#EB2F96',
    shadowColor: 'rgba(235,45,150,.12)',
    type: 'chrome',
  },
  {
    title: 'Work with VSCode',
    content: 'You can even use your favorite extensions',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/smwQOoxCjXVbNAKMqvWk.svg',
    color: '#0072ce',
    shadowColor: 'rgba(0, 114, 206, 0.12)',
  },
  {
    title: 'Access your code anywhere',
    content: 'Log in to your account from any computer and code in the cloud',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/JsixxWSViARJnQbAAPkI.svg',
    color: '#13C2C2',
    shadowColor: 'rgba(19,194,194,.12)',
    type: 'global',
  },
  {
    title: 'Code in all major programming languages',
    content:
      'You can even use a particular language version. Need Python 2.7.3 for chemistry? We got you covered!',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/BISfzKcCNCYFmTYcUygW.svg',
    color: '#722ED1',
    shadowColor: 'rgba(114,46,209,.12)',
    type: 'code',
  },
  {
    title: "Don't lose time, one environment for the whole team",
    content:
      'Once a project has been set up, any member can access it without needing to configure everything again',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/XxqEexmShHOofjMYOCHi.svg',
    color: '#FAAD14',
    shadowColor: 'rgba(250,173,20,.12)',
    type: 'team',
  },
  {
    title: 'Build fullstack apps',
    content:
      'and save battery, CPU and RAM. Expensive computations are done in the cloud',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/hBbIHzUsSbSxrhoRFYzi.svg',
    color: '#F5222D',
    shadowColor: 'rgba(245,34,45,.12)',
    type: 'appstore',
  },
  {
    title: "It's open source",
    content:
      'Contribute! Strove has been built with contributors in mind: https://github.com/stroveio/strove.io-client',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/pbmKMSFpLurLALLNliUQ.svg',
    color: '#FA8C16',
    shadowColor: 'rgba(250,140,22,.12)',
    type: 'github',
  },
  {
    title: 'Push straight to GitHub, Gitlab or Bitbucket',
    content: 'Strove is made with seamless git experience in mind',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/VriUmzNjDnjoFoFFZvuh.svg',
    color: '#1AC44D',
    shadowColor: 'rgba(26,196,77,.12)',
    type: 'cloud',
    // onClick: () => setGetStartedVisible(true),
  },
  {
    title: "Say goodbye to 'it works on my machine'",
    content:
      'Thanks to docker based infrastructure every member of the team works on the same environment',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/RpJIQitGbSCHwLMimybX.svg',
    color: '#1890FF',
    shadowColor: 'rgba(24,144,255,.12)',
    type: 'desktop',
  },
]

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
]

const StyledFeatureTitle = styled.h3`
  color: rgb(105, 123, 140);
`

const StyledFeatureContent = styled.p`
  color: rgb(105, 123, 140);
`

const StyledForm = styled(Form)`
  width: 100%;
`

const StyledH6 = styled.h6`
  margin: 20px;
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;

  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}

  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);

    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }

  input {
    box-shadow: none;
    color: #333e63;
    outline: 0;
    background: #fff;
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: 64px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;

    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }

  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;

    g {
      stroke: #0072ce;
    }
  }

  button {
    width: 156px;
    height: 56px;
    color: #fff;
    background: #0072ce;
    text-transform: uppercase;
    display: block;
    text-align: center;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0.8px;
    transition: opacity 0.2s;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    outline: none;

    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
      `}

    ${props =>
      !props.disabled
        ? css`
            cursor: pointer;
            &:hover {
              opacity: 1;
              box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
                0 9px 26px 0 rgba(174, 174, 186, 0.16);
            }
          `
        : css`
            cursor: not-allowed;
          `}
  }
`

const StyledTrialInfo = styled.ul`
  font-size: 13px;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;
    margin-right: 8px;
    list-style: none;

    &:before {
      margin-right: 0.3em;
      content: '✔';
      color: #0072ce;
    }
  }
`

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const Features = () => {
  const [emailSent, setEmailSent] = useState(false)
  const [hoverNum, setHoverNum] = useState()
  const onMouseOver = i => setHoverNum(i)
  const onMouseOut = () => setHoverNum(null)
  const dispatch = useDispatch()

  const getEnter = e => {
    const i = e.index
    const r = Math.random() * 2 - 1
    const y = Math.random() * 10 + 5
    const delay = Math.round(Math.random() * (i * 50))
    return [
      {
        delay,
        opacity: 0.4,
        ...pointPos[e.index],
        ease: 'easeOutBack',
        duration: 300,
      },
      {
        y: r > 0 ? `+=${y}` : `-=${y}`,
        duration: Math.random() * 1000 + 2000,
        yoyo: true,
        repeat: -1,
      },
    ]
  }

  let children = [[], [], []]
  featuresCN.forEach((item, i) => {
    const isHover = hoverNum === i
    const pointChild = [
      'point-0 left',
      'point-0 right',
      'point-ring',
      'point-1',
      'point-2',
      'point-3',
    ].map((className, index) => (
      <TweenOne
        component="i"
        className={className}
        key={index}
        style={{
          background: item.color,
          borderColor: item.color,
        }}
      />
    ))
    const child = (
      <li key={i.toString()}>
        <div
          className="page1-box"
          onMouseEnter={() => {
            onMouseOver(i)
          }}
          onMouseLeave={() => {
            onMouseOut()
          }}
        >
          <TweenOneGroup
            className="page1-point-wrapper"
            enter={getEnter}
            leave={{
              x: 0,
              y: 30,
              opacity: 0,
              duration: 300,
              ease: 'easeInBack',
            }}
            resetStyleBool={false}
          >
            {(isMobileOnly || isHover) && pointChild}
          </TweenOneGroup>
          <div
            className="page1-image"
            style={{
              boxShadow: `${isHover ? '0 12px 24px' : '0 6px 12px'} ${
                item.shadowColor
              }`,
            }}
          >
            {item.type ? (
              <Icon
                type={item.type}
                style={{
                  fontSize: '32px',
                  color: `${item.color}`,
                  marginTop: '10px',
                }}
              />
            ) : (
              <VSCode width="38px" height="auto" fill={item.color} />
            )}
          </div>
          <StyledFeatureTitle>{item.title}</StyledFeatureTitle>
          <StyledFeatureContent>{item.content}</StyledFeatureContent>
        </div>
      </li>
    )
    children[Math.floor(i / 3)].push(child)
  })

  children = children.map((item, i) => (
    <QueueAnim
      className="page1-box-wrapper"
      key={i.toString()}
      type="bottom"
      leaveReverse
      delay={[i * 100, (children.length - 1 - i) * 100]}
      component="ul"
    >
      {item}
    </QueueAnim>
  ))

  return (
    <div className="home-page page1">
      <div className="home-page-wrapper" id="page1-wrapper">
        {!isMobileOnly && (
          <Parallax
            className="page1-bg"
            animation={{
              translateY: 300,
              ease: 'linear',
              playScale: [0, 1.65],
            }}
            style={{ top: '-30vh' }}
            location="page1-wrapper"
          >
            <SmallCloud />
            <MediumCloud />
            <BigCloud />
          </Parallax>
        )}
        <div className="title-line-wrapper page1-line"></div>
        <div className="tiles-wrapper" style={{ width: '80vw' }}>
          {children}
        </div>
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values => {
            console.log(values)
            dispatch(
              mutation({
                name: 'sendEmail',
                context: null,
                mutation: SEND_EMAIL,
                variables: { email: values.email, isDemo: true },
                onSuccess: () => setEmailSent(true),
              })
            )
          }}
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
                disabled={errors.email || !values.email}
                isMobile={isMobileOnly}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                ></Field>
                <svg
                  className="Form-fieldGroupIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#9CA2B4"
                    stroke-width="2"
                  >
                    <path d="M2 4h20v16H2z"></path>
                    <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                  </g>
                </svg>
                <button
                  type="submit"
                  isDisabled={values.email && errors.email && touched.email}
                >
                  Request demo
                </button>
              </EmailFormWrapper>
              <StyledTrialInfo>
                <li>Free 14-day Demo</li>
                <li>No credit card needed</li>
                <li>No setup</li>
              </StyledTrialInfo>
              {emailSent && (
                <StyledH6>Thank you, well get in touch soon!</StyledH6>
              )}
            </StyledForm>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default memo(Features)
