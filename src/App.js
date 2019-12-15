import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from 'pages'
import Embed from 'pages/embed'
import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Home />
      </Route>
      <Route path="/embed">
        <Embed />
      </Route>
    </Switch>
  </Router>
)

const WrapperApp = () => (
  <Wrapper>
    <App />
  </Wrapper>
)

export default WrapperApp
