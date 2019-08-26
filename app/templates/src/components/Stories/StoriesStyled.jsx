import React from 'react'
import PropTypes from 'prop-types'
import styles from './storiesStyled.scss'

const StoriesStyled = (props) => {
  const { children } = props

  return (
    <div className={styles.storiesStyled}>
      {children}
    </div>
  )
}

StoriesStyled.defaultProps = {
  children: null
}

StoriesStyled.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(
      PropTypes.node
    )
  ])
}

export default StoriesStyled
