import React, { lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import {
  Embed,
  NotFound,
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
const Faq = WithLazyLoader(lazy(() => import('pages/faq')))
const Cookies = WithLazyLoader(lazy(() => import('pages/cookies')))
const PrivacyPolicy = WithLazyLoader(lazy(() => import('pages/privacyPolicy')))
const TermsAndConditions = WithLazyLoader(
  lazy(() => import('pages/termsAndConditions'))
)
const PrivacyPolicy = WithLazyLoader(lazy(() => import('pages/privacyPolicy')))
const TermsAndConditions = WithLazyLoader(
  lazy(() => import('pages/termsAndConditions'))
)
const Pricing = WithLazyLoader(lazy(() => import('pages/pricing')))
const GoBackTo = WithLazyLoader(lazy(() => import('pages/goBackTo')))
const Login = WithLazyLoader(lazy(() => import('pages/login')))
const Embed = WithLazyLoader(lazy(() => import('pages/embed')))

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
