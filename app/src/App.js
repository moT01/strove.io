import React from 'react'
import Reactotron from 'reactotron-react-js'

import logo from './logo.svg'
import './App.css'
import { wrapRootElement } from './wrapper'

if (process.env.NODE_ENV !== 'production') {
  Reactotron.configure().connect()
}

function App() {
  return (
    <div className="App">
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
    </div>
  )
}

const WrapperApp = wrapRootElement(App)

export default WrapperApp
