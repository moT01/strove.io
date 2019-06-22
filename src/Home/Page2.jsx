import React, { useState } from "react"
import QueueAnim from "rc-queue-anim"
import Logos from "../components/logos.js"

function Page2() {
  const [selectedLogo, setSelectedLogo] = useState()

  const handleHoverIn = logo => setSelectedLogo(logo)

  const handleHoverOut = () => setSelectedLogo("")

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <h2>On the shoulders of giants</h2>
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

export default Page2
