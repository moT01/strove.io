import React, { useState, memo } from 'react'
import QueueAnim from 'rc-queue-anim'
import Logos from 'components/logos.js'
import styled from 'styled-components'

const StyledTitle = styled.h2`
  font-weight: 600;
`

const Technologies = () => {
  const [selectedLogo, setSelectedLogo] = useState()

  const handleHoverIn = logo => setSelectedLogo(logo)

  const handleHoverOut = () => setSelectedLogo('')

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <StyledTitle>On the shoulders of giants</StyledTitle>
        <QueueAnim
          key="queue"
          type="bottom"
          leaveReverse
          className="page2-content"
        >
          <p key="p" className="page-content">
            {!selectedLogo
              ? `Powered by technologies from the biggest players`
              : selectedLogo}
          </p>
          <Logos
            handleHoverIn={handleHoverIn}
            handleHoverOut={handleHoverOut}
          />
        </QueueAnim>
      </div>
    </div>
  )
}

export default memo(Technologies)
