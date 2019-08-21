/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import Button, { COLORS } from './Button'

storiesOf('Button', module)
  .add('default', () => (
    <Button>
      Click me
    </Button>
  ))
  .add('color prop', () => (
    COLORS.map((color) => (
      <div>
        <Button color={color}>
          Click me
        </Button>

        <br />
      </div>
    ))
  ))
