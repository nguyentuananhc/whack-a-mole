import { combineReducers } from 'redux'

import { reducer as gameReducer } from './containers/Game/slice'

export default combineReducers({
    gameReducer,
})
