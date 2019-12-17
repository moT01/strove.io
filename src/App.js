import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { Switch, Route } from 'react-router-dom'
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
} from 'pages'

import { PrivateRoute, Editor, Dashboard } from 'components'

import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
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
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </Wrapper>
)

export default Strove
