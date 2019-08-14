import '@babel/polyfill'
import chai from 'chai'
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import {
  middlewares,
  rootReducer
} from '../dev/store'

configure({ adapter: new Adapter() })

const jsdom = require('jsdom')

const { JSDOM } = jsdom
const dom = new JSDOM()

global.window = dom.window

global.chaiExpect = chai.expect

global.mockStore = configureStore(
  middlewares,
  rootReducer
)
