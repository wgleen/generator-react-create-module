/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf } from '@storybook/react'
import StoriesContainer from '../Stories/StoriesContainer'
import StoriesStyled from '../Stories/StoriesStyled'
import Welcome from './Welcome'

storiesOf('LaboritUIKit', module)
  .add('Welcome', () => (
    <StoriesContainer>
      <StoriesStyled>
        <Welcome />
      </StoriesStyled>
    </StoriesContainer>
  ))
