import React, { useEffect, useState } from 'react'
// import Reactotron from 'reactotron-react-js'
// import { reactotronRedux } from 'reactotron-redux'
import { Route } from 'react-router-dom'
import { persistStore } from 'redux-persist'

import { WithTracker } from 'components'

import Wrapper from './wrapper'
import Routes from './routes'
import store from './store'

// if (process.env.NODE_ENV !== 'production') {
//   Reactotron.configure()
//     .use(reactotronRedux())
//     .connect()
// }

export let persistor

const Strove = () => {
  const [isRehydrating, setIsRehydrating] = useState(true)
  useEffect(() => {
    persistor = persistStore(store, {}, () => {
      setIsRehydrating(false)
    })
  }, [])

  if (isRehydrating) {
    return <div></div>
  }

  return (
    <Wrapper>
      <Route component={WithTracker(Routes, {})} />
    </Wrapper>
  )
}

export default Strove
