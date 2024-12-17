import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"

const STORAGE_KEY = "toyDB"

_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getRandomToy,
    getDefaultFilter,
}

async function query(filterBy = {}) {
    try {
        const toys = await storageService.query(STORAGE_KEY)
        if (!filterBy.txt) filterBy.txt = ""
        if (!filterBy.maxPrice) filterBy.maxPrice = Infinity
        const regExp = new RegExp(filterBy.txt, "i")
        return toys.filter((toy) => {
            return regExp.test(toy.name) && toy.price <= filterBy.maxPrice
        })
    } catch (err) {
        console.log("toy service local -> Cannot load toys", err)
        throw err
    }
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        toy.owner = userService.getLoggedinUser()
        toy.createdAt = Date.now()
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: "",
        price: "",
        labels: [],
        inStock: true,
    }
}

function getRandomToy() {
    return {
        name: "Talking Doll - " + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1, 1000),
        labels: _getRanodmLabels(),
    }
}

function _getRanodmLabels() {
    const lab1 = utilService.getRandomIntInclusive(0, 7)
    const lab2 = utilService.getRandomIntInclusive(0, 7)

    const labels = [
        "On wheels",
        "Box game",
        "Art",
        "Baby",
        "Doll",
        "Puzzle",
        "Outdoor",
        "Battery Powered",
    ]

    return [labels[lab1], labels[lab2]]
}

function getDefaultFilter() {
    return { txt: "", maxPrice: "" }
}

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for (var i = 0; i < 12; i++) {
        const toy = getRandomToy()
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}
