/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import { withInfo } from '@storybook/addon-info'
import StoriesContainer from '../Stories/StoriesContainer'
import Button, { COLORS } from './Button'

storiesOf('Button', module)
  .addDecorator(withInfo())
  .add('default', () => (
    <StoriesContainer>
      <Button>
        Click me
      </Button>
    </StoriesContainer>
  ), { notes: 'This is a default Button' })
  .add('color prop', () => (
    <StoriesContainer>
      {
        COLORS.map((color) => (
          <Button color={color}>
            Click me
          </Button>
        ))
      }
    </StoriesContainer>
  ), { notes: 'This is color prop, use this prop to add an especific color to Button component' })
