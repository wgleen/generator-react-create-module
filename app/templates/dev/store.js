/* eslint-disable import/no-extraneous-dependencies */
import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk'
import multi from 'redux-multi'
import promise from 'redux-promise'
import { composeWithDevTools } from 'redux-devtools-extension'

export const rootReducer = combineReducers({
})

export const middlewares = [
  thunk,
  multi,
  promise
]

export const middlewaresApplied = applyMiddleware(...middlewares)

export const store = createStore(
  rootReducer,
  compose(process.env.ENV === 'development' ? composeWithDevTools(middlewaresApplied) : middlewaresApplied)
)

export default store
