import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  Home,
  Faq,
  Embed,
  // FromEmbed,
  // NotFound,
  // Cookies,
  // PrivacyPolicy,
  // TermsAndConditions,
} from 'pages'

import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const App = () => (
  <Wrapper>
    <Router>
      <Switch>
        <Route path="/embed">
          <Embed />
        </Route>
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Wrapper>
)

export default App
