import React from "react"
import QueueAnim from "rc-queue-anim"
import Logos from "../components/logos.js"

function Page2() {
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
            Powered by technologies from the biggest players
          </p>
            <Logos />
        </QueueAnim>
      </div>
    </div>
  )
}

export default Page2
