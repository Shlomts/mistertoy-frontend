import { userService } from "../../services/user.service.js"
import { CLEAR_CART } from "../reducers/toy.reducer.js"
import { SET_USER, SET_USER_BALANCE } from "../reducers/user.reducer.js"
import { store } from "../store.js"

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        console.log("user login:", user)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log("user actions -> Cannot login", err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
    } catch (err) {
        console.log("user actions -> Cannot signup", err)
        throw err
    }
}

export async function logout(credentials) {
    try {
        await userService.logout(credentials)
        store.dispatch({ type: SET_USER, user: null })
    } catch (err) {
        console.log("user actions -> Cannot logout", err)
        throw err
    }
}

export async function checkout(diff) {
    try {
        const newBalance = await userService.updateBalance(-diff)
        store.dispatch({ type: CLEAR_CART })
        store.dispatch({ type: SET_USER_BALANCE, balance: newBalance })
    } catch (err) {
        console.log("user actions -> Cannot checkout", err)
        throw err
    }
}
