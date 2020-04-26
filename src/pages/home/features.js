import React, { useState, memo } from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import { Icon } from 'antd'
import { VSCode } from 'components/svgs'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'

const { TweenOneGroup } = TweenOne

const StyledFeatureTitle = styled.h3`
  color: ${({ theme }) => theme.colors.c26};
  font-size: 18px;
  margin: 8px auto;
  font-weight: 700;
`

const StyledFeatureContent = styled.p`
  color: ${({ theme }) => theme.colors.c26};
  font-size: 16px;
  line-height: 1;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.c26};
`

const StyledFeatureWrapper = styled.div`
  width: 100vw;
  margin: 50px 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-self: center;
  align-items: center;
  overflow: hidden;
`

const StyledFeature = styled.div`
  width: 80vw;
`

const pointPos = [
  { x: -30, y: -10 },
  { x: 20, y: -20 },
  { x: -65, y: 15 },
  { x: -45, y: 80 },
  { x: 35, y: 5 },
  { x: 50, y: 50, opacity: 0.2 },
]

const Features = ({ features }) => {
  const [hoverNum, setHoverNum] = useState()
  const onMouseOver = i => setHoverNum(i)
  const onMouseOut = () => setHoverNum(null)

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
  features.forEach((item, i) => {
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
      <>
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
              }}
            />
          ) : (
            <VSCode width="38px" height="100%" fill={item.color} />
          )}
        </div>
        <StyledFeatureTitle>{item.title}</StyledFeatureTitle>
        <StyledFeatureContent>{item.content}</StyledFeatureContent>
      </>
    )
    if (item.href) {
      children[Math.floor(i / 3)].push(
        <li key={i.toString()}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              onMouseOver(i)
            }}
            onMouseLeave={onMouseOut}
          >
            <StyledAnchor
              rel="noopener noreferrer"
              target="_blank"
              href={item.href}
            >
              {child}
            </StyledAnchor>
          </div>
        </li>
      )
    } else {
      children[Math.floor(i / 3)].push(
        <li key={i.toString()}>
          <div
            className="page1-box"
            onMouseEnter={() => {
              onMouseOver(i)
            }}
            onMouseLeave={onMouseOut}
          >
            {child}
          </div>
        </li>
      )
    }
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
    <StyledFeatureWrapper id="page1-wrapper">
      <StyledFeature>{children}</StyledFeature>
    </StyledFeatureWrapper>
  )
}

export default memo(Features)
