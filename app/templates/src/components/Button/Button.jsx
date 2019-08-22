import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './button.scss'

export const COLORS = [
  'green',
  'yellow',
  'red'
]

const Button = (props) => {
  const {
    children,
    color
  } = props

  const buttonClass = classNames(
    styles.button,
    { [styles[color]]: color }
  )

  return (
    <button
      type="button"
      className={buttonClass}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  children: null,
  color: null
}

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(COLORS)
}

export default Button
