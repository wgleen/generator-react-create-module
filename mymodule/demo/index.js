import React from 'react'
import { render } from 'react-dom'
import App from './App'

export const applicationContainer = document.getElementById('app')

render(
  <App />,
  applicationContainer
)