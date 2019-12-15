import React from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import logo from './logo.svg'
import './App.css'
import Wrapper from './wrapper'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

const App = () => {
  return (
    <StyledDiv className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </StyledDiv>
  )
}

const WrapperApp = () => (
  <Wrapper>
    <App />
  </Wrapper>
)

export default WrapperApp
