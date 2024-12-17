import { userService } from "../../services/user.service.js"

//* Count
export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const CHANGE_BY = 'CHANGE_BY'

//* User
export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    count: 105,
    loggedInUser: userService.getLoggedinUser()
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        //* Count
        case INCREMENT:
            return { ...state, count: state.count + 1 }
        case DECREMENT:
            return { ...state, count: state.count - 1 }
        case CHANGE_BY:
            return { ...state, count: state.count + action.diff }

        //* User
        case SET_USER:
            return {
                ...state,
                loggedInUser: action.user
            }
        case SET_USER_BALANCE:
            const loggedInUser = { ...state.loggedInUser, balance: action.balance }
            return { ...state, loggedInUser }
        default:
            return state;
    }
}