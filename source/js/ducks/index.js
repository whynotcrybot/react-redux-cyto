import { combineReducers } from 'redux'
import cytoscape from './cytoscape'

const rootReducer = combineReducers({
  cytoscape: cytoscape
})

export default rootReducer
