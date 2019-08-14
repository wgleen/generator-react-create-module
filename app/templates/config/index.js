import path from 'path'

const rootPath = path.join(__dirname, '../')

export default {
  paths: {
    root: rootPath
  },
  env: process.env.NODE_ENV || 'development'
}
