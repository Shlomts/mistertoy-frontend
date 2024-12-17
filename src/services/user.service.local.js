import { storageService } from "./async-storage.service.js"

const STORAGE_KEY = "userDB"
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

function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

async function login({ username, password }) {
    try {
        const users = await storageService.query(STORAGE_KEY)
        const user = users.find((user) => user.username === username)
        // if (user && user.password !== password) return _setLoggedinUser(user)
        if (user) return _setLoggedinUser(user)
        else return Promise.reject("Invalid login")
    } catch (err) {
        console.log("can't login", err)
        throw err
    }
}

async function signup({ username, password, fullname }) {
    const user = { username, password, fullname, balance: 10000 }
    try {
        await storageService.post(STORAGE_KEY, user)
        _setLoggedinUser
    } catch (err) {
        console.log("can't signup", err)
        throw err
    }
}

async function updateBalance(diff) {
    const loggedInUserId = getLoggedinUser()._id
    try {
        const user = userService.getById(loggedInUserId)
        if (user.balance + diff < 0) return Promise.reject("No credit")
        user.balance += diff
        storageService.put(STORAGE_KEY, user)
        _setLoggedinUser(user)
        return user.balance
    } catch (err) {
        console.log("Can't get user >>", err)
        throw err
    }
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        balance: user.balance,
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
