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
  Enterprise,
  Editor,
} from 'pages'

import { PrivateRoute, Dashboard } from 'components'

import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const Strove = () => (
  <Wrapper>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/faq" component={Faq} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="/termsAndConditions" component={TermsAndConditions} />
      <Route path="/enterprise" component={Enterprise} />
      <Route path="/fromEmbed/goBackTo" component={GoBackTo} />
      <Route path="/fromEmbed/login" component={Login} />
      <Route exact path="/embed" component={Embed} />
      <Route path="/embed/runProject" component={RunProject} />
      <Route path="/embed/editor" component={Editor} />
      <PrivateRoute path="/app/editor" component={Editor} />
      <Route path="/app/dashboard" component={Dashboard} />
      <Route component={NotFound} />
    </Switch>
  </Wrapper>
)

export default Strove
