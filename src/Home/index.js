import React, { memo } from 'react'

import Banner from './Banner'
import Features from './Features'
import Technologies from './Technologies'
import Footer from './Footer'
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
