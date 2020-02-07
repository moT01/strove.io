import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Faq,
  Embed,
  NotFound,
  Cookies,
  PrivacyPolicy,
  TermsAndConditions,
  GoBackTo,
  Login,
  RunProject,
  Pricing,
  Editor,
  FromEmailInvitation,
  Payments,
} from 'pages'

import { PrivateRoute, ScrollToTop, WithLazyLoader } from 'components'

const Home = WithLazyLoader(lazy(() => import('pages/home')))
const Dashboard = WithLazyLoader(lazy(() => import('pages/dashboard')))

const Strove = () => (
  <>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/faq" component={Faq} />
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="/termsAndConditions" component={TermsAndConditions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fromEmbed/goBackTo" component={GoBackTo} />
      <Route path="/fromEmbed/login" component={Login} />
      <Route exact path="/embed" component={Embed} />
      <Route path="/embed/runProject" component={RunProject} />
      <Route path="/embed/editor" component={Editor} />
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path="/app/dashboard" component={Dashboard} />
      <PrivateRoute path="/app/payments" component={Payments} />
      <Route path="/fromEmailInvitation" component={FromEmailInvitation} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default Strove
