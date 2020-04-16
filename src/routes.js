import React, { lazy, memo, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

import { PrivateRoute, ScrollToTop } from 'components'

const Home = lazy(() => import('pages/home'))
// const Faq = lazy(() => import('pages/faq'))
const Cookies = lazy(() => import('pages/cookies'))
const PrivacyPolicy = lazy(() => import('pages/privacyPolicy'))
const TermsAndConditions = lazy(() => import('pages/termsAndConditions'))

const Pricing = lazy(() => import('pages/pricing'))
const GoBackTo = lazy(() => import('pages/fromEmbed/goBackTo'))
const EmbedLogin = lazy(() => import('pages/fromEmbed/login'))
const Embed = lazy(() => import('pages/embed'))
const RunProject = lazy(() => import('pages/runProject'))
const Editor = lazy(() => import('pages/editor'))
const Dashboard = lazy(() => import('pages/dashboard'))
const Plans = lazy(() => import('pages/plans'))
const FromEmailInvitation = lazy(() =>
  import('pages/welcome/fromEmailInvitation')
)

const Login = lazy(() => import('pages/welcome/login'))
const OrganizationName = lazy(() => import('pages/welcome/organizationName'))

const TeamName = lazy(() => import('pages/welcome/teamName'))
const TeamMembers = lazy(() => import('pages/welcome/teamMembers'))

const HelloThere = lazy(() => import('pages/welcome/helloThere'))

// const FirstPost = lazy(() => import('pages/blog/firstPost')))

const NotFound = lazy(() => import('pages/notFound'))

const Strove = () => (
  <Suspense fallback={<div></div>}>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
      {/* <Route path="/faq" component={Faq} /> */}
      <Route path="/cookies" component={Cookies} />
      <Route path="/privacyPolicy" component={PrivacyPolicy} />
      <Route path="/termsAndConditions" component={TermsAndConditions} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/fromEmbed/goBackTo" component={GoBackTo} />
      <Route path="/fromEmbed/login" component={EmbedLogin} />
      <Route exact path="/embed" component={Embed} />
      <Route path="/embed/runProject" component={RunProject} />
      <Route path="/embed/editor" component={Editor} />
      <PrivateRoute path="/app/editor" component={Editor} />
      <PrivateRoute path={['/app', '/app/dashboard']} component={Dashboard} />
      <PrivateRoute path="/app/plans" component={Plans} />
      <Route path="/welcome/login" component={Login} />
      <PrivateRoute
        path="/welcome/organizationName"
        component={OrganizationName}
      />
      <PrivateRoute path="/welcome/teamName" component={TeamName} />
      <Route path="/welcome/teamMembers" component={TeamMembers} />
      <PrivateRoute path="/welcome/helloThere" component={HelloThere} />
      <Route path="/fromEmailInvitation" component={FromEmailInvitation} />
      {/* <Route path="/blog/firstPost" component={FirstPost} /> */}
      <Route component={NotFound} />
    </Switch>
  </Suspense>
)

export default memo(Strove)
