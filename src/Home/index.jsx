import React from 'react'
import { enquireScreen } from 'enquire-js'

import Banner from './Banner'
import Page1 from './Page1'
import Page2 from './Page2'
import Footer from './Footer'
import './static/style'

const Home = () => (
  <div>
    <div className="home-wrapper">
      <Banner />
      <Page1 />
      <Page2 />
      <Footer />
    </div>
  </div>
)

export default Home
