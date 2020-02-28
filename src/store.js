import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import rootReducer from './state'

const store = reduxCreateStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store

export const persistor = persistStore(store)
