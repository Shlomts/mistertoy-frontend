import { httpService } from "./http.service.js"
import { utilService } from "./util.service.js"
import { userService } from "./user.service.js"

const BASE_URL = "toy/"

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getRandomToy,
}

export const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered",
]

function query(filterBy = {}) {
    return httpService.get(BASE_URL, filterBy)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        toy.owner = userService.getLoggedinUser()
        toy.createdAt = Date.now()
        return httpService.post(BASE_URL, toy)
    }
}

function getEmptyToy() {
    return {
        name: "",
        price: "",
        labels: [],
        inStock: false,
    }
}

function getRandomToy() {
    return {
        name: "Talking Doll - " + (Date.now() % 1000),
        price: utilService.getRandomIntInclusive(1, 1000),
        labels: _getRanodmLabels(),
        inStock: true,
    }
}

function _getRanodmLabels() {
    const lab1 = utilService.getRandomIntInclusive(0, 7)
    const lab2 = utilService.getRandomIntInclusive(0, 7)

    return [labels[lab1], labels[lab2]]
}

function getDefaultFilter() {
    return { txt: "", maxPrice: undefined, labels: [], inStock: null }
}
