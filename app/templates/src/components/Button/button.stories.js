/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import StoriesContainer from '../StoriesContainer/StoriesContainer'
import Button, { COLORS } from './Button'

storiesOf('Button', module)
  .add('default', () => (
    <StoriesContainer>
      <Button>
        Click me
      </Button>
    </StoriesContainer>
  ))
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
  ))
