import { httpService } from "./http.service.js"

const BASE_URL = "auth/"
const STORAGE_KEY_LOGGEDIN = "loggedinUser"

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateBalance,
    getEmptyCredentials,
}

async function login({ username, password }) {
    try {
        const user = await httpService.post(BASE_URL + "login", {
            username,
            password,
        })
        console.log("user FETCH:", user)
        return _setLoggedinUser(user)
    } catch (err) {
        console.log("user service -> Invalid login", err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const userInit = { username, password, fullname, balance: 10000 }

    try {
        const user = await httpService.post(BASE_URL + "signup", userInit)
        if (user) return _setLoggedinUser(user)
        else return Promise.reject("Invalid signup")
    } catch (err) {
        console.log("user service -> Cannot signup", err)
        throw err
    }
}

async function logout() {
    try {
        await httpService.post(BASE_URL + "logout")
        sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    } catch (err) {
        console.log("user service -> Cannot logout", err)
        throw err
    }
}

async function updateBalance(diff) {
    if (getLoggedinUser().balance + diff < 0) return Promise.reject("No credit")

    try {
        const user = await httpService.put("/api/user", { diff })
        console.log("updateBalance user:", user)
        _setLoggedinUser(user)
        return user.balance
    } catch (err) {
        console.log("user service > can't update balance >>", err)
        throw err
    }
}

function getById(userId) {
    return httpService.get("/api/user/" + userId)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        balance: user.balance,
        isAdmin: user.isAdmin,
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}

function getEmptyCredentials() {
    return {
        username: "",
        password: "",
        fullname: "",
    }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})
