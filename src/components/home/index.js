import React, { memo } from 'react'
import { window } from 'utils'
import { useInterval } from 'hooks'

import Banner from './banner'
import Features from './features'
import Technologies from './technologies'
import Footer from './footer'
import './static/style'

const checkGoogleOptimizeLoading = () => {
  console.log('window?.google_optimize', window?.google_optimize)
  if (window?.google_optimize !== undefined) {
    const variant = window.google_optimize.get(process.env.GOOGLE_OPTIMIZE_ID)
  }
}

const Home = () => {
  useInterval(checkGoogleOptimizeLoading, !window?.google_optimize ? 100 : null)

  return (
    <div className="home-wrapper">
      <Banner />
      <Features />
      <Technologies />
      <Footer />
    </div>
  )
}

export default memo(Home)
