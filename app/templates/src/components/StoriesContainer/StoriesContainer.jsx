import React from 'react'
import PropTypes from 'prop-types'
import styles from './storiesContainer.scss'

const StoriesContainer = (props) => {
  const { children } = props

  return (
    <div className={styles.storiesContainer}>
      {children}
    </div>
  )
}

StoriesContainer.defaultProps = {
  children: null
}

StoriesContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.node
    )
  ])
}

export default StoriesContainer
