import React from 'react'
import { render } from 'react-dom'
import App from './App'

// eslint-disable-next-line import/prefer-default-export
export const applicationContainer = document.getElementById('app')

render(
  <App />,
  applicationContainer
)
