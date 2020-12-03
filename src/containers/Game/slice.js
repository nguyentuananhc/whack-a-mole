import { createSlice } from '@reduxjs/toolkit'

const REDUCER_NAME = 'gameReducer'

const gameReducer = createSlice({
    name: REDUCER_NAME,
    initialState: {
        userName: 'User Name',
        currentIndex: 0,
    },
    reducers: {
        saveUserNameRequest: (state, actions) => {
            state.userName = actions?.payload
        },
        setCurrentIndexRequest: (state, actions) => {
            state.currentIndex = actions?.payload
        },
    },
})

const { reducer, actions, selectors } = gameReducer
export { reducer, actions, selectors, gameReducer, REDUCER_NAME }
