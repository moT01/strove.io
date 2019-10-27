import React, { memo } from 'react'

import Banner from './banner'
import Features from './features'
import Technologies from './technologies'
import Footer from './footer'
import './static/style'

const Home = () => (
  <div className="home-wrapper">
    <Banner />
    <Features />
    <Technologies />
    <Footer />
  </div>
)

export default memo(Home)
