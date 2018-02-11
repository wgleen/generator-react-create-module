const _ = require('lodash')

exports.toTitle = str => {
  return str
    .split('-')
    .map(i => _.capitalize(i))
    .join(' ')
}