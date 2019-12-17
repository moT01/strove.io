import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  Home,
  Faq,
  Embed,
  NotFound,
  Cookies,
  PrivacyPolicy,
  TermsAndConditions,
  GoBackTo,
  Login,
  RunProject,
  App,
} from 'pages'

import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
    <Router>
      <Switch>
        <Route path="/embed">
          <Embed />
        </Route>
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="/checkHowTo">
          <NotFound />
        </Route>
        <Route path="/cookies">
          <Cookies />
        </Route>
        <Route path="/privacyPolicy">
          <PrivacyPolicy />
        </Route>
        <Route path="/termsAndConditions">
          <TermsAndConditions />
        </Route>
        <Route path="fromEmbed/goBackTo">
          <GoBackTo />
        </Route>
        <Route path="fromEmbed/login">
          <Login />
        </Route>
        <Route path="/embed">
          <Embed />
        </Route>
        <Route path="embed/runProject">
          <RunProject />
        </Route>
        <Route path="/app">
          <App />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Wrapper>
)

export default Strove
